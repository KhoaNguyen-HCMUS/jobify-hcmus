export default function Footer() {
  return (
    <div className="bg-primary z-40 relative">
      <div className="flex px-8 py-4">
        <div className="flex-1 flex flex-col items-center justify-center gap-2 relative">
          <img
            src="/logo-light.png"
            alt="logo"
            className="h-20 w-20 object-contain"
          />
          <span className="text-highlight-40 font-semibold">JOBIFY</span>
          <span className="text-highlight-60">
            Your next opportunity starts here.
          </span>
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <span className="text-neutral-light-20 font-semibold">About Us</span>
          <span className="text-highlight-40">
            Empowering careers and connecting talent with opportunity across
            Vietnam.
          </span>
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <span className="text-neutral-light-20 font-semibold">
            Contact Us
          </span>
          <div className="flex flex-col text-highlight-40">
            <span>Support page</span>
            <span>Technical Team: jobifydev@gmail.com</span>
            <span>Contact Email: jobify@gmail.com</span>
            <span>Phone: 0938383838</span>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <span className="text-neutral-light-20 font-semibold">Address</span>
          <span className="text-highlight-40">
            227 Nguyen Van Cu, Cho Quan, Ho Chi Minh City
          </span>
        </div>
      </div>
    </div>
  );
}
