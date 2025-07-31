import { MapPin, Briefcase } from "lucide-react";
import CompanyInformation from "../../../components/companyInformation";
import Profession from "../../../components/profession";
import Industry from "../../../components/industry";

export default function RecruiterProfilePage() {
  const userData = {
    companyName: "Hinh Diem Xuan",
    website: "https://www.unilever.com",
    taxCode: "0101234567",
    businessLicenseNumber: "0101234567",
    introduce:
      "Unilever Pureit – the world's No. 1 best-selling home water purifier brand belonging to Unilever Group. Unilever is one of the world's leading multinational corporations specializing in personal care and family care products. Unilever currently operates in more than 190 countries and territories with a commitment to improving the quality of life of people around the world through its products and services.",
    address: "156 Nguyễn Lương Bằng, P. Tân Phú, Quận 7, TP.HCM",
    logo: "/avt.jpg",
  };

  const industries = [
    { industry: "Sales &Búiness Development" },
    { industry: "Marketing" },
  ];

  const professions = [
    { profession: "Digital Marketing" },
    { profession: "Regional/Area Sales Management" },
  ];

  return (
    <div className="w-full h-full bg-neutral-light-60">
      <div className="flex flex-col justify-between px-20 py-10">
        <div className="text-accent font-bold text-2xl">
          Company Information
        </div>
        <div className="flex flex-col gap-4 p-4">
          <div className="flex flex-wrap">
            <div className="flex-1 flex flex-col gap-2">
              <CompanyInformation
                title="Company Name"
                inFor={userData.companyName}
              />
              <CompanyInformation title="Tax code" inFor={userData.taxCode} />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <CompanyInformation title="Website" inFor={userData.website} />
              <CompanyInformation
                title="Business License Number"
                inFor={userData.businessLicenseNumber}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <b className="text-primary">Introduce yourself:</b>
            <span className="text-primary-80">{userData.introduce}</span>
          </div>
          <div className="flex flex-col gap-2">
            <b className="text-primary">Address:</b>
            <div className="flex flex-wrap gap-2 text-primary-80">
              <MapPin className="w-4 h-4" />
              <span className="flex justify-between">{userData.address}</span>
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="flex-1 flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <span className="text-primary text-lg">
                  <b>Industry:</b>
                </span>
                <div className="flex flex-wrap gap-2 items-center text-primary-80 font-semibold">
                  <Briefcase className="w-4 h-4 mr-1" />
                  <div className="flex flex-wrap gap-2 ">
                    {industries.map((industry, idx) => (
                      <Industry key={idx} industry={industry.industry} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-primary text-lg">
                  <b>Profession:</b>
                </span>
                <div className="flex flex-wrap gap-2 items-center text-primary-80 font-semibold">
                  <Briefcase className="w-4 h-4 mr-1" />
                  <div className="flex flex-wrap gap-2 ">
                    {professions.map((profession, idx) => (
                      <Profession
                        key={idx}
                        profession={profession.profession}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <b className="text-primary">Logo:</b>
              <div>
                <img
                  src={userData.logo}
                  alt="logo"
                  className="absolute object-contain rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-4 mt-15">
          <div className="bg-primary-80 hover:bg-accent cursor-pointer text-neutral-light-20 font-semibold rounded-2xl px-6 py-2">
            <a href="/recruiter/profile/edit">Edit</a>
          </div>
          <div className="bg-accent hover:bg-primary-80 cursor-pointer text-neutral-light-20 font-semibold rounded-2xl px-6 py-2">
            <a href="/candidate/profile/edit">Active</a>
          </div>
        </div>
      </div>
    </div>
  );
}
