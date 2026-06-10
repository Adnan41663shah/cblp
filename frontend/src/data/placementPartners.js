import devopsPlaceImage from '../assets/devops-place.webp'

const sharedContent = {
  heading: {
    line1: 'World class placement assistance',
    line2: 'that helped 30,000+ students',
  },
  features: [
    {
      title: 'Curated Job boards',
      description: '400+ live jobs & new jobs added everyday',
    },
    {
      title: 'Resume, LinkedIn and Github profile building',
      description: 'Get tailored feedback on improving all your profile',
    },
  ],
  ctaLabel: 'Book a free webinar',
}

export const placementPartnersContent = {
  'data-science': {
    ...sharedContent,
    previewImage: {
      src: devopsPlaceImage,
      alt: 'Placement assistance job board preview',
    },
  },
  devops: {
    ...sharedContent,
    previewImage: {
      src: devopsPlaceImage,
      alt: 'Placement assistance job board preview',
    },
  },
}
