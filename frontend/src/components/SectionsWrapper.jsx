import CareerOutcomes from './CareerOutcomes'
import CurriculumSection from './CurriculumSection'
import ProjectStudio from './ProjectStudio'
import IitAdvantages from './IitAdvantages'
import ExpertSessions from './expertsessions'
import PlacementPartners from './PlacementPartners'
import SectionSubNav from './SectionSubNav'
import Cta from './cta'
import Faq from './faq'
import Testimonials from './Testimonials'

export default function SectionsWrapper({ courseKey = 'data-science' }) {
  return (
    <section className="relative w-full bg-black">
      <SectionSubNav />

      <div className="relative mx-auto max-w-6xl overflow-x-hidden px-4 sm:px-6">
        <ProjectStudio key={courseKey} courseKey={courseKey} />
        <CurriculumSection courseKey={courseKey} />
        <IitAdvantages courseKey={courseKey} />
        <PlacementPartners courseKey={courseKey} />
        <CareerOutcomes courseKey={courseKey} />
        <ExpertSessions />
        <Testimonials />
        <Cta courseKey={courseKey} />
        <Faq courseKey={courseKey} />
      </div>
    </section>
  )
}
