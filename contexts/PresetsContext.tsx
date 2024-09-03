import { Preset } from "@/interfaces/Preset";
import React, { createContext, useState, ReactNode, useContext } from "react";

interface PresetsContextProps {
  presets: Preset[];
  selectedPreset: Preset | null;
  selectPreset: (id: number) => void;
  addPreset: (preset: Preset) => void;
  removePreset: (name: string) => void;
}

const testPresets = [
  { id: 1, name: "Prova", focusTime: 10, breakTime: 5 },
  { id: 2, name: "Prova 2", focusTime: 15, breakTime: 5 },
  { id: 3, name: "Prova 3", focusTime: 20, breakTime: 10 },
  { id: 4, name: "Prova 4", focusTime: 10, breakTime: 5 },
  { id: 5, name: "Prova 5", focusTime: 10, breakTime: 5 },
  { id: 6, name: "Prova 5", focusTime: 10, breakTime: 5 },
  { id: 7, name: "Prova 5", focusTime: 10, breakTime: 5 },
  { id: 8, name: "Prova 5", focusTime: 10, breakTime: 5 },
  { id: 9, name: "Prova 5", focusTime: 10, breakTime: 5 },
  { id: 10, name: "Prova 5", focusTime: 10, breakTime: 5 },
  { id: 11, name: "Prova 5", focusTime: 10, breakTime: 5 },
];

const PresetsContext = createContext<PresetsContextProps | undefined>(
  undefined
);

export const PresetsProvider = ({ children }: { children: ReactNode }) => {
  const [presets, setPresets] = useState<Preset[]>(testPresets);
  const [selectedPreset, setSelectedPreset] = useState<Preset | null>(null);

  const selectPreset = (id: number) => {
    const preset = presets.find((p) => p.id === id) || null;
    setSelectedPreset(preset);
  };

  const addPreset = (preset: Preset) => {
    preset.id = 12
    setPresets((prevPresets) => [preset, ...prevPresets]);
    selectPreset(preset.id);
  };

  const removePreset = (name: string) => {
    setPresets((prevPresets) => prevPresets.filter((p) => p.name !== name));
    if (selectedPreset && selectedPreset.name === name) {
      setSelectedPreset(null);
    }
  };

  return (
    <PresetsContext.Provider
      value={{
        presets,
        selectedPreset,
        selectPreset,
        addPreset,
        removePreset,
      }}
    >
      {children}
    </PresetsContext.Provider>
  );
};

export const usePresetsContext = () => {
  const context = useContext(PresetsContext);
  if (context === undefined) {
    throw new Error("usePresetsContext must be used within a PresetsProvider");
  }
  return context;
};

export default PresetsContext;
