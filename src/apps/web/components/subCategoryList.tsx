import SubCategoryItem from "./subCategoryItem";

interface Props {
  subCategories: string[];
}

export default function SubCategoryList({ subCategories }: Props) {
  return (
    <div className="bg-highlight-40 text-primary">
      {subCategories.map((item) => (
        <SubCategoryItem key={item} name={item} />
      ))}
    </div>
  );
}
