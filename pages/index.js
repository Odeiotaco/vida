import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Head from "next/head";

// Exemplo de página Next.js com tema pixelado, sprites animados, contagem de tempo e cenários animados.
// Lembre-se de fornecer suas próprias imagens de sprite (fat-cat-sprite.png e small-cat-sprite.png) ou links.
// Este código é apenas um exemplo e usa classes inline e placeholders.

export default function PixelatedCats() {
  // Data alvo: 18/09/2024
  const targetDate = new Date("2024-09-18T00:00:00");

  // Estados para armazenar a diferença de tempo
  const [timeDiff, setTimeDiff] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
    isFuture: true,
  });

  useEffect(() => {
    const updateDiff = () => {
      const now = Date.now();
      const end = targetDate.getTime();
      let diff = end - now;
      const isFuture = diff >= 0;
      if (!isFuture) {
        // Se a data já passou, calcular tempo decorrido
        diff = now - end;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      const milliseconds = Math.floor(diff % 1000);
      setTimeDiff({ days, hours, minutes, seconds, milliseconds, isFuture });
    };

    updateDiff();
    const interval = setInterval(updateDiff, 100);
    return () => clearInterval(interval);
  }, []);

  // Renderiza o texto da contagem
  const renderTimeText = () => {
    const { days, hours, minutes, seconds, milliseconds, isFuture } = timeDiff;
    return isFuture ? (
      <>
        <p className="text-pink-300 text-xl mb-2 font-mono">Faltam:</p>
        <p className="text-xl text-pink-100 font-bold font-mono">
          {days}d : {hours}h : {minutes}m : {seconds}s : {milliseconds}ms
        </p>
        <p className="text-pink-300 mt-2 font-mono">para 18/09/2024</p>
      </>
    ) : (
      <>
        <p className="text-pink-300 text-xl mb-2 font-mono">Já se passaram:</p>
        <p className="text-xl text-pink-100 font-bold font-mono">
          {days}d : {hours}h : {minutes}m : {seconds}s : {milliseconds}ms
        </p>
        <p className="text-pink-300 mt-2 font-mono">desde 18/09/2024</p>
      </>
    );
  };

  // Gatos (sprites). Substitua pelas URLs dos seus sprites animados.
  // Se quiser sprite sheet com múltiplos frames, use as classes CSS no <div> em vez do <img>.
  // Aqui, vou usar placeholders.
  const fatCatSprite = "/fat-cat-sprite.png"; // troque pela sua sprite
  const smallCatSprite = "/small-cat-sprite.png"; // troque pela sua sprite

  // Contadores de cliques
  const [fatCatClicks, setFatCatClicks] = useState(0);
  const [smallCatClicks, setSmallCatClicks] = useState(0);

  // Funções de clique
  const handleFatCatClick = () => {
    setFatCatClicks((prev) => prev + 1);
  };
  const handleSmallCatClick = () => {
    setSmallCatClicks((prev) => prev + 1);
  };

  // Array para estrelas piscando
  const starCount = 30;
  const stars = Array.from({ length: starCount }, (_, i) => i);

  // Array para janelinhas piscando
  const buildingCount = 15;
  const buildings = Array.from({ length: buildingCount }, (_, i) => i);

  return (
    <>
      <Head>
        <title>Meu Mundo Pixelado</title>
      </Head>

      <div
        className="relative w-full min-h-screen flex flex-col items-center justify-center"
        style={{ backgroundColor: "#000", overflow: "hidden", imageRendering: "pixelated" }}
      >
        {/* Estrelas piscando no fundo */}
        {stars.map((star) => {
          const randomX = Math.random() * 100;
          const randomY = Math.random() * 100;
          const randomDelay = Math.random() * 2;
          const randomDuration = 1 + Math.random() * 1.5;
          return (
            <motion.div
              key={"star-" + star}
              className="absolute bg-white"
              style={{
                left: `${randomX}%`,
                top: `${randomY}%`,
                width: "2px",
                height: "2px",
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

        {/* Janelinhas piscando (prédios pixelados) */}
        {buildings.map((light) => {
          const randomX = Math.random() * 100;
          const randomY = 70 + Math.random() * 20; // Entre 70% e 90% da tela
          const randomDelay = Math.random() * 2;
          const randomDuration = 0.5 + Math.random() * 1.5;
          return (
            <motion.div
              key={"building-" + light}
              className="absolute bg-yellow-300"
              style={{
                left: `${randomX}%`,
                top: `${randomY}%`,
                width: "6px",
                height: "6px",
                imageRendering: "pixelated",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{
                delay: randomDelay,
                duration: randomDuration,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          );
        })}

        {/* Título */}
        <motion.h1
          className="font-mono text-2xl mb-4 mt-8"
          style={{
            color: "#fff",
            textShadow: "2px 2px #ff0080",
            imageRendering: "pixelated",
          }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Meu Mundo Pixelado
        </motion.h1>

        {/* Contagem de tempo */}
        <motion.div
          className="p-4 bg-black/70 rounded border-2 border-pink-500 font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{ imageRendering: "pixelated" }}
        >
          {renderTimeText()}
        </motion.div>

        {/* Gatos animados (Sprites) */}
        <div className="mt-8 w-full max-w-[350px] flex items-center justify-around">
          {/* Gato Laranja Gordinho */}
          <motion.div
            onClick={handleFatCatClick}
            whileTap={{ scale: 0.9, rotate: 5 }}
            className="flex flex-col items-center cursor-pointer"
            style={{ imageRendering: "pixelated" }}
          >
            {/* Exemplo de sprite, substitua pela sua sprite sheet se quiser animação por frames */}
            <img
              src={fatCatSprite}
              alt="Gato Laranja Gordinho Pixel"
              className="w-20 h-20 mb-2"
              style={{ objectFit: "cover", imageRendering: "pixelated" }}
            />
            <p className="text-pink-300 font-mono text-xs">Cliques: {fatCatClicks}</p>
          </motion.div>

          {/* Gato Branco e Cinza */}
          <motion.div
            onClick={handleSmallCatClick}
            whileTap={{ scale: 0.9, rotate: -5 }}
            className="flex flex-col items-center cursor-pointer"
            style={{ imageRendering: "pixelated" }}
          >
            <img
              src={smallCatSprite}
              alt="Gato Branco e Cinza Pixel"
              className="w-20 h-20 mb-2"
              style={{ objectFit: "cover", imageRendering: "pixelated" }}
            />
            <p className="text-pink-300 font-mono text-xs">Cliques: {smallCatClicks}</p>
          </motion.div>
        </div>

        {/* Mensagem final */}
        <motion.p
          className="mt-6 text-sm text-pink-200 font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          style={{ imageRendering: "pixelated" }}
        >
          Feito com amor pixelado, especialmente para você!
        </motion.p>
      </div>
    </>
  );
}
