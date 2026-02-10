import { useState, useEffect } from "react";

export const Typewriter = ({ text, speed = 100, delay = 500 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    // Reiniciamos al cambiar el texto
    setDisplayedText(""); 
    
    const timeoutId = setTimeout(() => {
      let currentIndex = 0;
      
      const intervalId = setInterval(() => {
        // Incrementamos antes para asegurar que slice tome el primer caracter (0, 1)
        currentIndex++; 
        
        // Usamos slice en lugar de concatenar: esto arregla el bug de la letra perdida
        setDisplayedText(text.slice(0, currentIndex));

        if (currentIndex === text.length) {
          clearInterval(intervalId);
        }
      }, speed);

      // Limpieza del intervalo si el componente se desmonta antes de terminar
      return () => clearInterval(intervalId);
      
    }, delay);

    // Limpieza del timeout inicial
    return () => clearTimeout(timeoutId);
  }, [text, speed, delay]);

  // Efecto del cursor parpadeante
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span className="inline-block">
      {displayedText}
      <span className={`${showCursor ? "opacity-100" : "opacity-0"} font-mono text-orange-500 font-bold ml-1`}>
        _
      </span>
    </span>
  );
};