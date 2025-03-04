import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function RomanticMobilePage() {
  // Cálculo dos dias desde ou até 18 de agosto de 2024
  const [daysDifference, setDaysDifference] = useState(0);
  const [dateMessage, setDateMessage] = useState("");

  useEffect(() => {
    const targetDate = new Date("2024-08-18");
    const now = new Date();
    // diferença em milisegundos
    const diff = now - targetDate;
    // converter em dias
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days < 0) {
      // data está no futuro
      setDateMessage(`Faltam ${Math.abs(days)} dias para 18/08/2024`);
    } else {
      setDateMessage(`Já se passaram ${days} dias desde 18/08/2024`);
    }
    setDaysDifference(days);
  }, []);

  // Animação de corações flutuando
  // Array de corações para exibir repetidamente
  const heartsArray = Array.from({ length: 15 }, (_, i) => i);

  // Lógica para animação dos gatinhos
  const [fatCatClicks, setFatCatClicks] = useState(0);
  const [smallCatClicks, setSmallCatClicks] = useState(0);

  const handleFatCatClick = () => {
    setFatCatClicks(fatCatClicks + 1);
  };

  const handleSmallCatClick = () => {
    setSmallCatClicks(smallCatClicks + 1);
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center bg-gradient-to-b from-pink-300 to-pink-100 p-4">
      {/* Corações animados no fundo */}
      {heartsArray.map((item) => {
        const randomX = Math.random() * 100; // porcentagem
        const randomDelay = Math.random() * 5; // tempo
        const randomDuration = 5 + Math.random() * 5; // 5 a 10s
        const size = 20 + Math.random() * 30; // tamanho do coração

        return (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: "100vh" }}
            animate={{ opacity: 1, y: "-10vh" }}
            transition={{
              delay: randomDelay,
              duration: randomDuration,
              repeat: Infinity,
              repeatType: "restart",
            }}
            className="absolute text-red-500"
            style={{ left: `${randomX}%`, fontSize: `${size}px` }}
          >
            ❤️
          </motion.div>
        );
      })}

      {/* Calendário / Dias */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="bg-white rounded-2xl shadow-xl p-4 w-full max-w-sm text-center"
      >
        <h1 className="text-2xl font-bold text-pink-600 mb-2">Contagem de Dias</h1>
        <p className="text-gray-700 text-lg">{dateMessage}</p>
      </motion.div>

      {/* Seção dos gatinhos */}
      <div className="mt-8 w-full max-w-sm flex justify-around items-center">
        {/* Gatinho Gordinho Laranja */}
        <motion.div
          whileTap={{ scale: 0.8, rotate: 10 }}
          className="flex flex-col items-center"
        >
          <img
            src="https://placekitten.com/150/150"
            alt="Gato Laranja Gordinho"
            className="w-28 h-28 object-cover rounded-full shadow-md"
            onClick={handleFatCatClick}
          />
          <p className="mt-2 text-pink-800 font-semibold">
            Cliques: {fatCatClicks}
          </p>
        </motion.div>

        {/* Gatinho Branco com Cinza */}
        <motion.div
          whileTap={{ scale: 0.8, rotate: -10 }}
          className="flex flex-col items-center"
        >
          <img
            src="https://placekitten.com/151/151"
            alt="Gato Branco com Cinza"
            className="w-24 h-24 object-cover rounded-full shadow-md"
            onClick={handleSmallCatClick}
          />
          <p className="mt-2 text-pink-800 font-semibold">
            Cliques: {smallCatClicks}
          </p>
        </motion.div>
      </div>

      {/* Mensagem de rodapé */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="text-sm text-gray-600 mt-8"
      >
        Feito com amor, especialmente para você!
      </motion.p>
    </div>
  );
}

