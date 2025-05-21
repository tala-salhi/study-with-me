import { useState, useEffect } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { motion } from "framer-motion";
import { Upload } from "lucide-react";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB6D3PGPPbGUBh03le4KaWQoTSElaU4__w",
  authDomain: "studywithme-8439a.firebaseapp.com",
  projectId: "studywithme-8439a",
  storageBucket: "studywithme-8439a.appspot.com",
  messagingSenderId: "302949177439",
  appId: "1:302949177439:web:2c6d2be0cffffa01fc63ea"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const nicknames = [
  "habibti", "albi", "ya ro7i", "ya amar", "gorgeous", "stunner",
  "beautiful", "Tala whom we all adore and love", "sunshine", "butterfly",
  "precious", "pretty girl", "our next president", "queen"
];

const schedule = [
  { date: "2025-05-22", subjects: [
    { name: "Math", topic: "7-1 Adding Polynomials", resources: [] },
    { name: "Arabic", topic: "Literary Text Analysis (General)", resources: [] }
  ]},
  { date: "2025-05-23", subjects: [
    { name: "Math", topic: "7-2 Multiplying Polynomials", resources: [] },
    { name: "Arabic", topic: "Literary Text Analysis (Irony specifics)", resources: [] }
  ]},
  // ...continue the rest from your schedule array
];

export default function StudyWithMeApp() {
  const [nickname, setNickname] = useState("");
  const [todaySchedule, setTodaySchedule] = useState([]);
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    setNickname(nicknames[Math.floor(Math.random() * nicknames.length)]);
    const todayData = schedule.find(day => day.date === today);
    setTodaySchedule(todayData?.subjects || []);
  }, []);

  const handleUpload = async (event, subjectIndex) => {
    const file = event.target.files[0];
    if (!file) return;

    const storageRef = ref(storage, `resources/${today}-${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    alert("Uploaded! Here's your file URL: " + downloadURL);
    // TODO: Save this to Firestore if persistent linking needed
  };

  return (
    <div className="min-h-screen bg-pink-100 p-6 text-pink-900 font-serif cursor-[url('/sparkly-cursor.png'),_auto] animate-fade-in">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-3xl font-bold text-center mb-4"
      >
        Study With Me!! 🌸
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="text-xl text-center mb-6"
      >
        Welcome back, <span className="italic font-semibold">{nickname}</span> 💖
      </motion.div>

      <section>
        <h2 className="text-2xl mb-4">What we have for today, {nickname} 💕</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {todaySchedule.map((subject, index) => (
            <Card key={index} className="bg-white rounded-2xl shadow-xl">
              <CardContent className="p-4">
                <h3 className="text-lg font-bold mb-1">{subject.name}</h3>
                <p className="mb-2">{subject.topic}</p>
                <input
                  type="file"
                  className="mb-2"
                  onChange={(e) => handleUpload(e, index)}
                />
                <Button variant="outline" className="text-pink-700 border-pink-300">
                  <Upload className="mr-2 h-4 w-4" /> Upload Resource
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold mb-4">📅 Full Schedule</h2>
        <div className="space-y-4">
          {schedule.map((day, i) => (
            <motion.div
              key={day.date}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl shadow p-4 border-l-4 border-pink-400"
            >
              <h4 className="font-semibold text-pink-700">{day.date}</h4>
              <ul className="ml-4 list-disc">
                {day.subjects.map((s, j) => (
                  <li key={j}>{s.name} – {s.topic}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="mt-12 text-center text-sm text-pink-500">
        ✨ “Marry a rich man? BECOME the rich WOMAN.” ✨<br />
        Made with 💕, hearts & butterflies for all pretty girls who study 🌸
      </footer>
    </div>
  );
}
