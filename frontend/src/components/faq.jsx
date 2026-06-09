import { useState } from 'react'
import { FAQ_ITEMS } from '../data/faq'

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div className="border-b border-white/20">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-4 sm:gap-6 py-5 sm:py-6 text-left cursor-pointer group"
        aria-expanded={isOpen}
      >
        <span className="text-white font-medium text-sm sm:text-[15px] lg:text-base leading-snug pr-2">
          {item.question}
        </span>
        <span
          className="flex h-6 w-6 flex-shrink-0 items-center justify-center text-white text-xl sm:text-2xl leading-none mt-0.5"
          aria-hidden="true"
        >
          {isOpen ? '×' : '+'}
        </span>
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <p className="pb-5 sm:pb-6 text-white/90 text-[13px] sm:text-sm lg:text-[15px] leading-relaxed max-w-4xl">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function Faq() {
  const [openId, setOpenId] = useState(null)

  const handleToggle = (id) => {
    setOpenId((current) => (current === id ? null : id))
  }

  return (
    <section id="faqs" className="relative scroll-mt-[var(--nav-scroll-offset)] bg-black pt-10 pb-12 sm:pt-12 sm:pb-16 lg:pt-14 lg:pb-20">
      <h2 className="text-white font-semibold text-[20px] sm:text-[24px] leading-[1.2] tracking-normal mb-10  ">
        Frequently Asked Questions
      </h2>

      <div>
        {FAQ_ITEMS.map((item) => (
          <FaqItem
            key={item.id}
            item={item}
            isOpen={openId === item.id}
            onToggle={() => handleToggle(item.id)}
          />
        ))}
      </div>
    </section>
  )
}
