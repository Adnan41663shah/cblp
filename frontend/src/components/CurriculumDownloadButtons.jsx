import { useState } from 'react'
import { HiLightningBolt } from 'react-icons/hi'
import CurriculumDownloadModal from './CurriculumDownloadModal'

const curriculumButtons = [
  {
    id: 'data-science',
    label: 'Expert in Data Science and Analytics with Al ',
    badge: 'Download Curriculum',
    theme: 'blue',
  },
  {
    id: 'devops',
    label: 'Cloud DevOps Engineering Course With AI',
    badge: 'Download Curriculum',
    showBolt: true,
    theme: 'orange',
  },
]

const buttonThemes = {
  blue: {
    body: 'bg-[#141c2b] border-[#22d3ee] hover:bg-[#1a2438]',
    badge: 'bg-[#2563eb]',
  },
  orange: {
    body: 'bg-[#2e1a14] border-[#fb923c] hover:bg-[#3a2218]',
    badge: 'bg-[#ea580c]',
  },
}

function CurriculumButton({ button, onOpen }) {
  const theme = buttonThemes[button.theme]

  return (
    <button
      type="button"
      onClick={() => onOpen(button.id)}
      className={`relative overflow-hidden flex-1 w-full sm:w-auto sm:flex-none rounded-xl border-2 py-6 px-5 sm:py-7 sm:px-10 transition-colors duration-200 cursor-pointer ${theme.body}`}
    >
      <span
        className={`absolute top-0 right-0 inline-flex items-center gap-0.5 sm:gap-1 pl-2.5 pr-2 py-1 text-white text-[8px] sm:text-[10px] font-semibold whitespace-nowrap rounded-bl-[10px] sm:pl-3.5 sm:pr-2.5 sm:py-1.5 sm:rounded-bl-[14px] ${theme.badge}`}
      >
        {button.showBolt && (
          <HiLightningBolt className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0 text-[#fdba74]" />
        )}
        {button.badge}
      </span>
      <span className="relative z-10 block text-white font-semibold text-[11px] sm:text-[13px] md:text-[14px] text-center whitespace-normal sm:whitespace-nowrap leading-snug sm:leading-loose mt-1.5 sm:mt-2">
        {button.label}
      </span>
    </button>
  )
}

export default function CurriculumDownloadButtons({ className = '', courseKey = 'data-science' }) {
  const [activeCourse, setActiveCourse] = useState(null)

  const handleOpen = (courseId) => {
    setActiveCourse(courseId)
  }

  const handleClose = () => {
    setActiveCourse(null)
  }

  return (
    <>
      <div className={`flex flex-row items-stretch justify-center gap-3 sm:gap-5 ${className}`}>
        {curriculumButtons.filter(button => button.id === courseKey).map((button) => (
          <CurriculumButton key={button.id} button={button} onOpen={handleOpen} />
        ))}
      </div>

      {activeCourse && (
        <CurriculumDownloadModal courseKey={activeCourse} onClose={handleClose} />
      )}
    </>
  )
}
