export default function AboutUsPage() {
  return (
    <div className="flex flex-col my-20 gap-20 mx-30">
      <div className="shadow-xl bg-neutral-light-20 rounded-2xl pt-10 pb-6">
        <div className="flex flex-col items-center text-center space-y-6">
          <span className="font-bold text-4xl text-accent">ABOUT US</span>
          <p className="text-primary-80 font-semibold text-2xl">
            Empowering careers and connecting talent with opportunity across
            Vietnam.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-10">
        <div className="shadow-xl rounded-2xl space-y-4">
          <div className="flex flex-col bg-neutral-light-20 space-y-4 mb-6">
            <span className="rounded-t-3xl text-background font-semibold text-3xl px-10 py-4 bg-primary">
              Our Mission
            </span>
            <span className="text-primary px-10">
              <i>“Connect the right people with the right opportunities.”</i>
              <p>
                Jobify was created to bridge the gap between top talent and
                growing companies in Vietnam. We help job seekers find
                meaningful careers, and employers find the right match faster.
              </p>
            </span>
          </div>
        </div>
        <div className="shadow-xl rounded-2xl space-y-4">
          <div className="flex flex-col bg-neutral-light-20 space-y-4 mb-6">
            <span className="rounded-t-3xl text-background font-semibold text-3xl px-10 py-4 bg-primary">
              Our Vision
            </span>
            <span className="text-primary px-10">
              <p>
                To become Vietnam's most trusted job-matching platform with
                smart recommendations and an easy-to-use experience.
              </p>
            </span>
          </div>
        </div>
        <div className="shadow-xl rounded-2xl space-y-4">
          <div className="flex flex-col bg-neutral-light-20 space-y-4 mb-6">
            <span className="rounded-t-3xl text-background font-semibold text-3xl px-10 py-4 bg-primary">
              Partners & Achievements
            </span>
            <span className="text-primary px-10">
              <li>50+ verified companies onboard</li>
              <li>3000+ candidates registered in the first 3 months</li>
              <li>Trusted by startups, SMEs, and top recruiters</li>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
