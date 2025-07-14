interface ProfessionProps {
  profession: string;
}

export default function Profession({ profession }: ProfessionProps) {
  return (
    <div className="bg-neutral-medium-60 text-secondary text-sm py-2 px-6 rounded-full">
      {profession}
    </div>
  );
}
