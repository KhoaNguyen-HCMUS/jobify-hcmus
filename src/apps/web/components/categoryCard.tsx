interface CategoryCardProps {
  category: {
    icon: string;
    name: string;
    jobCount: string;
  };
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <div className="flex flex-col bg-neutral-light-20 rounded-2xl shadow-2xs">
      <img src={category.icon} className="font-bold" />
      <h2 className="text-primary font-semibold">{category.name}</h2>
      <span>{category.jobCount}</span>
    </div>
  );
}
