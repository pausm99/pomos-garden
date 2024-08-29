type PresetProps = {
  preset: {
    name: string;
    breakTime: number;
    focusTime: number;
  };
};

export default function Preset({ preset }: PresetProps) {
  return (
    <div
      style={{ boxShadow: "0px 1px 3px rgba(0,0,0,0.1)" }}
      className="flex justify-between items-center bg-zinc-100 text-zinc-900 rounded-lg p-2.5"
    >
      <span>{preset.name}</span>
      <div>
        <span>{preset.focusTime}</span>/<span>{preset.breakTime}</span>
      </div>
    </div>
  );
}
