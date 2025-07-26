


import { motion } from "framer-motion";
import { Send } from "lucide-react";

export default function HeaderDashboard({ className = "" }) {
  return (
    <motion.div
      className={`flex flex-col items-center text-center text-white max-w-sm mx-auto space-y-2 ${className}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h1 className="text-4xl font-extrabold tracking-tight drop-shadow-sm flex items-center gap-2">
        Mail CSAT
        <motion.span
          className="inline-block"
          animate={{
            y: [0, -6, 0, 4, 0],
            scale: [1, 1.05, 1, 0.98, 1],
          }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        >
          <Send size={28} className="text-white" />
        </motion.span>
      </h1>

      <motion.p
        className="text-sm font-light text-white/80 whitespace-nowrap"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
      >
        Adicione clientes e envie lembretes para responderem à pesquisa de satisfação.
      </motion.p>
    </motion.div>
  );
}
