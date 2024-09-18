import { usePresetsContext } from "@/contexts/PresetsContext";
import Preset from "./atoms/Preset";
import AddPreset from "./AddPreset";

export default function PresetsSection() {
  const { presets, loading } = usePresetsContext();

  return (
    <div className="flex flex-col gap-2.5 h-full overflow-hidden">
      <h2 className="uppercase text-zinc-400 text-lg">
        Presets ({presets.length})
      </h2>

      <div className="w-full h-full flex flex-col mb-2.5 gap-2.5 overflow-y-auto border rounded-lg p-2.5">
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-lime-500"></div>
          </div>
        ) : (
          presets.map((preset, index) => <Preset key={index} preset={preset} />)
        )}
      </div>
      <AddPreset />
    </div>
  );
}
