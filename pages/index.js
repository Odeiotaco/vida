import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Versão totalmente pixelada e noturna, com sprites animados e contagem completa
// até ou desde 18/09/2024

export default function PixelLovePage() {
  const targetDate = new Date("2024-09-18T00:00:00");
  const [timeDiff, setTimeDiff] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
    isFuture: true,
  });

  useEffect(() => {
    // Função para atualizar diferença
    const updateDiff = () => {
      const now = new Date().getTime();
      const end = targetDate.getTime();
      let diff = end - now;
      // Se estiver no passado, invertendo para mostrar tempo decorrido
      const isFuture = diff >= 0;
      if (!isFuture) {
        diff = now - end;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      const milliseconds = Math.floor(diff % 1000);

      setTimeDiff({ days, hours, minutes, seconds, milliseconds, isFuture });
    };

    // Atualizar a cada 100ms
    updateDiff();
    const interval = setInterval(updateDiff, 100);
    return () => clearInterval(interval);
  }, []);

  // Array de quadradinhos para simular "janelas acendendo e apagando"
  const buildingLights = Array.from({ length: 30 }, (_, i) => i);

  // Gatos (sprites animados) - substitua por URLs de GIFs animados de pixel art se desejar
  const fatOrangeCat = "https://media.giphy.com/media/3oEjHP8ELRNNlnlLGM/giphy.gif"; // Exemplo de GIF pixelado
  const smallGrayCat = "https://media.giphy.com/media/Ef4YVD3og8VCo/giphy.gif"; // Outro exemplo

  const [fatCatClicks, setFatCatClicks] = useState(0);
  const [smallCatClicks, setSmallCatClicks] = useState(0);

  const handleFatCatClick = () => {
    setFatCatClicks((prev) => prev + 1);
  };

  const handleSmallCatClick = () => {
    setSmallCatClicks((prev) => prev + 1);
  };

  // Renderização do texto de contagem
  const renderCounterText = () => {
    const { days, hours, minutes, seconds, milliseconds, isFuture } = timeDiff;

    if (isFuture) {
      return (
        <>
          <p className="text-pink-300 text-xl mb-2">Faltam:</p>
          <p className="text-xl text-pink-100 font-bold">
            {days}d : {hours}h : {minutes}m : {seconds}s : {milliseconds}ms
          </p>
          <p className="text-pink-300 mt-2">para 18/09/2024</p>
        </>
      );
    } else {
      return (
        <>
          <p className="text-pink-300 text-xl mb-2">Já se passaram:</p>
          <p className="text-xl text-pink-100 font-bold">
            {days}d : {hours}h : {minutes}m : {seconds}s : {milliseconds}ms
          </p>
          <p className="text-pink-300 mt-2">desde 18/09/2024</p>
        </>
      );
    }
  };

  return (
    <div
      className="relative w-full min-h-screen flex flex-col items-center justify-center"
      style={{
        // Fundo noturno pixelado
        backgroundColor: "#000",
        backgroundSize: "cover",
        imageRendering: "pixelated",
      }}
    >
      {/* Janelinhas piscando (prédios pixelados) */}
      {buildingLights.map((light) => {
        const randomX = Math.random() * 100;
        const randomY = 20 + Math.random() * 60; // entre 20% e 80% de altura
        const randomDelay = Math.random() * 3;
        const randomDuration = 0.5 + Math.random() * 1.5;

        return (
          <motion.div
            key={light}
            className="absolute bg-yellow-200"
            style={{
              left: `${randomX}%`,
              top: `${randomY}%`,
              width: "8px",
              height: "8px",
              imageRendering: "pixelated",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [1, 0, 1] }}
            transition={{
              delay: randomDelay,
              duration: randomDuration,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        );
      })}

      {/* Título pixelado */}
      <motion.h1
        className="font-mono text-2xl mb-4 mt-8"
        style={{ color: "#fff", textShadow: "2px 2px #ff0080" }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Meu Mundo Pixelado
      </motion.h1>

      {/* Contagem tempo */}
      <motion.div
        className="p-4 bg-black/70 rounded border-2 border-pink-500 font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {renderCounterText()}
      </motion.div>

      {/* Gatos animados */}
      <div className="mt-8 w-full max-w-[300px] flex items-center justify-around">
        {/* Gatinho Laranja Gordinho */}
        <motion.img
          src={fatOrangeCat}
          alt="Gatinho Laranja Gordinho Pixel"
          className="w-16 h-16 cursor-pointer"
          style={{ imageRendering: "pixelated" }}
          onClick={handleFatCatClick}
          whileTap={{ scale: 0.8, rotate: 5 }}
        />
        <p className="text-pink-300 font-mono text-sm">Cliques: {fatCatClicks}</p>

        {/* Gatinho Branco e Cinza */}
        <motion.img
          src={smallGrayCat}
          alt="Gatinho Branco e Cinza Pixel"
          className="w-16 h-16 cursor-pointer"
          style={{ imageRendering: "pixelated" }}
          onClick={handleSmallCatClick}
          whileTap={{ scale: 0.8, rotate: -5 }}
        />
        <p className="text-pink-300 font-mono text-sm">Cliques: {smallCatClicks}</p>
      </div>

      {/* Mensagem final */}
      <motion.p
        className="mt-6 text-sm text-pink-200 font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        Feito com amor pixelado, especialmente para você!
      </motion.p>
    </div>
  );
}
