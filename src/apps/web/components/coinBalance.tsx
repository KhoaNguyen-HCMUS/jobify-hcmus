import { CoinsIcon, FilePenLine, Unlink2, Users } from "lucide-react";

interface CompanyProps {
  company: {
    coin: string;
  };
}

const companies = [
  {
    coin: "1,490",
  },
];

export default function CoinBalance() {
  return (
    <div className="flex-1 flex flex-col">
      <div className="text-xl bg-secondary text-neutral-light-20 font-semibold rounded-t-3xl px-4 py-2">
        Coin Balance
      </div>
      <div className="flex justify-end gap-2 bg-highlight-20 rounded-b-4xl px-4 py-6">
        <span className="text-accent font-bold text-3xl">
          {companies[0].coin}
        </span>
        <div className="text-yellow-500">
          <CoinsIcon size={44} />
        </div>
      </div>
    </div>
  );
}
