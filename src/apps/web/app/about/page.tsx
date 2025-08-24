export default function AboutUsPage() {
  return (
    <div className="flex flex-col my-10 gap-10 mx-30">
      <div className="border border-highlight-20 bg-neutral-light-20 rounded-2xl py-10">
        <div className="flex flex-col items-center text-center space-y-6">
          <span className="font-bold text-4xl text-accent">ABOUT US</span>
          <p className="text-primary-80 font-semibold text-xl">
            Empowering careers and connecting talent with opportunity across
            Vietnam.
          </p>
        </div>
      </div>
      <div className="rounded-3xl flex flex-col gap-10">
        <div className="rounded-2xl space-y-4">
          <div className="border border-primary-20 rounded-3xl flex flex-col bg-neutral-light-20 space-y-8">
            <span className="rounded-t-3xl text-background text-center font-semibold text-3xl px-10 py-4 bg-primary">
              GET TO KNOW US
            </span>
            <div className="rounded-b-3xl flex flex-col gap-4 px-10">
              <div>
                <span className="text-accent font-semibold text-2xl">
                  Our Mission
                </span>
                <div>
                  <span className="text-primary">
                    <i>
                      “Connect the right people with the right opportunities.”
                    </i>
                    <p>
                      Jobify was created to bridge the gap between top talent
                      and growing companies in Vietnam. We help job seekers find
                      meaningful careers, and employers find the right match
                      faster.
                    </p>
                  </span>
                </div>
              </div>
              <div>
                <span className="text-accent font-semibold text-2xl">
                  Our Vision
                </span>
                <div>
                  <span className="text-primary">
                    <p>
                      To become Vietnam's most trusted job-matching platform
                      with smart recommendations and an easy-to-use experience.
                    </p>
                  </span>
                </div>
              </div>
              <div>
                <span className="text-accent font-semibold text-2xl">
                  Partners & Achievements
                </span>
                <span className="text-primary">
                  <span className="text-primary px-10">
                    <li>50+ verified companies onboard</li>
                    <li>3000+ candidates registered in the first 3 months</li>
                    <li>Trusted by startups, SMEs, and top recruiters</li>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
