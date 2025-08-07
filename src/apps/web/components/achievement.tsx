interface AchievementProps {
  achievement: string;
}
export default function Achievement({ achievement }: AchievementProps) {
  return <li className="text-primary-80 px-4">{achievement}</li>;
}
