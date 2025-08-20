import SubCategoryItem from "./subCategoryItem";

interface Props {
  subCategories: { id: string; name: string }[];
  selectedId?: string;
  onSelect?: (id: string) => void;
}

export default function SubCategoryList({ subCategories, selectedId, onSelect }: Props) {
  return (
    <div className="bg-highlight-40 text-primary">
      {subCategories.map((item) => (
        <SubCategoryItem
          key={item.id}
          id={item.id}
          name={item.name}
          selected={item.id === selectedId}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
