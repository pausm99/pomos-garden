import { actionDeletePreset } from "@/actions/presets";
import { usePresetsContext } from "@/contexts/PresetsContext";
import { useTimerContext } from "@/contexts/TimerContext";
import { Preset as PresetType } from "@/prisma/generated/zod";
import { Trash } from "lucide-react";

type PresetProps = {
  preset: PresetType;
};

export default function Preset({ preset }: PresetProps) {
  const { selectPreset, selectedPreset, deletePreset } = usePresetsContext();
  const { hasStarted } = useTimerContext();

  const handleSelectPreset = () => {
    if (!hasStarted) selectPreset(preset.id);
  };

  const handledeletePreset = () => {
    if (!hasStarted) {
      deletePreset(preset.id);
    }
  };

  return (
    <div className="preset relative flex items-center justify-between gap-2.5 transition-all duration-500 ease-out hover:pr-12">
      <div
        onClick={handleSelectPreset}
        style={{ boxShadow: "0px 1px 3px rgba(0,0,0,0.1)" }}
        className={`flex justify-between items-center ${
          hasStarted ? "cursor-not-allowed" : "cursor-pointer"
        } ${
          selectedPreset?.id === preset.id ? "bg-white" : "bg-zinc-100"
        } text-zinc-900 rounded-lg p-2.5 flex-1`}
      >
        <span>{preset.name}</span>
        <div>
          <span>{formatTime(preset.focusTime)}</span>/<span>{formatTime(preset.breakTime)}</span>
        </div>
      </div>
      <span
        className={`preset-trash h-full absolute right-0 top-0 opacity-0 transition-opacity duration-500 ease-in-out bg-zinc-100 rounded-lg p-2.5 ${
          hasStarted ? "cursor-not-allowed" : "cursor-pointer"
        }`}
        onClick={handledeletePreset}
      >
        <Trash size={16} />
      </span>
    </div>
  );
}

function formatTime(segundos: number): string {
  const horas = Math.floor(segundos / 3600);
  const segundosRestantes = segundos % 3600;
  const minutos = Math.floor(segundosRestantes / 60);
  const segundosFinales = segundosRestantes % 60;

  const partes: string[] = [];

  if (horas > 0) {
      partes.push(`${horas} h`);
  }
  if (minutos > 0) {
      partes.push(`${minutos} m`);
  }
  if (segundosFinales > 0) {
      partes.push(`${segundosFinales} s`);
  }

  if (partes.length === 0) {
      return "0 s";
  }

  return partes.join(' ');
}

