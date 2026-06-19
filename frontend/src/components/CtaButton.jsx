const variantClass = {
  primary: 'cta-primary',
  secondary: 'cta-secondary',
  whatsapp: 'cta-whatsapp',
}

const sizeClass = {
  sm: 'text-[13px] px-4 py-2',
  md: 'text-sm px-5 py-2.5',
  lg: 'text-sm sm:text-[15px] px-6 py-3 sm:py-3.5',
}

/**
 * Single source of truth for call-to-action buttons across the page.
 * Renders a <button> by default, or an <a> when `href` is provided.
 */
export default function CtaButton({
  variant = 'primary',
  size = 'md',
  href,
  className = '',
  children,
  ...props
}) {
  const classes = `cta-base ${variantClass[variant] ?? variantClass.primary} ${
    sizeClass[size] ?? sizeClass.md
  } ${className}`

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
