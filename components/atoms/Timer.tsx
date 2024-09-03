import { useEffect, useState } from "react";

type TimerProps = {
  timeLeft: number;
};

export default function Timer({ timeLeft }: TimerProps) {
  const [formattedTime, setFormattedTime] = useState("");
  const [fontSize, setFontSize] = useState("180px");

  useEffect(() => {
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const secs = timeLeft % 60;

    let formatted = "";
    if (hours > 0) {
      formatted = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
      setFontSize("120px"); // Tamaño de fuente más pequeño si hay horas
    } else {
      formatted = `${minutes.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
      setFontSize("180px"); // Tamaño de fuente más grande si no hay horas
    }

    setFormattedTime(formatted);
  }, [timeLeft]);

  return (
    <span
      style={{ lineHeight: fontSize, fontSize: fontSize, fontWeight: "300" }}
      className="h-1/3 font-mono text-center justify-center items-center"
    >
      {formattedTime}
    </span>
  );
}
