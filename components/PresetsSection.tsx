import Preset from "./atoms/Preset";

export default function PresetsSection() {
  const presets = [
    { name: "Study", focusTime: 40, breakTime: 5 },
    { name: "Study", focusTime: 40, breakTime: 5 },
    { name: "Study", focusTime: 40, breakTime: 5 },
    { name: "Study", focusTime: 40, breakTime: 5 },
    { name: "Study", focusTime: 40, breakTime: 5 },
  ];
  return (
    <div className="flex flex-col">
      <h2 className="uppercase text-zinc-400">Presets</h2>
      <div className="flex flex-col gap-2">
        {presets.map((preset) => (
          <Preset preset={preset} />
        ))}
      </div>
    </div>
  );
}
