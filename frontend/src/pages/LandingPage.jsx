import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import CompanyValues from '../components/CompanyValues'
import ConsultationPopup from '../components/ConsultationPopup'
import Footer from '../components/footer'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import SectionsWrapper from '../components/SectionsWrapper'
import TrustStrip from '../components/TrustStrip'
import { courses } from '../data/courses'
import { useConsultationPopup } from '../hooks/useConsultationPopup'
import { useCourseDocument } from '../hooks/useCourseDocument'

function useScrollToHash() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) return undefined

    const id = hash.replace('#', '')
    const timer = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }, 150)

    return () => clearTimeout(timer)
  }, [pathname, hash])
}

export default function LandingPage({ courseKey }) {
  const course = courses[courseKey]
  useScrollToHash()
  useCourseDocument(courseKey)
  const consultPopup = useConsultationPopup()

  if (!course) return null

  return (
    <div className="min-h-screen">
      <Navbar courseKey={courseKey} />
      <HeroSection course={course} courseKey={courseKey} />
      <TrustStrip />
      <CompanyValues content={course.companyValues} />
      <SectionsWrapper courseKey={courseKey} />
      <Footer />

      {consultPopup.isOpen && (
        <ConsultationPopup
          courseKey={courseKey}
          source="consultation-popup"
          onClose={consultPopup.close}
          onConverted={consultPopup.markConverted}
        />
      )}
    </div>
  )
}
