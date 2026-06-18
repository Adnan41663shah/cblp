import { useCallback, useEffect, useState } from 'react'
import ModalPortal from './ModalPortal'
import { TbPlayerPlayFilled } from 'react-icons/tb'
import {
  getYoutubeEmbedUrl,
  getYoutubeThumbnail,
  testimonialsContent,
} from '../data/testimonials'

function WatchVideoBadge() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-black/45 backdrop-blur-sm px-2.5 py-1.5 border border-white/10">
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
        <TbPlayerPlayFilled className="h-3.5 w-3.5 text-white" aria-hidden="true" />
      </span>
      <span className="text-white text-xs sm:text-[13px] font-medium">Watch video</span>
    </div>
  )
}

function TestimonialCard({ testimonial, onPlay }) {
  const thumbnail = getYoutubeThumbnail(testimonial.videoId)

  return (
    <button
      type="button"
      onClick={() => onPlay(testimonial)}
      className="testimonial-card group relative w-full overflow-hidden rounded-[18px] sm:rounded-[20px] border border-white/[0.1] aspect-[6/5] sm:aspect-[5/4] lg:aspect-[3/4] xl:aspect-[9/14] min-h-[220px] sm:min-h-[260px] lg:min-h-0 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
    >
      <img
        src={thumbnail}
        alt={`${testimonial.name} testimonial video thumbnail`}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        loading="lazy"
      />

      <div className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/20" />

      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10">
        <WatchVideoBadge />
      </div>

      <div
        className="absolute inset-x-0 bottom-0 z-10 px-4 pb-4 pt-16 sm:px-5 sm:pb-5 sm:pt-20"
        style={{
          background:
            'linear-gradient(to top, rgba(0, 0, 0, 0.92) 0%, rgba(0, 0, 0, 0.55) 48%, transparent 100%)',
        }}
      >
        <p className="text-white font-bold text-base sm:text-lg lg:text-[17px] xl:text-xl leading-none">
          {testimonial.name}
        </p>
        <p className="mt-1.5 sm:mt-2 text-white/90 text-xs sm:text-sm lg:text-[13px] xl:text-[15px] font-medium">
          {testimonial.company}
        </p>
      </div>
    </button>
  )
}

function YouTubePlayerModal({ testimonial, onClose }) {
  const embedUrl = getYoutubeEmbedUrl(testimonial.videoId)

  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') handleClose()
    }

    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [handleClose])

  return (
    <ModalPortal>
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${testimonial.name} testimonial video`}
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/88 backdrop-blur-[2px] cursor-default"
        onClick={handleClose}
        aria-label="Close video player"
      />

      <div className="testimonial-player relative z-10 w-full max-w-[min(100%,420px)]">
        <div className="flex items-center justify-between gap-3 mb-3 sm:mb-4 px-1">
          <div>
            <p className="text-white font-semibold text-sm sm:text-base">{testimonial.name}</p>
            <p className="text-[#9ca3af] text-xs sm:text-[13px]">{testimonial.company} testimonial</p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer flex-shrink-0"
            aria-label="Close"
          >
            <span className="text-xl leading-none">&times;</span>
          </button>
        </div>

        <div className="overflow-hidden rounded-[16px] sm:rounded-[18px] border border-white/15 bg-black shadow-[0_24px_80px_rgba(0,0,0,0.65)]">
          <div className="relative w-full aspect-[9/16] max-h-[72vh] sm:max-h-[78vh] mx-auto">
            <iframe
              title={`${testimonial.name} YouTube testimonial`}
              src={embedUrl}
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>

        <a
          href={testimonial.videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 sm:mt-4 inline-flex text-[#9ca3af] hover:text-white text-xs sm:text-[13px] underline underline-offset-2 transition-colors"
        >
          Open on YouTube
        </a>
      </div>
    </div>
    </ModalPortal>
  )
}

export default function Testimonials() {
  const { items } = testimonialsContent
  const [activeTestimonial, setActiveTestimonial] = useState(null)

  return (
    <section id="testimonials" className="relative scroll-mt-[var(--nav-scroll-offset)] bg-black pt-10 pb-12 sm:pt-12 sm:pb-16 lg:pt-14 lg:pb-20">
      <h2 className="text-white font-semibold text-[20px] sm:text-[26px] lg:text-[28px] leading-[1.2] tracking-normal mb-6 sm:mb-8 lg:mb-10">
        Hear from our alumni
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {items.map((testimonial) => (
          <TestimonialCard
            key={testimonial.id}
            testimonial={testimonial}
            onPlay={setActiveTestimonial}
          />
        ))}
      </div>

      {activeTestimonial && (
        <YouTubePlayerModal
          testimonial={activeTestimonial}
          onClose={() => setActiveTestimonial(null)}
        />
      )}
    </section>
  )
}
