import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function GoBack() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex gap-2 mt-4 ml-8 cursor-pointer"
    >
      <div className="flex">
        <ArrowLeft size={30} />
        <span className="text-primary font-semibold text-xl">Go back</span>
      </div>
    </button>
  );
}
