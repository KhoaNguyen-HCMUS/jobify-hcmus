import FeaturedJob from "../../components/job/featuredJob";
import TopCompany from "../../components/topCompany";
import CategoryGrid from "../../components/categoryGrid";
import KeywordSearch from "../../components/keywordSearch";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <div className="w-full h-full bg-accent-40">
        <div className="flex flex-col space-y-4 px-15 py-10">
          <h1 className="font-bold text-5xl text-primary">
            Find Opportunities <br /> That Fit You Best!
          </h1>
          <p className="text-2xl text-secondary">
            From Startup Roles to Global Careers - Let's Build Your Future
            Together.
          </p>
        </div>
        <div className="px-10">
          <KeywordSearch />
        </div>
      </div>
      <div>
        <div className="bg-neutral-light-40">
          <h2 className="font-bold text-4xl text-primary pl-10 w-full mb-6 pt-6">
            <i>New Jobs</i>
          </h2>
          <FeaturedJob />
        </div>
        <div className="bg-accent-20">
          <h2 className="font-bold text-4xl text-neutral-light-20 pl-10 py-6 w-full bg-primary mb-6">
            <i>Top Outstanding Industries</i>
          </h2>
          <CategoryGrid />
        </div>
      </div>
    </div>
  );
}
