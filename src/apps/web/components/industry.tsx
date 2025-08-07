interface IndustryProps {
  industry: string;
}

export default function Industry({ industry }: IndustryProps) {
  return (
    <div className="bg-neutral-medium-60 text-secondary text-sm py-2 px-6 rounded-full">
      {industry}
    </div>
  );
}
