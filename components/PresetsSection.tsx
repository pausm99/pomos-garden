import { usePresetsContext } from "@/contexts/PresetsContext";
import Preset from "./atoms/Preset";
import AddPreset from "./AddPreset";

export default function PresetsSection() {
  const { presets, loading } = usePresetsContext();
  return (
    <div className="h-full">
      <h2 className="uppercase text-zinc-400 text-lg mb-2.5">Presets ({presets.length})</h2>
      <div className="flex flex-col justify-between gap-10 h-full">
        <div
          style={{ maxHeight: "66%", flex: "3" }}
          className="flex flex-col flex-grow flex-1 gap-2.5 overflow-y-scroll"
        >
          {loading ? (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-lime-500"></div>
            </div>
          ) : (
            presets.map((preset, index) => (
              <Preset key={index} preset={preset} />
            ))
          )}
        </div>
        <AddPreset />
      </div>
    </div>
  );
}
