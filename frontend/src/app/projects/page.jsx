'use client';

import { useRouter } from 'next/navigation';

const projects = [
  {
    id: "so4-epcm",
    projectTitle: "P5 Qusahwira Production Facilities Upgrade (ON PLOT)",
    // description: "As part of ADNOC Onshore’s South East AiP5 development, the SE AiP5 (On-Plot)",
    location: "Abu Dhabi, UAE",
    client: "ADNOC",
    schedule: "Ongoing",
    link: "/quswahira-upgrade",
  },
  {
    id: "so5b-bab",
    projectTitle: "Engineering Services For Balance Piping Works Related To RHCU EPC ISBL AND FEED OSBL ",
    // description: "Built a large-scale processing unit with a record safety record in the Gulf region",
    location: "Mažeikiai, Lithuania",
    client: "AB Orlen Lietuva",
    schedule: "Ongoing",
    link: "/engineering-service",
  },
  {
    id: "so5c-buhasa",
    projectTitle: "Services for SPEL Job ",
    // description: "Constructed turbine platforms for renewable energy in the North Sea.",
    location: "Ras Markaz, Oman",
    client: "OTTCO",
    schedule: "Ongoing",
    link: "/spel",
  },
  {
    id: "so4-adnoc",
    projectTitle: "Documents for MTO and BOQ for LZ LTDP 1",
    // description: "Constructed turbine platforms for renewable energy in the North Sea.",
    location: "Lower Zakum Field, Offshore UAE",
    client: "CPE / ADNOC",
    schedule: "Ongoing",
    link: "/mto",
  },
  {
    id: "HDPE-adnoc",
    projectTitle: "HDPE Internal Lining Service",
    // description: " Tyhoo Chile SpA commissioned a comprehensive HDPE internal lining project valued at USD 6,278,500.00, aimed at enhancing the internal protection and longevity of pipeline systems. The scope included mobilization of specialized equipment and personnel, internal cleaning and inspection, precise installation of HDPE lining, quality testing, and final demobilization. All works were executed in strict compliance with safety and quality standards, ensuring long-term operational integrity.",
    location: "",
    client: "ADNOC",
    schedule: "Ongoing",
    link: "/hdpe",
  },
  {
    id: "Desa-adnoc",
    projectTitle: "Desa Linated Water Impulsion System Bypass",
    // description: "  By accessing our services or website, you agree to the terms described in this Privacy Policy. If you do not agree with any part of this policy, please do not use our services or website.",
    location: "",
    client: "ADNOC ",
    schedule: "Ongoing",
    link: "/desa",
  },
];

export default function ProjectsPage() {
  const router = useRouter();

  return (
    <div className="w-full h-screen px-2 x-4 sm:px-10 py-10">
            <div className="flex justify-center mb-10 relative">
        <div className="text-center relative">
          <h2 className="text-[36px] md:text-[48px] font-bold text-gray-900 pb-5 uppercase">
         Projects and <span className='text-yellow-400'> updates </span> 
          </h2>
          <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-32 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
        </div>
      </div>
      <div className="overflow-x-auto shadow-lg">
        <table className="min-w-full table-auto border border-yellow-400 text-sm sm:text-base">
          <thead className="bg-yellow-400 text-white">
            <tr>
              <th className="border border-yellow-600 px-4 py-3">SN</th>
              <th className="border border-yellow-600 px-4 py-3 text-left">
                Project Title
              </th>
              <th className="border border-yellow-600 px-4 py-3 text-left">
                Project Description
              </th>
              <th className="border border-yellow-600 px-4 py-3 text-left">
                Project Location
              </th>
              <th className="border border-yellow-600 px-4 py-3 text-left">
                Client / Contractor
              </th>
              <th className="border border-yellow-600 px-4 py-3 text-left">
                Schedule
              </th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr
                key={project.id}
                onClick={() => router.push(project.link)}
                className="cursor-pointer hover:bg-yellow-100 transition"
              >
                <td className="border border-yellow-400 px-4 py-2 text-center">
                  {index + 1}
                </td>
                <td className="border border-yellow-400 px-4 py-2 font-semibold">
                  {project.projectTitle}
                </td>
                <td className="border border-yellow-400 px-4 py-2">
                  {project?.description}
                </td>
                <td className="border border-yellow-400 px-4 py-2">
                  {project.location}
                </td>
                <td className="border border-yellow-400 px-4 py-2">
                  {project.client}
                </td>
                <td className="border border-yellow-400 px-4 py-2">
                  {project.schedule}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
