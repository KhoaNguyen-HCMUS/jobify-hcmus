import { CoinsIcon } from "lucide-react";
import CoinBalance from "../../../components/coinBalance";
import Transaction from "../../../components/transaction";

interface CoinsProps {
  coin: {
    current: string;
    real: string;
  };
}

const coins = [{ current: "1", real: "1,000" }];

export default function RecruiterWalletPage() {
  return (
    <div className="w-full h-full bg-neutral-light-60">
      <div className="flex flex-col px-20 py-10 gap-10">
        <div className="flex flex-wrap gap-10">
          <CoinBalance />
          <div className="flex-1 flex flex-col">
            <div className="text-xl bg-secondary text-neutral-light-20 font-semibold rounded-t-3xl px-4 py-2">
              Purchase Coins
            </div>
            <div className="flex flex-col gap-2 bg-highlight-20 rounded-b-4xl p-4">
              <div className="flex gap-1 text-primary-80 font-semibold text-sm">
                <span>Current coin price: {coins[0]?.current}</span>
                <CoinsIcon size={18} className="text-yellow-500" />
              </div>
              <div className="flex justify-between gap-2 text-primary-80 font-semibold text-sm">
                <div className="flex gap-1">
                  <span>In real currency: {coins[0]?.real}</span>
                  <span className="text-primary-60 font-bold">VNĐ</span>
                </div>
                <button className="cursor-pointer hover:bg-primary bg-accent text-neutral-light-20 px-6 py-2 rounded-full">
                  Purchase Coins
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-xl bg-secondary text-neutral-light-20 font-semibold rounded-t-3xl px-4 py-2">
            Transaction History
          </div>
          <div className="flex bg-accent-40 text-primary-80 font-semibold px-4 py-2">
            <span className="flex-2">Date</span>
            <span className="flex-1">Type</span>
            <span className="flex-5">Description</span>
            <span className="flex-1">Amount</span>
          </div>
          <Transaction />
        </div>
      </div>
    </div>
  );
}
