import Head from 'next/head';
import Image from 'next/image';

export default function QusahwiraUpgrade() {
  return (
    <>
      <Head>
        <title>P5 Qusahwira Production Facilities Upgrade | ADNOC 2025</title>
        <meta
          name="description"
          content="P5 Qusahwira Production Facilities Upgrade (On Plot), part of ADNOC Onshore’s South East AiP5 development project in Abu Dhabi (2025)."
        />
      </Head>

      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center bg-black text-white">
        <Image
          src="/images/testimonial1.jpg" 
          alt="Qusahwira Project"
          layout="fill"
          objectFit="cover"
          quality={90}
          className="absolute inset-0 z-0"
        />
        <div className="absolute inset-0 bg-black/60  z-10" />
        <div className="relative z-20 text-center px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            P5 Qusahwira Production Facilities Upgrade
          </h1>
          <p className="text-lg md:text-xl text-yellow-200">
            ADNOC Onshore – South East AiP5 Development
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
              <p className="text-xl font-semibold text-amber-600">Abu Dhabi</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500 uppercase tracking-wide mb-1">Year</h3>
              <p className="text-xl font-semibold text-amber-600">2025</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500 uppercase tracking-wide mb-1">Client</h3>
              <p className="text-xl font-semibold text-amber-600">ADNOC Onshore</p>
            </div>
          </div>

          {/* Project Description */}
          <div className="space-y-8 text-base md:text-lg leading-relaxed text-gray-700">
            <p>
              As part of ADNOC Onshore’s South East AiP5 development, the SE AiP5 (On-Plot) – Qusahwira Project
              aims to expand the surface facilities at Qusahwira Central Degassing Station (CDS) by 2027 to handle
              increased crude output from the Qusahwira and Mender fields.
            </p>
            <p>
              The expansion will boost Qusahwira CDS capacity to
              <span className="font-semibold text-gray-900"> 103 MBOPD (sustainable)</span> and
              <span className="font-semibold text-gray-900"> 113 MBOPD (technical)</span>, supporting ADNOC’s
              broader production goals in the South East region.
            </p>
            <p>
              Our scope includes conducting excavation and underground detection surveys in the designated project
              area using appropriate, efficient, and cost-effective survey methods to meet the technical and
              operational requirements of the project.
            </p>
          </div>
              <div className="relative w-full mt-12 mb-8">
                      <Image
                        src="/images/project1.jpg" // ← Add your additional image path here
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
