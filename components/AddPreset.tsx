import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { Preset } from "@/interfaces/Preset";
import { usePresetsContext } from "@/contexts/PresetsContext";

export default function AddPreset() {
  const { addPreset } = usePresetsContext();
  const [name, setName] = useState("");
  const [focusTime, setFocusTime] = useState("");
  const [breakTime, setBreakTime] = useState("");

  const handleNameInput = (event: any) => {
    setName(event.target.value);
  };

  const handleFocusInput = (event: any) => {
    setFocusTime(event.target.value);
  };
  const handleBreakInput = (event: any) => {
    setBreakTime(event.target.value);
  };

  const handlePresetAdd = () => {
    if (name !== "" || focusTime !== "" || breakTime !== "") {
      const newPreset: Preset = {
        name: name,
        breakTime: parseInt(breakTime),
        focusTime: parseInt(focusTime),
      };
      setName("");
      setFocusTime("");
      setBreakTime("");
      addPreset(newPreset);
    }
  };
  return (
    <form action={handlePresetAdd} className="flex flex-col flex-1 gap-2.5">
      <Input
        value={name}
        onChange={handleNameInput}
        placeholder="Name"
        className="w-full"
      />
      <div className="flex gap-2.5">
        <Input
          type="number"
          value={focusTime}
          onChange={handleFocusInput}
          placeholder="Focus time"
          className="w-1/2"
        />
        <Input
          type="number"
          value={breakTime}
          onChange={handleBreakInput}
          placeholder="Break time"
          className="w-1/2"
        />
      </div>
      <Button type="submit" className="w-full">
        <Plus size={14} strokeWidth={3} color="#ffffff" />
      </Button>
    </form>
  );
}
