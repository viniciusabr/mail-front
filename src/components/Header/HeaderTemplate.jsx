import { motion } from "framer-motion";
import { Wand2 } from "lucide-react";

export default function HeaderTemplate({ className = "" }) {
  return (
    <motion.div
      className={`flex flex-col items-center text-center text-white max-w-2xl mx-auto space-y-3 ${className}`}
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <h1 className="text-4xl font-extrabold tracking-tight drop-shadow-sm flex items-center gap-2">
        Gerador de Templates
        <motion.span
          className="inline-block"
          animate={{
            y: [0, -8, 0, 6, 0],
            rotate: [0, -5, 0, 5, 0],
            scale: [1, 1.1, 1, 0.95, 1],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        >
          <Wand2 size={36} className="text-yellow-300 drop-shadow-md" />
        </motion.span>
      </h1>

      <motion.p
        className="text-base font-light text-white/80"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
      >
        Crie e-mails automaticamente com auxílio de IA ✨
      </motion.p>
    </motion.div>
  );
}
