interface CategoryCardProps {
  category: {
    icon: string;
    name: string;
    jobCount: string;
  };
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <div className="flex flex-col bg-neutral-light-20 rounded-2xl shadow-2xs justify-center items-center py-10 m-6 cursor-pointer">
      <p>{category.icon}</p>
      <h2 className="text-primary font-semibold">{category.name}</h2>
      <span className="text-primary-80 font-semibold">{category.jobCount}</span>
    </div>
  );
}
