// ─────────────────────────────────────────────────────────────────────────────
// PLACEMENT PARTNERS
// To adjust a logo's size, change its `logoScale` value:
//   1.0  → normal (100%)
//   1.5  → 50% larger
//   2.0  → double size
//   0.8  → 20% smaller
// ─────────────────────────────────────────────────────────────────────────────
export const PLACEMENT_PARTNERS = [
  {
    id: 'tcs',
    displayName: 'TCS',
    logoAlt: 'TCS Logo',
    icon: 'SiTcs',
    color: '#E31837',
    domain: 'tcs.com',
    logoScale: 1.8,
  },
  {
    id: 'infosys',
    displayName: 'Infosys',
    logoAlt: 'Infosys Logo',
    icon: 'SiInfosys',
    color: '#007CC3',
    domain: 'infosys.com',
    logoScale: 2.4,
    marginLeft: '1.25rem',
  },
  {
    id: 'wipro',
    displayName: 'Wipro',
    logoAlt: 'Wipro Logo',
    icon: 'SiWipro',
    color: '#341C53',
    domain: 'wipro.com',
    logoScale: 1.8,
  },
  {
    id: 'hcl',
    displayName: 'HCLTech',
    logoAlt: 'HCL Technologies Logo',
    icon: 'SiHcl',
    color: '#0B5FFF',
    domain: 'hcltech.com',
    logoScale: 2.5,
  },
  {
    id: 'tech-mahindra',
    displayName: 'Tech Mahindra',
    logoAlt: 'Tech Mahindra Logo',
    domain: 'techmahindra.com',
    logoScale: 1.8,
  },
  {
    id: 'cognizant',
    displayName: 'Cognizant',
    logoAlt: 'Cognizant Logo',
    icon: 'SiCognizant',
    color: '#1A4CA1',
    domain: 'cognizant.com',
    logoScale: 2.5,
  },
  {
    id: 'accenture',
    displayName: 'Accenture',
    logoAlt: 'Accenture Logo',
    icon: 'SiAccenture',
    color: '#A100FF',
    domain: 'accenture.com',
    logoScale: 1.0,
  },
  {
    id: 'capgemini',
    displayName: 'Capgemini',
    logoAlt: 'Capgemini Logo',
    domain: 'capgemini.com',
    logoScale: 1.8,
  },
  {
    id: 'mindtree',
    displayName: 'Mindtree',
    logoAlt: 'Mindtree Logo',
    logoSrc: '/partners/mindtree.webp',
    domain: 'mindtree.com',
    logoScale: 1.8,
  },
  {
    id: 'larsen-toubro',
    displayName: 'L&T',
    logoAlt: 'L&T Logo',
    logoSrc: '/partners/LarsenToubro-removebg-preview.png',
    logoScale: 2,
  },
  {
    id: 'amazon',
    displayName: 'Amazon',
    logoAlt: 'Amazon Logo',
    icon: 'FaAmazon',
    color: '#FF9900',
    domain: 'amazon.com',
    logoScale: 1.5,
  },
  {
    id: 'microsoft',
    displayName: 'Microsoft',
    logoAlt: 'Microsoft Logo',
    icon: 'FaMicrosoft',
    color: '#00A4EF',
    domain: 'microsoft.com',
    logoScale: 1.3,
  },
  {
    id: 'google',
    displayName: 'Google',
    logoAlt: 'Google Logo',
    logoSrc: '/partners/google.webp',
    domain: 'google.com',
    logoScale: 1.5,
  },
  {
    id: 'ibm',
    displayName: 'IBM',
    logoAlt: 'IBM Logo',
    logoSrc: '/partners/ibm.svg',
    domain: 'ibm.com',
    logoScale: 1.4,
  },
  {
    id: 'oracle',
    displayName: 'Oracle',
    logoAlt: 'Oracle Logo',
    logoSrc: '/partners/oracle.svg',
    domain: 'oracle.com',
    logoScale: 1.0,
  },
  {
    id: 'kpit',
    displayName: 'KPIT',
    logoAlt: 'KPIT Logo',
    logoSrc: '/partners/kpit.webp',
    domain: 'kpit.com',
    logoScale: 1.0,
  },
  {
    id: 'fis',
    displayName: 'FIS',
    logoAlt: 'FIS Logo',
    logoSrc: '/partners/fis.svg',
    domain: 'fisglobal.com',
    logoScale: 1.2,
  },
  {
    id: 'cybage',
    displayName: 'Cybage',
    logoAlt: 'Cybage Logo',
    logoSrc: '/partners/Cybage.webp',
    domain: 'cybage.com',
    logoScale: 1.8,
  },
]

const midpoint = Math.ceil(PLACEMENT_PARTNERS.length / 2)

export const PLACEMENT_PARTNER_ROW_ONE = PLACEMENT_PARTNERS.slice(0, midpoint)
export const PLACEMENT_PARTNER_ROW_TWO = PLACEMENT_PARTNERS.slice(midpoint)

