// import { motion } from "framer-motion";
// import { Send } from "lucide-react"; // <-- ÍCONE DE ENVIO

// export default function HeaderDashboard() {
//   return (
//     <motion.div
//       className="absolute top-10 text-center space-y-1"
//       initial={{ opacity: 0, y: -20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.8, ease: "easeOut" }}
//     >
//       <h1 className="text-4xl font-extrabold tracking-tight drop-shadow-sm text-white flex items-center justify-center gap-2">
//         Mail CSAT
//         <motion.span
//           className="inline-block"
//           animate={{
//             y: [0, -6, 0, 4, 0],
//             scale: [1, 1.05, 1, 0.98, 1],
//           }}
//           transition={{
//             duration: 1.5,
//             ease: "easeInOut",
//             repeat: Infinity,
//           }}
//         >
//           <Send size={28} className="text-white" />
//         </motion.span>
//       </h1>

//       <motion.p
//         className="text-sm font-light text-white/80"
//         initial={{ opacity: 0, y: -10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
//       >
//         Adicione e envie lembretes para responder à pesquisa de satisfação.
//       </motion.p>
//     </motion.div>
//   );
// }


import { motion } from "framer-motion";

export default function HeaderLogin() {
  return (
    <>
      <motion.h1
        className="text-3xl font-bold tracking-wide text-white text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Mail CSAT
        <motion.span
          className="inline-block text-2xl"
          animate={{ y: [0, -6, 0, 4, 0], scale: [1, 1.05, 1, 0.98, 1] }}
          transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
        >
          <span className="text-orange-400">🚀</span>

        </motion.span>
      </motion.h1>


      <motion.p
        className="text-sm font-light text-white/80"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
      >
        Envie lembretes automáticos para aumentar as respostas do CSAT.
      </motion.p>
    </>
  );
}
