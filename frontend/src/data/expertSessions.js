import abhinandanPrasad from '../assets/experts/abhinandan-prasad.webp'
import anirbanSen from '../assets/experts/anirban-sen.webp'
import anuragDangi from '../assets/experts/anurag-dangi.webp'
import rudraSharma from '../assets/experts/rudra-sharma.webp'
import vanshikaSingh from '../assets/experts/vanshika-singh.webp'
import bootcampImage from '../assets/bootcamp.webp'

export const EXPERT_SESSIONS = [
  {
    id: 'abhinandan-prasad',
    name: 'Dr. Abhinandan S. Prasad',
    expertise: 'Professor at IIT Palakkad | Ph.D | 9 years of experience',
    image: abhinandanPrasad,
  },
  {
    id: 'anirban-sen',
    name: 'Prof. Anirban Sengupta',
    expertise: 'Professor at IIT Indore | 15 years of experience',
    image: anirbanSen,
  },
  {
    id: 'anurag-dangi',
    name: 'Anurag Dangi',
    expertise: 'Senior DevOps Engineer | 5 years of experience  | IIT Patna',
    image: anuragDangi,
  },
  {
    id: 'rudra-sharma',
    name: 'Rudra Sharma',
    expertise: 'IIT Alumnus | Currently at Okta | Ex-JPMorgan | Amazon | 5 years of experience',
    image: rudraSharma,
  },
  {
    id: 'vanshika-singh',
    name: 'Ms. Vanshika Singh',
    expertise: 'Ex-Google | Currently at Microsoft | IIT (BHU) Alumnus | 7 years of experience',
    image: vanshikaSingh,
  },
]

export const bootcampExpertsContent = {
  title: 'A Bootcamp crafted with care, taught by experts',
  cardHeading: 'In house team of experts to guide you',
  image: bootcampImage,
  imageAlt: 'In-house expert team collaborating in office',
  highlights: [
    'One-on-one guidance to understand your story and prepare you to become industry ready.',
    'Free communication and soft-skills training to help you crack interviews with confidence.',
    "Wellness programs including yoga and meditation to promote mental balance and productivity.",
  ],
} 

export const expertSessionsContent = {
  eyebrow: 'COMMUNITY EXCLUSIVE',
  title: 'Weekly chats with top industry talent',
  experts: EXPERT_SESSIONS,
  bootcamp: bootcampExpertsContent,
}
