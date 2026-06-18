import { Fragment, useEffect, useState } from 'react'
import { FaAws } from 'react-icons/fa'
import { SiDocker, SiGithubactions, SiKubernetes, SiPython, SiTerraform } from 'react-icons/si'
import {
  TbActivityHeartbeat,
  TbArrowRight,
  TbBrain,
  TbChartBar,
  TbChartDots,
  TbChevronRight,
  TbSalad,
  TbUsers,
} from 'react-icons/tb'
import { projectStudioContent } from '../data/projectStudio'
import { prefersReducedMotion, useInView } from '../hooks/useInView'
import BookConsultationCta from './BookConsultationCta'

const ICONS = {
  'health-care-analytics': TbActivityHeartbeat,
  'python-sheets': SiPython,
  'meal-plan-ml': TbSalad,
  'fraud-detection': TbChartDots,
  'churn-prediction': TbUsers,
  'genai-workflows': TbBrain,
  'cicd-pipeline': SiGithubactions,
  'kubernetes-orchestration': SiKubernetes,
  'terraform-iac': SiTerraform,
  'docker-containers': SiDocker,
  'aws-cloud': FaAws,
  'monitoring-sre': TbChartBar,
}

const INTERVAL_MS = 4500

function ProjectDetail({ project }) {
  const Icon = ICONS[project.id] ?? TbBrain

  return (
    <div key={project.id} className="project-detail flex h-full flex-col">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full border border-white/12 bg-white/[0.04] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#aab4c2]">
              {project.tag}
            </span>
            {project.badge && (
              <span className="inline-flex items-center rounded-full border border-[#ff6b35]/30 bg-[#ff6b35]/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#ff8a5c]">
                {project.badge}
              </span>
            )}
          </div>
          <h3 className="mt-3 text-2xl font-bold leading-tight tracking-tight text-white sm:text-[28px]">
            {project.title}
          </h3>
          <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-[#aab4c2] sm:text-[15px]">
            {project.summary}
          </p>
        </div>
        <span className="hidden h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white/90 sm:inline-flex">
          <Icon className="h-7 w-7" aria-hidden="true" />
        </span>
      </div>

      {/* Pipeline story */}
      <ol className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-1.5">
        {project.steps.map((step, idx) => (
          <Fragment key={step.label}>
            <li
              className="project-step flex-1 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4"
              style={{ animationDelay: `${idx * 90}ms` }}
            >
              <div className="flex items-center gap-2.5">
                <span className="project-step__node">{idx + 1}</span>
                <span className="text-[12px] font-semibold uppercase tracking-wider text-[#ff8a5c]">
                  {step.label}
                </span>
              </div>
              <p className="mt-2.5 text-[13px] leading-relaxed text-[#cbd5e1]">{step.detail}</p>
            </li>
            {idx < project.steps.length - 1 && (
              <TbChevronRight
                className="hidden h-5 w-5 flex-shrink-0 self-center text-white/20 sm:block"
                aria-hidden="true"
              />
            )}
          </Fragment>
        ))}
      </ol>

      {/* Careers unlocked */}
      <div className="mt-auto pt-7">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8b95a5]">
          Careers this project unlocks
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {project.roles.map((role) => (
            <span
              key={role}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-gradient-to-r from-white/[0.06] to-transparent px-3 py-1.5 text-[13px] font-medium text-white"
            >
              <TbArrowRight className="h-3.5 w-3.5 text-[#ff8a5c]" aria-hidden="true" />
              {role}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ProjectStudio({ courseKey = 'data-science' }) {
  const content = projectStudioContent[courseKey] ?? projectStudioContent['data-science']
  const projects = content.projects

  const [ref, inView] = useInView({ threshold: 0.25 })
  const [active, setActive] = useState(0)
  const [autoplay, setAutoplay] = useState(() => !prefersReducedMotion())

  useEffect(() => {
    if (!autoplay || !inView || prefersReducedMotion()) return undefined

    const timer = setInterval(() => {
      setActive((current) => (current + 1) % projects.length)
    }, INTERVAL_MS)

    return () => clearInterval(timer)
  }, [autoplay, inView, projects.length])

  const handleSelect = (index) => {
    setActive(index)
    setAutoplay(false)
  }

  return (
    <section
      id="curriculum"
      className="relative scroll-mt-[var(--nav-scroll-offset)] bg-black pt-12 pb-12 sm:pt-16 sm:pb-16 lg:pt-20 lg:pb-20"
    >
      <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8b95a5] sm:mb-4 sm:text-[14px]">
        {content.eyebrow}
      </p>
      <h2 className="mb-2 max-w-2xl text-[22px] font-semibold leading-[1.2] tracking-tight text-white sm:text-[28px] lg:text-[32px]">
        {content.heading}
      </h2>
      <p className="mb-8 max-w-2xl text-[13px] leading-relaxed text-[#8b95a5] sm:mb-10 sm:text-[15px]">
        {content.subhead}
      </p>

      <div ref={ref} className="project-studio grid grid-cols-1 lg:grid-cols-[340px_1fr]">
        {/* Mobile selector / desktop list */}
        <div className="flex gap-2 overflow-x-auto scrollbar-none border-b border-white/[0.06] p-3 lg:flex-col lg:gap-1.5 lg:overflow-visible lg:border-b-0 lg:border-r lg:p-4">
          {projects.map((project, index) => {
            const Icon = ICONS[project.id] ?? TbBrain
            const isActive = active === index

            return (
              <button
                key={project.id}
                type="button"
                onClick={() => handleSelect(index)}
                aria-pressed={isActive}
                className={`project-item ${isActive ? 'project-item--active' : ''} flex flex-shrink-0 items-center gap-3 overflow-hidden p-3 lg:flex-shrink lg:p-3.5`}
              >
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/85">
                  <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                </span>
                <span className="flex min-w-0 flex-col">
                  <span className="flex items-center gap-2">
                    <span className="text-[10px] font-bold tabular-nums text-[#6b7280]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className={`truncate text-[13px] font-semibold leading-tight ${isActive ? 'text-white' : 'text-white/75'}`}>
                      {project.title}
                    </span>
                  </span>
                  <span className="hidden truncate text-[11px] text-[#8b95a5] lg:block">{project.tag}</span>
                </span>
                {isActive && (
                  <TbArrowRight className="ml-auto hidden h-4 w-4 flex-shrink-0 text-[#ff8a5c] lg:block" aria-hidden="true" />
                )}
                {isActive && autoplay && (
                  <span
                    className="project-item__progress"
                    style={{ '--project-progress-duration': `${INTERVAL_MS}ms` }}
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* Detail */}
        <div className="p-5 sm:p-7 lg:p-9">
          <ProjectDetail project={projects[active]} />
        </div>
      </div>

      <div className="mt-10 flex justify-center sm:mt-12">
        <BookConsultationCta
          courseKey={courseKey}
          source="curriculum-consultation"
          label="Build these with us"
        />
      </div>
    </section>
  )
}
