import { ArrowLeft } from "lucide-react";

export default function GoBack() {
  return (
    <div className="flex gap-2 mt-4 ml-8">
      <a href="/" className="flex">
        <ArrowLeft size={30} />
        <span className="text-primary font-semibold text-xl">Go back</span>
      </a>
    </div>
  );
}
