import Head from 'next/head';
import Image from 'next/image';

export default function EngineeringService() {
  return (
    <>
      <Head>
        <title>Engineering Services for RHCU EPC & FEED | ORLEN Lietuva 2022</title>
        <meta
          name="description"
          content="Engineering Services for Balance Piping Works for RHCU EPC ISBL & FEED OSBL at Orlen Lietuva’s Mažeikiai refinery, Lithuania (2022)."
        />
      </Head>

      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center bg-black text-white">
        <Image
          src="/images/testimonial2.jpg" // ← Update with your actual image
          alt="Orlen Lietuva RHCU EPC"
          layout="fill"
          objectFit="cover"
          quality={90}
          className="absolute inset-0 z-0"
        />
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="relative z-20 text-center px-6">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-snug">
            Engineering Services for Balance Piping Works <br /> RHCU EPC ISBL & FEED OSBL
          </h1>
          <p className="text-lg md:text-xl text-yellow-200">
            AB Orlen Lietuva – Mažeikiai Refinery
          </p>
        </div>
      </section>

      {/* Project Overview */}
      <section className="bg-white text-gray-800 py-16 px-6 md:px-20">
        <div className="max-w-6xl mx-auto">
          {/* Project Info Block */}
          <div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div>
              <h3 className="text-sm text-gray-500 uppercase tracking-wide mb-1">Location</h3>
              <p className="text-xl font-semibold text-amber-600">Mažeikiai, Lithuania</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500 uppercase tracking-wide mb-1">Year</h3>
              <p className="text-xl font-semibold text-amber-600">2022</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500 uppercase tracking-wide mb-1">Client</h3>
              <p className="text-xl font-semibold text-amber-600">AB Orlen Lietuva</p>
            </div>
          </div>

          {/* Project Description */}
          <div className="space-y-8 text-base md:text-lg leading-relaxed text-gray-700">
            <p>
              For Orlen Lietuva’s Mažeikiai refinery, Calm Stone executed balance piping design across ISBL and OSBL
              areas producing routing drawings, P&IDs, instrumentation diagrams, structural support details, technical
              datasheets, and full MTO/BOQ sets.
            </p>
            <p>
              This ensured procurement readiness and compliance with EU and refinery engineering standards, culminating
              in a robust documentation package to guide execution and tie-in verifications.
            </p>
          </div>

          {/* Additional Image with auto height */}
          <div className="relative w-full mt-12 mb-8">
            <Image
              src="/images/project3.jpg" // ← Add your additional image path here
              alt="Engineering Service"
              layout="intrinsic" // Automatically adjusts the height based on width
              width={1200} // Set the width (example)
              height={800} // Set the height to maintain aspect ratio
              quality={90}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>
    </>
  );
}
