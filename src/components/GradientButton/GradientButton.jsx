// export default function GradientButton({ type = "button", children, onClick, className = "" }) {
//   return (
//     <button
//       type={type}
//       onClick={onClick}
//       className={`w-full py-3 rounded-md text-white font-semibold transition duration-300 shadow-md bg-[linear-gradient(to_right,_#ff7c00,_#ff9900_50%,_#ff7c00)] hover:brightness-110 hover:shadow-lg ${className}`}
//     >
//       {children}
//     </button>
//   );
// }


export default function GradientButton({ type = "button", children, onClick, className = "", disabled = false, variant }) {
  const baseStyle = "w-full py-3 rounded-md text-white font-semibold transition duration-300 shadow-md hover:brightness-110 hover:shadow-lg";

  const variants = {
    primary: "bg-[linear-gradient(to_right,_#ff7c00,_#ff9900_50%,_#ff7c00)]",
    success: "bg-green-600 hover:bg-green-700",
    secondary: "bg-gray-500 hover:bg-gray-600",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant || "primary"]} ${className}`}
    >
      {children}
    </button>
  );
}
