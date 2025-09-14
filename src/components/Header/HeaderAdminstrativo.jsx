import { motion } from "framer-motion";
import { Wrench } from "lucide-react";


export default function HeaderRegister() {
  return (
    <motion.div
      className="absolute top-10 text-center space-y-1"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h1 className="text-4xl font-extrabold tracking-tight drop-shadow-sm text-white flex items-center justify-center gap-2">
        Painel Administrativo
        <motion.span
          className="inline-block"
          animate={{
            y: [0, -4, 0, 3, 0],
            rotate: [0, -5, 5, -3, 0],
          }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        >
          <Wrench className="w-6 h-6 text-white" />
        </motion.span>
      </h1>

      <motion.p
        className="text-sm font-light text-white/80"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
      >
        Gerencie o acesso de todos os usuários do sistema.


      </motion.p>
    </motion.div>
  );
}
