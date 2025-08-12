import HeroScrollSlider from '../../components/animation'
import CertificationsSection from '../../components/CertificationsSection'
import HeroSection from '../../components/HeroSection'
import LogoMarque from '../../components/LogoMarque'
import Navbar from '../../components/navbar'
import ScrollRevealText from '../../components/ScrollRevealText '
import SectorsSection from '../../components/SectorSection'
import TestimonialSlider from '../../components/TestimonialSlider'

import Animation from '../../components/animation'
import SmallFooter from '../../components/Footer'
import NewsCardSection from '../../components/NewsCardSection'
import Overview from '../../components/overview'
import HeroSlider from '../../components/HeroSlider'


export default function Home() {
  return (
    <>
      {/* <HeroSection /> */}
      <HeroSlider/>
 {/* <ScrollRevealText
  heading="Company Overview"
  text="Calm Stone General Contracting delivers innovative engineering, procurement, and construction (EPC) services built on speed, precision, and trust. We bring a modern, agile approach to the oil and gas sector, combining deep industry expertise with a dynamic team of seasoned professionals. Our comprehensive EPC capabilities span earthworks, civil construction, mechanical and piping installation, as well as electrical and instrumentation works. With a strong commitment to innovation, quality, and safety, Calm Stone is dedicated to transforming the energy landscape through smart, reliable, and efficient project delivery."
  mission="To redefine excellence in EPC by delivering smart, agile, and trusted solutions that drive progress in the evolving energy sector."
  vision="To emerge as a new-generation EPC leader, building sustainable energy infrastructure that drives progress and inspires confidence worldwide."
/> */}
<Overview/>


            <SectorsSection />
      {/* <HeroScrollSlider/> */}
      <LogoMarque color="#bfa046" />
      {/* <TestimonialSlider /> */}
      
      <CertificationsSection/>
      <NewsCardSection/>
      {/* <SmallFooter/> */}

        
    
    </>
  )
}
       