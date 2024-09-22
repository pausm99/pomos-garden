import { useEffect, useState } from "react";

type TimerProps = {
  timeLeft: number;
};

export default function Timer({ timeLeft }: TimerProps) {
  const [formattedTime, setFormattedTime] = useState("");
  const [fontSize, setFontSize] = useState("180px");

  // Función para ajustar el tamaño de la fuente según el ancho de la pantalla
  const adjustFontSize = () => {
    const screenWidth = window.innerWidth;

    if (screenWidth <= 480) {
      setFontSize("50px"); // Para pantallas muy pequeñas (móviles)
    } else if (screenWidth <= 768) {
      setFontSize("120px"); // Para pantallas medianas (tablets)
    } else {
      setFontSize("180px"); // Para pantallas grandes (escritorios)
    }
  };

  useEffect(() => {
    // Calcular el tiempo formateado
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const secs = timeLeft % 60;

    let formatted = "";
    if (hours > 0) {
      formatted = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    } else {
      formatted = `${minutes.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
    }

    setFormattedTime(formatted);
  }, [timeLeft]);

  useEffect(() => {
    // Ajustar el tamaño de la fuente en la carga inicial
    adjustFontSize();

    // Añadir un event listener para ajustar cuando cambie el tamaño de la ventana
    window.addEventListener("resize", adjustFontSize);

    // Limpiar el listener cuando el componente se desmonte
    return () => {
      window.removeEventListener("resize", adjustFontSize);
    };
  }, []);

  return (
    <span
      style={{ lineHeight: fontSize, fontSize: fontSize, fontWeight: "300" }}
      className="font-mono text-center"
    >
      {formattedTime}
    </span>
  );
}
