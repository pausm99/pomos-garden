import {
  actionCreatePreset,
  actionDeletePreset,
  actionGetAllPresetsForUser,
} from "@/actions/presets";
import { Preset } from "@/prisma/generated/zod";
import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { PresetCreateInputSchema } from "@/prisma/generated/zod";
import { z } from "zod";
import { useToastContext } from "./ToastsContext";
import { useUserContext } from "./UserContext";
type PresetCreate = z.infer<typeof PresetCreateInputSchema>;

interface PresetsContextProps {
  presets: Preset[];
  selectedPreset: Preset | null;
  selectPreset: (id: string) => void;
  addPreset: (preset: PresetCreate) => void;
  deletePreset: (presetId: string) => void;
  loading: boolean;
}

const PresetsContext = createContext<PresetsContextProps | undefined>(
  undefined
);

export const PresetsProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUserContext();
  const { addToast } = useToastContext();

  const [presets, setPresets] = useState<Preset[]>([]);
  const [selectedPreset, setSelectedPreset] = useState<Preset | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPresets = async () => {
      try {
        setLoading(true);
        if (user) {
          const fetchetPresets = await actionGetAllPresetsForUser(
            user.id
          );
          setPresets(fetchetPresets);
        }
      } catch (error) {
        console.error("Error fetching presets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPresets();
  }, [user]);

  const selectPreset = (id: string) => {
    const preset = presets.find((p) => p.id === id) || null;
    setSelectedPreset(preset);
  };

  const addPreset = async (preset: PresetCreate) => {
    const newPreset = await actionCreatePreset(
      preset.userId,
      preset.name,
      preset.focusTime,
      preset.breakTime
    );
    addToast({
      description: `Preset ${newPreset.name} added`
    })
    setPresets((prevPresets) => [...prevPresets, newPreset]);
    return newPreset;
  };

  const deletePreset = async (presetId: string) => {
    const deletedPreset = await actionDeletePreset(presetId);
    addToast({
      description: `Preset ${deletedPreset.name} deleted`
    })
    const updatedPresets = presets.filter((preset) => preset.id !== presetId);
    setPresets(updatedPresets);
  };

  return (
    <PresetsContext.Provider
      value={{
        presets,
        selectedPreset,
        selectPreset,
        addPreset,
        deletePreset,
        loading,
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
