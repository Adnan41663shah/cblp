import { useState } from 'react'
import { FaAmazon, FaMicrosoft } from 'react-icons/fa'
import {
  SiAccenture,
  SiCognizant,
  SiGoogle,
  SiHcl,
  SiInfosys,
  SiTcs,
  SiWipro,
} from 'react-icons/si'

const ICON_MAP = {
  SiTcs,
  SiInfosys,
  SiWipro,
  SiHcl,
  SiCognizant,
  SiAccenture,
  SiGoogle,
  FaAmazon,
  FaMicrosoft,
}

const LOGO_CLASS =
  'h-9 sm:h-10 lg:h-11 w-auto max-w-[110px] sm:max-w-[130px] lg:max-w-[150px] object-contain object-center select-none'

function domainLogoSources(domain) {
  const siteUrl = `https://${domain}`

  return [
    `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${encodeURIComponent(siteUrl)}&size=128`,
    `https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
  ]
}

function DomainLogo({ partner }) {
  const sources = domainLogoSources(partner.domain)
  const [sourceIndex, setSourceIndex] = useState(0)
  const [failed, setFailed] = useState(false)

  if (failed || sourceIndex >= sources.length) {
    return (
      <span
        className="text-white/90 font-semibold text-sm sm:text-base tracking-tight whitespace-nowrap"
        title={partner.displayName}
      >
        {partner.displayName}
      </span>
    )
  }

  return (
    <img
      src={sources[sourceIndex]}
      alt={partner.logoAlt}
      title={partner.displayName}
      loading="lazy"
      decoding="async"
      className={LOGO_CLASS}
      draggable="false"
      onError={() => {
        if (sourceIndex < sources.length - 1) {
          setSourceIndex((current) => current + 1)
        } else {
          setFailed(true)
        }
      }}
    />
  )
}

function LocalLogoFallback({ partner }) {
  return (
    <span
      className="text-white/90 font-semibold text-sm sm:text-base tracking-tight whitespace-nowrap"
      title={partner.displayName}
    >
      {partner.displayName}
    </span>
  )
}

function LocalLogo({ partner }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return <LocalLogoFallback partner={partner} />
  }

  return (
    <img
      src={partner.logoSrc}
      alt={partner.logoAlt}
      title={partner.displayName}
      loading="lazy"
      decoding="async"
      className={LOGO_CLASS}
      draggable="false"
      onError={() => setFailed(true)}
    />
  )
}

export default function PartnerLogo({ partner }) {
  const Icon = partner.icon ? ICON_MAP[partner.icon] : null

  if (Icon) {
    return (
      <Icon
        className={`${LOGO_CLASS} flex-shrink-0`}
        style={{ color: partner.color ?? '#ffffff' }}
        aria-label={partner.logoAlt}
        title={partner.displayName}
      />
    )
  }

  if (partner.logoSrc) {
    return <LocalLogo partner={partner} />
  }

  if (partner.domain) {
    return <DomainLogo partner={partner} />
  }

  return (
    <span className="text-white/90 font-semibold text-sm sm:text-base tracking-tight whitespace-nowrap">
      {partner.displayName}
    </span>
  )
}
