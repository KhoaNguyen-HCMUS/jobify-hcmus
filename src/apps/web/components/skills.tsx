interface SkillsProps {
  skill: string;
}

export default function Skills({ skill }: SkillsProps) {
  return (
    <div className="bg-neutral-medium-60 text-secondary text-sm py-2 px-6 rounded-full">
      {skill}
    </div>
  );
}
