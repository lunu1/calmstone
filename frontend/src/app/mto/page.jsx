import Head from 'next/head';
import Image from 'next/image';

export default function LZLTDPMTOBOQ() {
  return (
    <>
      <Head>
        <title>MTO & BOQ Documentation | LZ LTDP 1 – ADNOC Offshore</title>
        <meta
          name="description"
          content="Documents for MTO and BOQ for LZ LTDP 1 – Lower Zakum Field, Offshore UAE. Engineering support for procurement and commissioning."
        />
      </Head>

      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center bg-black text-white">
        <Image
          src="/images/testimonial4.jpeg" 
          alt="Lower Zakum LTDP Project"
          layout="fill"
          objectFit="cover"
          quality={90}
          className="absolute inset-0 z-0"
        />
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="relative z-20 text-center px-6">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-snug">
            MTO & BOQ Documentation for LZ LTDP 1
          </h1>
          <p className="text-lg md:text-xl text-yellow-200">
            Lower Zakum Field – ADNOC Offshore
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
              <p className="text-xl font-semibold text-amber-600">Lower Zakum Field, Offshore UAE</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500 uppercase tracking-wide mb-1">YEAR</h3>
              <p className="text-xl font-semibold text-amber-600">-</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500 uppercase tracking-wide mb-1">Client</h3>
              <p className="text-xl font-semibold text-amber-600">ADNOC Offshore</p>
            </div>
          </div>

          {/* Project Description */}
          <div className="space-y-8 text-base md:text-lg leading-relaxed text-gray-700">
            <p>
              As part of the Lower Zakum Long Term Development Plan, Calm Stone was involved in preparing MTO and BOQ
              documentation supported by detailed engineering isometrics, electrical layouts, and tie-in diagrams for new
              wellhead and flowline systems offshore.
            </p>
            <p>
              The technical deliverables including structural supports and instrumentation plans served as critical
              documentation for procurement and commissioning by ADNOC Offshore.
            </p>
          </div>
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
