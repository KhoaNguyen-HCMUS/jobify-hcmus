import Achievement from "./achievement";

interface WorkExperienceProps {
  title: string;
  company: string;
  timeRange: string;
}

const achievements = [
  {
    achievement:
      "Developed and maintained robust backend APIs using Python and Django, supporting over 100,000 daily active users.",
  },
  {
    achievement:
      "Collaborated with cross-functional teams to implement new features, reducing development cycle time by 15%.",
  },
];

export default function WorkExperience({
  title,
  company,
  timeRange,
}: WorkExperienceProps) {
  return (
    <div className=" flex flex-col gap-2">
      <div className="text-primary font-semibold">{title}</div>
      <div className="text-secondary font-semibold">{company}</div>
      <div className="text-accent font-semibold">{timeRange}</div>
      <div className="flex flex-col">
        <span className="text-primary-80">Achievements:</span>
        <div className="flex flex-col gap-2 px-2">
          {achievements?.map((achievement, idx) => (
            <Achievement key={idx} achievement={achievement.achievement} />
          ))}
        </div>
      </div>
    </div>
  );
}
