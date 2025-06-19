import { useEffect, useState } from "react";

function getRandomInRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const images = [
  '/backgrounds/p5x-1.jpg',
  '/backgrounds/p5x-2.jpg',
  '/backgrounds/p5x-3.jpg',
  '/backgrounds/p5x-4.jpg',
  '/backgrounds/p5x-5.jpg',
  '/backgrounds/p5x-6.jpg',
  '/backgrounds/p5x-7.jpg',
  '/backgrounds/p5x-8.jpg',
];

function App() {
  const [countdownText, setCountdownText] = useState("Kalkulerer tid...");
  const [backgroundImage, setBackgroundImage] = useState(() => {
    const index = getRandomInRange(0, images.length - 1);
    return images[index];
  });
  
  const releaseDate = new Date("June 26, 2025 14:00:00").getTime();

  useEffect(() => {
    const changeImage = () => {
      const index = getRandomInRange(0, images.length - 1);
      setBackgroundImage(images[index]);
    };

    changeImage();
    const interval = setInterval(changeImage, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = releaseDate - now;

      if (distance < 0) {
        clearInterval(timer);
        setCountdownText("PHANTOM X UTE HOLYYYYYYYYYYYYYYYYYYY");
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      let combined = '';
      if (days > 0) combined += days + 'd ';
      if (hours > 0) combined += hours + 'h ';
      combined += minutes + 'm ' + seconds + 's';

      setCountdownText(combined);
    }, 1000);

    return () => clearInterval(timer);
  }, [releaseDate]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-xs scale-105 z-0 transition-all duration-500"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        <div className="bg-red-500 shadow-lg shadow-black p-4 rounded-xl flex flex-col gap-2">
          <h1 className="text-white text-4xl">Phantom X Release Countdown</h1>
          <h2 className="text-white text-2xl text-center italic">{countdownText}</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
