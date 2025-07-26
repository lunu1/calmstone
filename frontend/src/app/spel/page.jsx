import Head from 'next/head';
import Image from 'next/image';

export default function OTTCOSPELJob() {
  return (
    <>
      <Head>
        <title>Services for SPEL Job | OTTCO Oman 2023</title>
        <meta
          name="description"
          content="Services for SPEL Job – Oman Tank Terminal Company (OTTCO), Ras Markaz, Oman (2023). Complete engineering documentation for terminal upgrade."
        />
      </Head>

      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center bg-black text-white">
        <Image
          src="/images/testimonial3.jpg" 
          alt="OTTCO SPEL Project"
          layout="fill"
          objectFit="cover"
          quality={90}
          className="absolute inset-0 z-0"
        />
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="relative z-20 text-center px-6">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-snug">
            Services for SPEL Job – OTTCO, Oman
          </h1>
          <p className="text-lg md:text-xl text-yellow-200">
            Oman Tank Terminal Company – Terminal Upgrade Project
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
              <p className="text-xl font-semibold text-amber-600">Ras Markaz, Oman</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500 uppercase tracking-wide mb-1">Year</h3>
              <p className="text-xl font-semibold text-amber-600">2023</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500 uppercase tracking-wide mb-1">Client</h3>
              <p className="text-xl font-semibold text-amber-600">OTTCO</p>
            </div>
          </div>

          {/* Project Description */}
          <div className="space-y-8 text-base md:text-lg leading-relaxed text-gray-700">
            <p>
              In the SPEL terminal upgrade for Oman Tank Terminal Company (OTTCO), Calm Stone generated process and
              piping layouts, control room schematics, electrical hookup drawings, instrumentation packages, and full
              MTO/BOQ documents.
            </p>
            <p>
              Tasked with drawing revision management, Calm Stone ensured alignment with OTTCO’s safety and technical
              regulations, delivering a comprehensive documentation suite for procurement, construction, and
              commissioning readiness.
            </p>
          </div>
              <div className="relative w-full mt-12 mb-8">
                      <Image
                        src="/images/project2.jpg" // ← Add your additional image path here
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
