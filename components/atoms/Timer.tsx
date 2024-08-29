import { useEffect, useState } from "react";

type TimerProps = {
  timeLeft: number;
};

export default function Timer({ timeLeft }: TimerProps) {
  const [formattedTime, setFormattedTime] = useState("");

  useEffect(() => {
    const minutes = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    const a = `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
    setFormattedTime(a);
  }, [timeLeft]);

  return (
    <div
      style={{ lineHeight: "220px", fontSize: "220px", fontWeight: "300" }}
      className="font-mono flex flex-nowrap justify-between items-center"
    >
      <span>{formattedTime}</span>
    </div>
  );
}
