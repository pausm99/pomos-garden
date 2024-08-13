import Section from "@/components/Section";
import SignOutComponent from "@/components/atoms/SignOutButton";

export default function Home() {
  return (
    <>
      {/* Esto se puede quitar, es solo para tener temporalmente disponible el signout*/}
      <SignOutComponent />
      <Section section="pomodoro" name="Pomodoro Timer" />
    </>
  );
}
