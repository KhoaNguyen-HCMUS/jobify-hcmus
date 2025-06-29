import Image from "next/image";

export default function LogoTagline() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center max-w-md">
      {/* Custom Icon - Magnifying glass with profile */}
      <Image
        src="/logo.png"
        alt="JOBIFY Logo"
        width={200}
        height={200}
        className="mb-6"
        priority
      />

      <h1 className="text-5xl font-bold text-primary mb-4">JOBIFY</h1>
      <p className="text-lg font-semibold text-secondary">
        Your next opportunity starts here.
      </p>
    </div>
  );
}
