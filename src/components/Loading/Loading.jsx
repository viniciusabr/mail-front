import { motion } from "framer-motion"

const Loading = ({ message = "Carregando..." }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-gray-700">
      {/* Spinner */}
      <motion.div
        className="h-12 w-12 border-4 border-purple-600 border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />

      {/* Texto */}
      <motion.p
        className="mt-4 text-lg font-medium text-purple-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
      >
        {message}
      </motion.p>
    </div>
  )
}

export default Loading
