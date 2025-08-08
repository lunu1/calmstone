// src/app/careers/page.jsx — Server Component

import Image from "next/image";
import Link from "next/link";
import JobCard from "./JobCard";
import Testimonials from "../../../components/Testimonials";

export const metadata = { title: "Careers – Join Our Energy Team" };

/* -------------------------------------------------------------------------- */
/*                               Dummy job data                               */
/* -------------------------------------------------------------------------- */
const dummyJobs = [
  {
    _id: "1",
    title: "Construction Manager (Oil & Gas)",
    department: "Construction",
    location: "Abu Dhabi, UAE",
    type: "Full-time",
    experience: "15+ years",
    salary: "Starting from AED 15,000 to AED 25,000",
    description:
      "We are hiring a performance-driven Construction Manager for large-scale oil & gas and EPC construction projects in the UAE. The selected candidate will oversee project execution, field management, and stakeholder coordination while being held accountable for KPIs and incentivized through a lucrative commission and bonus structure.",
    responsibilities: [
      "Project Execution & Delivery : Lead and deliver EPC and construction projects in compliance with contractual, budgetary, and safety requirements.",
      "Define project milestones and ensure on-time completion within approved scope and cost.",
      "Manage subcontractors, vendors, consultants, and site teams across disciplines.",
      "Conduct progress reviews, generate reports, and ensure quality deliverables.",
    "Monitor risk and mitigate project deviations proactively.Business Development & Commercial Growth ",
    "Identify new project opportunities within existing client accounts and new sectors.",
    "Identify scope variations, additional works, and VO opportunities",
    "Prepare technical proposals and tender documentation in coordination with estimation and commercial teams. ",
    "Build strong relationships with ADNOC, EPC contractors, and consultants",
    "Influence repeat business and client referrals.Health, Safety & Compliance",
    "Ensure full HSE compliance with ADNOC and UAE regulations.",
    "Lead audits, inspections, and incident prevention programs.",
    "Team Building : Lead the development, mentoring, and upskilling of the site project team ",
    "Support HR in recruiting specialist roles through networks.",
    "Maintain a network of manpower suppliers and subcontractors to ensure rapid resource mobilization during project ramp-ups",
    "Support long-term team capability by assigning coaching, on-the-job training, and structured skill-building programs",

    ],
    requirements: [
      "MBA degree in Civil, Mechanical, Petroleum, or Electrical Engineering.",
     "Minimum 15 + years of experience within minimum 5 years in upstream construction in oil & gas (onshore/offshore).",
     "10 years of UAE experience is mandatory",
     "Minimum of $50 million value projects handled in the past under the direct involvements.",
     "Candidates with ADNOC project experience or ADNOC approval are preferred."
    ],
    postedDate: "04-08-2025",
  },
  {
    _id: "2",
    title: "Project Engineer – Civil",
    department: "Engineering",
    location: "Abu Dhabi, UAE (Site-based)",
    type: "Full-time",
    experience: "7+ years",
    salary: "Starting from AED 8000",
    description:
      "The role involves supervising civil works, reviewing drawings and BOQs, coordinating subcontractors, and ensuring compliance with quality and safety standards, especially within ADNOC project environments.",
    responsibilities: [
      "Review drawings, perform quantity take-off (BOQ), and support material planning.",
      "Develop construction execution statement and ITP plan",
      "Supervise site works: excavation, concrete, foundations, and structural activities.",
      "Coordinate setting out, site execution, and subcontractor activities.",
      "Ensure works meet design, safety, and quality standards.",
      "Support civil QC, inspections, and documentation.",
      "Liaise with consultants, contractors, and client reps to resolve site issues.",
    ],
    requirements: [
      "Bachelor’s in Civil Engineering.",
      "7+ years of civil site experience, incl. 2+ years in ADNOC.",
      "Skilled in drawing interpretation, work planning, and quantity take-off.",
      "Familiar with civil QC processes and concrete/foundation works.",
      "Strong coordination, problem-solving, and communication skills.",
      "Fluent in English.",
    ],
    postedDate: "04-08-2025",
  },
  // {
  //   _id: "3",
  //   title: "Site Surveyor (Civil)",
  //   department: "Surveying",
  //   location: "Abu Dhabi, UAE (Site-based)",
  //   type: "Full-time",
  //   experience: "7+ years",
  //   salary: "Starting from AED 7000",
  //   description:
  //     "The ideal candidate will have strong knowledge of survey instruments, ADNOC standards, and site coordination, ensuring precision in all civil layouts and structural executions.",
  //   responsibilities: [
  //     "Perform setting out, leveling, and alignment for all civil construction activities (e.g., excavation, foundations, concrete structures).",
  //     "Interpret drawings and coordinate survey data with construction plans.",
  //     "Operate total stations, GPS, auto levels, and other survey equipment accurately.",
  //     "Prepare and maintain survey records, site measurement logs, and as-built data.",
  //     "Coordinate with engineers, QC team, and subcontractors to ensure correct layout and elevations.",
  //     "Verify dimensions, levels, and alignment during and after execution.",
  //     "Support quality inspections and provide survey data for reporting and handover.",
  //   ],
  //   requirements: [
  //     "Diploma or Bachelor’s in Surveying, Civil Engineering, or related field.",
  //     "7+ years of site surveying experience in civil projects; ADNOC or UAE oil & gas site experience required.",
  //     "Proficient in using surveying instruments (Total Station, GPS, Level).",
  //     "Strong knowledge of reading civil drawings and setting out procedures.",
  //     "Familiarity with ADNOC standards is a strong advantage.",
  //     "Fluent in English.",
  //     "UAE Experience is mandatory.",
  //   ],
  //   postedDate: "2024-01-15",
  // },
  // {
  //   _id: "4",
  //   title: "HSE Officer",
  //   department: "Health & Safety",
  //   location: "Abu Dhabi, UAE (Site-based)",
  //   type: "Full-time",
  //   experience: "7+ years",
  //   salary: "Starting from AED 6000",
  //   description:
  //     "The ideal candidate will ensure compliance with ADNOC and UAE HSE regulations, manage risk assessments, and promote a strong safety culture across all project activities.",
  //   responsibilities: [
  //     "Implement and monitor the site-specific HSE Management System in accordance with ADNOC and UAE legal requirements.",
  //     "Conduct daily site inspections, toolbox talks, and safety briefings to promote HSE awareness.",
  //     "Identify unsafe acts and conditions and recommend corrective actions.",
  //     "Maintain records of incident/accident reports, near misses, and conduct root cause analysis.",
  //     "Ensure Permit to Work (PTW) compliance and participate in job safety analysis (JSA).",
  //     "Coordinate emergency drills, fire safety checks, and first aid preparedness.",
  //     "Liaise with site management, subcontractors, and client representatives on all HSE matters.",
  //     "Prepare and submit daily, weekly, and monthly HSE reports to the management.",
  //     "Support audits, risk assessments, and environmental monitoring activities.",
  //   ],
  //   requirements: [
  //     "Bachelor’s degree or Diploma in Engineering or Occupational Health & Safety.",
  //     "Minimum 7 years of HSE experience in civil/oil & gas construction projects.",
  //     "NEBOSH IGC certification is mandatory.",
  //     "ADNOC-approved or experience working under ADNOC HSE guidelines (preferred).",
  //     "Excellent communication and interpersonal skills.",
  //   ],
  //   postedDate: "2024-01-15",
  // },
  {
    _id: "5",
    title: "Accountant",
    department: "Finance",
    location: "Abu Dhabi, UAE (Site-based)",
    type: "Full-time",
    experience: "5+ years",
    salary: "Starting AED 5000- AED 6000",
    preference: "The candidates who are immediately available to join",
    description:
      "The ideal candidate must have a minimum of 5 years of accounting experience, with at least 3 years of relevant experience within the UAE. Proficiency in accounting software’s and solid knowledge of UAE financial regulations and labor law are essential.",
    responsibilities: [
      "Assist in day-to-day accounting tasks including data entry, ledger maintenance, and reconciliations.",
      "Manage accounts payable and receivable.",
      "Support in monthly, quarterly, and yearly closings.",
      "Prepare financial reports as per senior accountant or management requirements.",
      "Ensure compliance with UAE financial regulations and company policies.",
      "Maintain accurate and up-to-date financial records.",
      "Experience in handling VAT submissions, and financial audits.",
      "Support audit preparations and coordination with external auditors.",
      "Outgoing personality for submissions and collections.",
    ],
    requirements: [
      "Bachelor’s degree in Accounting, Finance, or a related field.",
      "Minimum 5 years of accounting experience, with at least 3 years in the UAE.",
      "Hands-on experience with QuickBooks and other accounting software’s are a plus.",
      "Strong understanding of UAE financial regulations and labor law.",
      "Ability to work independently and as part of a team.",
      "Strong communication and reporting skills.",
    ],
    postedDate: "04-08-2025",
  },
  // {
  //   _id: "6",
  //   title: "Project Planning Control Engineer",
  //   department: "Project Controls",
  //   location: "Abu Dhabi, UAE",
  //   type: "Full-time",
  //   experience: "8–10 years",
  //   salary: "Starting AED 7000",
  //   preference: "The candidates who are immediately available to join",

  //   description:
  //     "The Project Planning Control Engineer is responsible for planning, scheduling, cost control, and progress monitoring of Oil & Gas projects. The ideal candidate will have expertise in Engineering phases of projects, cost estimation, risk analysis, and scheduling tools like Primavera P6 and MS Project.",
  //   responsibilities: [
  //     "Provide a 2 month look ahead plan and coordinate with project team for any project delays and development of recovery plan.",
  //     "Maintain and update the PMS for any modifications and prepare the weekly progress report to be submitted to Client every Friday.",
  //     "Develop Work Breakdown Structures (WBS) and resource-loaded schedules for Engineering.",
  //     "Monitor project costs and ensure alignment with the approved budget.",
  //     "Prepare cost estimates, cash flow forecasts, and variance reports.",
  //     "Evaluate payment certificates of subcontractor ensuring that there are no cost overruns of progress claims.",
  //     "Prepare and submit progress certificates in a timely manner to ensure positive cashflow.",
  //     "Identify project risks and develop risk mitigation plans.",
  //     "Implement Earned Value Management (EVM) techniques for tracking performance.",
  //   ],
  //   requirements: [
  //     "8-10  years of experience in project planning & control in Oil & Gas, EPC projects.",
  //     "Previous experience working for ADNOC projects.",
  //     "Bachelors or above degree in Civil, Mechanical, Petroleum, or Electrical Engineering Proficiency in Primavera P6 is mandatory.",
  //     "Strong understanding of project management methodologies, risk assessment, and cost estimation.",
  //     "Knowledge of international codes and standards applicable to Oil & Gas projects.",
  //     "Certification in PMP, CAPM, PRINCE2, or AACE (CCP, PSP) is a plus.",
  //   ],
  //   postedDate: "2024-01-15",
  // },
];

export default async function CareersPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-orange-200">
   
  
            <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center bg-black text-white">
              <Image
                src="/join.jpg" // ← Update with your actual image
                alt="Orlen Lietuva RHCU EPC"
                layout="fill"
                objectFit="cover"
                quality={90}
                className="absolute inset-0 z-0"
              />
              {/* <div className="absolute inset-0 bg-black/60 z-10" /> */}
              <div className="relative z-20 text-center px-6">
                <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-snug mt-16">
                 Join Our <span className="text-yellow-400">Team</span> 
                </h1>
                {/* <p className="text-lg md:text-xl text-yellow-200">
                  AB Orlen Lietuva – Mažeikiai Refinery
                </p> */}
              </div>
            </section>
              <section className="container mx-auto py-16 px-6">
                    <header className="mb-12 text-center">
  <div className="relative inline-block text-center">
    <h2 className="text-3xl sm:text-5xl font-bold text-white pb-5">
Career <span className="text-yellow-400">Empowerment</span>  
    </h2>
    <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-32 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
  </div>
</header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
        
        {/* Top-left Image */}
        <div>
          <Image
            src="/images/team.jpg" // replace with your image
            alt="Build Career"
            width={600}
            height={400}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>

        {/* Top-right Text */}
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            🏗️ Build Your Career on Solid Ground
          </h2>
          <p className="text-white text-xl leading-relaxed text-justify">
            Join a team where your skills shape skylines, and your future is built with purpose.
            At Calm Stone, we don’t just construct edifices — we shape careers. Whether you're on-site,
            in the office, or leading a project, you’ll be part of a company that values hands-on
            experience, fresh ideas, and real dedication. We believe empowered people build stronger
            projects, which is why we invest in your growth from day one. With every structure we build,
            we also build trust, teamwork, and long-term success. If you're ready to take on challenges,
            lead with confidence, and grow in a company that sees your potential, Calm Stone is where you belong.
          </p>
        </div>

        {/* Bottom-left Text */}
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            🌟 Life at Calm Stone
          </h2>
          <p className="text-white text-xl leading-relaxed text-justify">
            Working at Calm Stone means joining a family that truly values safety, respect, and collaboration.
            Our team thrives in a supportive environment where fresh ideas are encouraged, achievements are celebrated,
            and challenges are tackled together. We foster a culture of continuous learning, empowering everyone to bring
            their best every day. Your growth is our priority — we invest in hands-on training, certification support,
            and clear career advancement pathways. At Calm Stone, promotions are earned through performance, passion,
            and potential. From day one, you’ll have a clear roadmap for success and a team that supports you at every step.
          </p>
        </div>

        {/* Bottom-right Image */}
        <div>
          <Image
            src="/team3.jpg" // replace with your image
            alt="Life at Calm Stone"
            width={600}
            height={400}
            className="w-full h-auto object-cover rounded-lg hidden sm:block"
          />
        </div>
      </div>

      {/* Extra Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        {/* Left Image */}
        <div>
          <Image
            src="/team2.jpg" // replace with your image
            alt="Why Join Calm Stone"
            width={600}
            height={400}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>

        {/* Right Text */}
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            🧱 Why Join Calm Stone?
          </h2>
          <p className="text-white text-xl leading-relaxed text-justify">
            At Calm Stone, we don’t just offer jobs — we build careers that grow with you. Whether you’re starting as a
            junior or stepping into leadership, you’ll join a team that values dedication, skill, and innovation.
            Our diverse and challenging projects reflect the passion and talent of the people behind them. We foster a
            culture of trust, teamwork, and accountability — empowering every team member on-site and off. Here, safety
            is paramount, efforts are recognized, and every voice matters. We don’t micromanage; we mentor.
            We don’t follow trends; we build them.
          </p>
        </div>
      </div>
    </section>
      
      <section id="positions" className="bg-black py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <header className="mb-12 text-center">
            <div className="relative inline-block text-center">
              <h2 className="text-3xl sm:text-5xl font-bold text-white pb-5 ">
                Current <span className="text-yellow-400">Openings</span>
              </h2>
              <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-32 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
            </div>{" "}
            <p className="text-lg text-white">
              Explore roles across our worldwide operations.
            </p>
          </header>

          <div className="mt-10">
            {dummyJobs.length ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {dummyJobs.map((job) => (
                  <JobCard key={job._id} job={job} />
                ))}
              </div>
            ) : (
              <div className="mx-auto max-w-md rounded-lg bg-gray-800 p-10 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-700 shadow-inner">
                  <svg
                    className="h-8 w-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold">
                  No roles available
                </h3>
                <p className="mb-6 text-gray-400">
                  We’re growing fast—check back soon or reach out!
                </p>
                <Link
                  href="#"
                  className="inline-block rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white hover:bg-blue-700 transition"
                >
                  Submit Résumé
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
  <Testimonials/>
    </main>
  );
}
