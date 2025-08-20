interface SubCategoryItemProps {
  id: string;
  name: string;
  selected?: boolean;
  onSelect?: (id: string) => void;
}

export default function SubCategoryItem({ id, name, selected = false, onSelect }: SubCategoryItemProps) {
  return (
    <button
      onClick={() => onSelect?.(id)}
      className={`w-full text-left cursor-pointer px-4 py-1 hover:bg-accent hover:text-white ${
        selected ? 'bg-accent text-white' : ''
      }`}
    >
      <span>{name}</span>
    </button>
  );
}
