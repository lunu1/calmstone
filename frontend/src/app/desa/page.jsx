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
          src="/images/white.png" 
          alt="Lower Zakum LTDP Project"
          layout="fill"
          objectFit="cover"
          quality={90}
          className="absolute inset-0 z-0"
        />
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="relative z-20 text-center px-6">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-snug text-yellow-400">
           Desa Linated Water Impulsion System Bypass

          </h1>
          {/* <p className="text-lg md:text-xl text-yellow-200">
            Lower Zakum Field – ADNOC Offshore
          </p> */}
        </div>
      </section>

      {/* Project Overview */}
      <section className="bg-white text-gray-800 py-16 px-6 md:px-20">
        <div className="max-w-6xl mx-auto">
          {/* Project Info Block */}
          <div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
{/*        
            <div>
              <h3 className="text-sm text-gray-500 uppercase tracking-wide mb-1">Client</h3>
              <p className="text-xl font-semibold text-amber-600">ADNOC Offshore</p>
            </div> */}
          </div>

          {/* Project Description */}
          <div className="space-y-8 text-base md:text-lg leading-relaxed text-gray-700">
            <p>
The Desa Linated Water Impulsion System Bypass project, valued at USD 437,600.00, involved detailed internal pipe rehabilitation work. This included visual inspection and sandblasting of the welded joint areas, followed by application of liquid epoxy coating to the specified thickness. Final inspections were conducted to ensure coating quality. The team adhered to all contractor and client instructions, safety regulations, and Chilean standards throughout the execution, ensuring proper delivery, presentation, and compliance with all contractual obligations.            </p>
            {/* <p>
              The technical deliverables—including structural supports and instrumentation plans—served as critical
              documentation for procurement and commissioning by ADNOC Offshore.
            </p> */}
          </div>
        </div>
      </section>
    </>
  );
}
