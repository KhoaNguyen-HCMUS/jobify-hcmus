"use client";
import { CircleDollarSign, Coins, CoinsIcon, DollarSign } from "lucide-react";
import CoinBalance from "../../../components/coinBalance";
import Transaction from "../../../components/transaction";
import { useState, useEffect } from "react";
import ProtectedRoute from "../../../components/ProtectedRoute";

interface CoinsProps {
  coin: {
    current: string;
    real: string;
  };
}

type Bundle = {
  coins: number;
  price: string;
  value: number;
};

const coins = [{ current: "1", real: "1,000" }];

function RecruiterWalletContent() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenNext, setIsOpenNext] = useState(false);
  const [coinAmount, setCoinAmount] = useState(0);
  const [selectedBundle, setSelectedBundle] = useState<{
    coins: number;
    price: string;
    value: number;
  } | null>(null);

  const coin = coins[0];

  useEffect(() => {
    if (isOpen || isOpenNext) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen, isOpenNext]);

  const bundles = [
    { coins: 1, price: "10,000", value: 10000 },
    { coins: 100, price: "100,000", value: 100000 },
    { coins: 200, price: "200,000", value: 200000 },
    { coins: 500, price: "450,000", value: 450000 },
  ];

  const handleBundleSelect = (bundle: Bundle) => {
    setSelectedBundle(bundle);
    setCoinAmount(bundle.coins);
  };

  const calculateTotal = () => {
    if (selectedBundle) return selectedBundle.value.toLocaleString();

    const realPrice = parseInt(coin.real.replace(",", ""));
    return (coinAmount * realPrice).toLocaleString();
  };

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
              <div className="flex justify-between items-center gap-2 text-primary-80 font-semibold text-sm">
                <div className="flex gap-1">
                  <span>In real currency: {coins[0]?.real}</span>
                  <span className="text-primary-60 font-bold">VNĐ</span>
                </div>
                <button
                  onClick={() => setIsOpen(true)}
                  className="relative cursor-pointer hover:bg-primary bg-accent text-neutral-light-20 px-6 py-2 rounded-full"
                >
                  Purchase Coins
                </button>
                {isOpen && (
                  <div
                    onClick={() => {
                      if (!isOpenNext) setIsOpen(false);
                    }}
                    className="fixed inset-0 bg-primary-80 z-50 flex items-center justify-center"
                  >
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="w-3/5 max-h-[90vh] overflow-y-auto bg-neutral-light-20 rounded-2xl relative p-4"
                    >
                      <div className="flex flex-col justify-center px-10 space-y-4">
                        <span className="text-primary font-bold text-center text-3xl">
                          Purchase Coins
                        </span>
                        <div className="flex gap-10">
                          <span className="flex-2 text-secondary text-xl font-semibold border-b border-primary-60">
                            Select Bundle
                          </span>
                          <span className="flex-1 text-secondary text-xl font-semibold">
                            Custom Amount
                          </span>
                        </div>
                        <div className="flex gap-10">
                          <div className="flex-2 flex flex-col gap-2">
                            {bundles.map((bundle, index) => (
                              <div
                                key={index}
                                onClick={() => handleBundleSelect(bundle)}
                                className={`cursor-pointer border-2 rounded-lg p-4 ${
                                  selectedBundle === bundle
                                    ? "border-accent bg-accent-20"
                                    : "border-primary-60 hover:border-accent"
                                }`}
                              >
                                <div className="flex justify-between items-center">
                                  <div className="flex gap-2 items-center">
                                    <span className="text-accent font-bold text-xl">
                                      {bundle.coins}
                                    </span>
                                    <CircleDollarSign
                                      size={26}
                                      className="text-[#FCCA00]"
                                    />
                                  </div>
                                  <div className="flex gap-2 items-center">
                                    <span className="text-primary-80 font-semibold">
                                      {bundle.price}
                                    </span>
                                    <span className="text-primary-60 font-bold">
                                      VNĐ
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="flex-1 flex flex-col gap-2">
                            <div className="flex gap-2 items-center">
                              <span className="text-primary-80 font-semibold">
                                Amount:
                              </span>
                              <input
                                type="number"
                                value={coinAmount}
                                onChange={(e) => setCoinAmount(parseInt(e.target.value) || 0)}
                                className="w-20 border border-primary-60 px-2 py-1 rounded text-center"
                                min="1"
                              />
                              <CircleDollarSign
                                size={20}
                                className="text-[#FCCA00]"
                              />
                            </div>
                            <div className="flex gap-2 items-center">
                              <span className="text-primary-80 font-semibold">
                                Total:
                              </span>
                              <span className="text-accent font-bold">
                                {calculateTotal()}
                              </span>
                              <span className="text-primary-60 font-bold">
                                VNĐ
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-center gap-4">
                          <button
                            onClick={() => setIsOpen(false)}
                            className="cursor-pointer rounded-full bg-secondary-60 hover:bg-secondary text-neutral-light-20 px-6 py-2"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => setIsOpenNext(true)}
                            className="cursor-pointer rounded-full bg-accent hover:bg-secondary text-neutral-light-20 px-6 py-2"
                          >
                            Continue
                          </button>
                          {isOpenNext && (
                            <div className="fixed inset-0 bg-primary-80 z-50 flex items-center justify-center">
                              <div
                                onClick={(e) => e.stopPropagation()}
                                className="w-2/5 overflow-y-auto bg-neutral-light-20 rounded-lg relative p-4"
                              >
                                <div className="flex flex-col justify-center px-10 space-y-4">
                                  <span className="text-primary font-bold text-center text-3xl">
                                    Confirm Payment
                                  </span>
                                  <div className="flex gap-10">
                                    <span className="flex-2 text-secondary text-xl font-semibold border-b border-primary-60">
                                      Transaction Information
                                    </span>
                                    <span className="flex-1 text-secondary text-xl font-semibold">
                                      Scan QR to pay:
                                    </span>
                                  </div>
                                  <div className="flex gap-10 text-lg">
                                    <div className="flex-2 flex flex-col text-primary-80 gap-2">
                                      <span>Coin Amount:</span>
                                      <div className="flex gap-2">
                                        <span className="text-accent font-bold">
                                          {coinAmount}
                                        </span>
                                        <CircleDollarSign
                                          size={26}
                                          className="text-[#FCCA00]"
                                        />
                                      </div>
                                      <span>Total Payment:</span>
                                      <div className="flex gap-2">
                                        <span className="text-accent font-bold">
                                          {selectedBundle
                                            ? selectedBundle.value.toLocaleString()
                                            : calculateTotal()}{" "}
                                        </span>
                                        <b className="text-primary-80">VNĐ</b>
                                      </div>
                                      <span>Order ID:</span>
                                      <div className="flex gap-2">
                                        <span className="text-accent"></span>
                                      </div>
                                    </div>
                                    <div className="flex-1">
                                      <img
                                        src="/logo-light.png"
                                        alt="qr"
                                        className="w-40 h-40 object-contain border border-secondary-80"
                                      />
                                    </div>
                                  </div>
                                  <div className="flex justify-center gap-4">
                                    <button
                                      onClick={() => setIsOpenNext(false)}
                                      className="cursor-pointer rounded-full bg-secondary-60 hover:bg-secondary text-neutral-light-20 px-6 py-2"
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      onClick={() => {
                                        setIsOpen(false);
                                        setIsOpenNext(false);
                                      }}
                                      className="cursor-pointer rounded-full bg-accent hover:bg-secondary text-neutral-light-20 px-6 py-2"
                                    >
                                      Done
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
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

export default function RecruiterWalletPage() {
  return (
    <ProtectedRoute allowedRoles={['company']}>
      <RecruiterWalletContent />
    </ProtectedRoute>
  );
}
