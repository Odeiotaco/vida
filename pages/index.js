import { useState } from "react";
import { motion } from "framer-motion";

export default function LoveCard() {
  const [showMessage, setShowMessage] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-200 p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-red-500 drop-shadow-lg">
          Para Você, Meu Amor ❤️
        </h1>
      </motion.div>

      <div className="mt-8 p-6 bg-white shadow-xl rounded-2xl text-center">
        <motion.div
          initial={{ rotate: -5 }}
          animate={{ rotate: 5 }}
          transition={{ repeat: Infinity, repeatType: "mirror", duration: 1.5 }}
        >
          <div className="w-20 h-20 text-red-500 mx-auto animate-pulse">❤️</div>
        </motion.div>

        {showMessage ? (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-lg mt-4 text-gray-700"
          >
            "Você é a melhor parte dos meus dias! Obrigado por estar ao meu lado. ❤️"
          </motion.p>
        ) : (
          <button
            onClick={() => setShowMessage(true)}
            className="mt-6 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl shadow-lg"
          >
            Clique para ver a mensagem!
          </button>
        )}
      </div>
    </div>
  );
}
