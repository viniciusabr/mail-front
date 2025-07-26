export default function GradientButton({ type = "button", children, onClick, className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full py-3 rounded-md text-white font-semibold transition duration-300 shadow-md bg-[linear-gradient(to_right,_#ff7c00,_#ff9900_50%,_#ff7c00)] hover:brightness-110 hover:shadow-lg ${className}`}
    >
      {children}
    </button>
  );
}
