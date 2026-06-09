import aniruddhaAvatar from '../assets/reviews/Aniruddha-Tiwari-GlobalLogic.webp'
import atharvaReviewAvatar from '../assets/reviews/Atharva-Keskar-Accenture.webp'
import ejazAvatar from '../assets/reviews/Ejaz-Sheikh-Capgemini.webp'
import kiranAvatar from '../assets/reviews/Kiran-Bhoyar-GlobalLogic.webp'
import monikaAvatar from '../assets/reviews/Monika Vyas-DevOps-Engineer-TCS.webp'
import mrunmayeeAvatar from '../assets/reviews/Mrunmayee-Gaikwad-TechM.webp'
import shivReviewAvatar from '../assets/reviews/Shiv -Verma-MNC.webp'
import tanishqReviewAvatar from '../assets/reviews/Tanishq-Vaishnav-Mindtree.webp'

export function getYoutubeVideoId(url) {
  const match = url.match(/(?:shorts\/|v=|youtu\.be\/)([A-Za-z0-9_-]{11})/)
  return match?.[1] ?? null
}

export function getYoutubeThumbnail(videoId) {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
}

export function getYoutubeEmbedUrl(videoId) {
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`
}

export const testimonialsContent = {
  items: [
    {
      id: 'testimonial-1',
      name: 'Aditya kadu',
      company: 'Associate Product Engineer',
      videoUrl: 'https://youtube.com/shorts/Aa69-dE9Qz4?feature=share',
      videoId: 'Aa69-dE9Qz4',
    },
    {
      id: 'testimonial-2',
      name: 'Samiksha Meshram',
      company: 'SRE Engineer',
      videoUrl: 'https://youtube.com/shorts/on4_Rp3KJ_g?feature=share',
      videoId: 'on4_Rp3KJ_g',
    },
    {
      id: 'testimonial-3',
      name: 'Tanishq vaishnav',
      company: 'Software Engineer',
      videoUrl: 'https://youtube.com/shorts/N0ig6w-QG_k?feature=share',
      videoId: 'N0ig6w-QG_k',
    },
  ],
}

export const REVIEWS = [
  {
    id: 'aniruddha-tiwari',
    name: 'Aniruddha Tiwari',
    role: 'Software Engineer at GlobalLogic',
    package: '₹25L',
    batch: '2023 Batch',
    text: 'CloudBlitz helped me transition from a traditional IT role to a cloud specialist. The live labs and mentorship made the difference.',
    image: aniruddhaAvatar,
    glowColor: 'coral',
  },
  {
    id: 'atharva-keskar-review',
    name: 'Atharva Keskar',
    role: 'Software Engineer at Accenture',
    package: '₹7.8L',
    batch: '2023 Batch',
    text: 'The AWS Solutions Architect course was comprehensive and practical. I got my certification within 3 months!',
    image: atharvaReviewAvatar,
    glowColor: 'purple',
  },
  {
    id: 'ejaz-sheikh',
    name: 'Ejaz Sheikh',
    role: 'Software Engineer at Capgemini',
    package: '₹22L',
    batch: '2023 Batch',
    text: 'Excellent training methodology and support. The instructors are industry experts who know their stuff.',
    image: ejazAvatar,
    glowColor: 'emerald',
  },
  {
    id: 'kiran-bhoyar',
    name: 'Kiran Bhoyar',
    role: 'Software Engineer at GlobalLogic',
    package: '₹9.1L',
    batch: '2023 Batch',
    text: "The AI integration in cloud computing opened new opportunities. I'm now leading SRE initiatives.",
    image: kiranAvatar,
    glowColor: 'coral',
  },
  {
    id: 'monika-vyas',
    name: 'Monika Vyas',
    role: 'DevOps Engineer at TCS',
    package: '₹8.8L',
    batch: '2023 Batch',
    text: "CloudBlitz's practical approach helped me understand real-world scenarios and land a strong DevOps role.",
    image: monikaAvatar,
    glowColor: 'purple',
  },
  {
    id: 'mrunmayee-gaikwad',
    name: 'Mrunmayee Gaikwad',
    role: 'Software Engineer at Tech Mahindra',
    package: '₹10.2L',
    batch: '2023 Batch',
    text: 'The multi-cloud approach and AI integration gave me a competitive edge in the market.',
    image: mrunmayeeAvatar,
    glowColor: 'emerald',
  },
  {
    id: 'shiv-verma-review',
    name: 'Shiv Verma',
    role: 'Software Engineer at MNC',
    package: '₹9.5L',
    batch: '2023 Batch',
    text: 'From zero knowledge to leading DevOps teams. CloudBlitz made it possible with hands-on projects and mocks.',
    image: shivReviewAvatar,
    glowColor: 'coral',
  },
  {
    id: 'tanishq-vaishnav-review',
    name: 'Tanishq Vaishnav',
    role: 'Software Engineer at Mindtree',
    package: '₹18L',
    batch: '2023 Batch',
    text: "The security focus in cloud computing was excellent. I'm now specializing in cloud security.",
    image: tanishqReviewAvatar,
    glowColor: 'purple',
  },
]
