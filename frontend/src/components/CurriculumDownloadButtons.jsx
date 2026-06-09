import { useState } from 'react'
import { HiLightningBolt } from 'react-icons/hi'
import CurriculumDownloadModal from './CurriculumDownloadModal'

const curriculumButtons = [
  {
    id: 'data-science',
    label: 'Data Science',
    badge: 'Download Curriculum',
    theme: 'blue',
  },
  {
    id: 'devops',
    label: 'Cloud DevOps',
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
      className={`relative overflow-hidden w-full max-w-[220px] sm:w-[220px] rounded-xl border-2 py-9 sm:py-8 px-5 transition-colors duration-200 cursor-pointer ${theme.body}`}
    >
      <span
        className={`absolute top-0 right-0 inline-flex items-center gap-1 pl-3.5 pr-2.5 py-1.5 text-white text-[9px] sm:text-[10px] font-semibold whitespace-nowrap rounded-bl-[14px] ${theme.badge}`}
      >
        {button.showBolt && (
          <HiLightningBolt className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0 text-[#fdba74]" />
        )}
        {button.badge}
      </span>
      <span className="relative z-10 block text-white font-bold text-sm sm:text-[15px] text-center leading-tight">
        {button.label}
      </span>
    </button>
  )
}

export default function CurriculumDownloadButtons({ className = '' }) {
  const [activeCourse, setActiveCourse] = useState(null)

  const handleOpen = (courseKey) => {
    setActiveCourse(courseKey)
  }

  const handleClose = () => {
    setActiveCourse(null)
  }

  return (
    <>
      <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 ${className}`}>
        {curriculumButtons.map((button) => (
          <CurriculumButton key={button.id} button={button} onOpen={handleOpen} />
        ))}
      </div>

      {activeCourse && (
        <CurriculumDownloadModal courseKey={activeCourse} onClose={handleClose} />
      )}
    </>
  )
}
