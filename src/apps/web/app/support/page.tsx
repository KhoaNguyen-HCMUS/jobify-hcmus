export default function SupportPage() {
  return (
    <div className="flex flex-col my-20 gap-20 mx-30">
      <div className="shadow-xl bg-neutral-light-20 rounded-2xl pt-10 pb-6">
        <div className="flex flex-col items-center text-center space-y-6">
          <span className="font-bold text-4xl text-accent">SUPPORT CENTER</span>
          <p className="text-primary-80 font-semibold text-2xl">
            We are here to help you! Find answers to some questions about job
            search and use the Jobfinder platform.
          </p>
        </div>
      </div>
      <div className="shadow-xl bg-neutral-light-20 rounded-2xl space-y-4">
        <div className="flex flex-col space-y-4">
          <span className="rounded-t-3xl text-background font-semibold text-3xl text-center px-6 py-4 bg-primary">
            Frequently asked questions
          </span>
          <div className="flex flex-col gap-6 mt-6 mb-10">
            <div className="flex flex-col px-4 gap-2 bg-highlight-20 mx-20 py-4 rounded-2xl shadow-xl">
              <span className="text-accent font-semibold text-2xl">
                How do I apply for a job on Jobify?
              </span>
              <span className="text-primary">
                Simply browse job listings, click on a job that interests you,
                then click the "Apply" button. Make sure you’ve completed your
                profile and uploaded a resume.
              </span>
            </div>
            <div className="flex flex-col px-4 gap-2 bg-highlight-20 mx-20 py-4 rounded-2xl shadow-xl">
              <span className="text-accent font-semibold text-2xl">
                I forgot my password. What should I do?
              </span>
              <span className="text-primary">
                Click on “Forgot Password” at the login screen. Enter your email
                address, and we’ll send you a secure link to reset your
                password.
              </span>
            </div>
            <div className="flex flex-col px-4 gap-2 bg-highlight-20 mx-20 py-4 rounded-2xl shadow-xl">
              <span className="text-accent font-semibold text-2xl">
                How can I post a job as a company?
              </span>
              <span className="text-primary">
                First, register an account as a Company. After your account is
                verified by a moderator, you can access the dashboard and post
                jobs using available coins.
              </span>
            </div>
            <div className="flex flex-col px-4 gap-2 bg-highlight-20 mx-20 py-4 rounded-2xl shadow-xl">
              <span className="text-accent font-semibold text-2xl">
                How do job coins work for companies?
              </span>
              <span className="text-primary">
                Each company starts with 20 free coins. Posting a job costs 10
                coins. You can purchase more coins from your dashboard to
                continue posting.
              </span>
            </div>
            <div className="flex flex-col px-4 gap-2 bg-highlight-20 mx-20 py-4 rounded-2xl shadow-xl">
              <span className="text-accent font-semibold text-2xl">
                How can I contact support if I encounter an issue?
              </span>
              <span className="text-primary">
                Go to the Help / Support page and send email us directly at{" "}
                <b className="text-accent font-semibold">support@jobify.com</b>.
                We usually respond within 24 hours.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
