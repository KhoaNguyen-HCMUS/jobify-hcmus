interface SubCategoryItemProps {
  name: string;
}

export default function SubCategoryItem({ name }: SubCategoryItemProps) {
  return (
    <button className="w-full text-left cursor-pointer px-4 py-1 hover:bg-highlight-80">
      <span>{name}</span>
    </button>
  );
}
