import Section from "@/components/Section";
import { TimerProvider } from "@/contexts/TimerContext";

export default function Home() {
  return (
    <TimerProvider>
      <Section section="pomodoro" name="Pomodoro Timer" />
    </TimerProvider>
  );
}
