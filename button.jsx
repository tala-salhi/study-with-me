export function Button({ children, onClick, className, variant = "solid" }) {
  const baseStyle = variant === "outline"
    ? "border border-pink-300 text-pink-700"
    : "bg-pink-500 text-white";

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg ${baseStyle} ${className || ""}`}
    >
      {children}
    </button>
  );
}
