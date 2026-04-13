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
       