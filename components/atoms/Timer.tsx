import { useEffect, useState } from "react";

type TimerProps = {
  timeLeft: number;
};

export default function Timer({ timeLeft }: TimerProps) {
  const [formattedTime, setFormattedTime] = useState("");
  const [fontSize, setFontSize] = useState("180px");
  const [lineHeight, setLineHeight] = useState("140px");

  const adjustFontSize = () => {
    const screenWidth = window.innerWidth;

    if (screenWidth <= 768) {
      setFontSize("50px");
      setLineHeight("40px");
    } else {
      setFontSize("140px");
      setLineHeight("140px");
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
    adjustFontSize();

    window.addEventListener("resize", adjustFontSize);

    return () => {
      window.removeEventListener("resize", adjustFontSize);
    };
  }, []);

  return (
    <span
      style={{ lineHeight: lineHeight, fontSize: fontSize, fontWeight: "300" }}
      className="font-mono text-center"
    >
      {formattedTime}
    </span>
  );
}
