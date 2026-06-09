import abhinandanPrasad from '../assets/experts/abhinandan-prasad.png'
import anirbanSen from '../assets/experts/anirban-sen.png'
import anuragDangi from '../assets/experts/anurag-dangi.png'
import rudraSharma from '../assets/experts/rudra-sharma.png'
import vanshikaSingh from '../assets/experts/vanshika-singh.png'

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
  image:
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=960&h=720&q=80',
  imageAlt: 'In-house expert team collaborating in office',
  highlights: [
    'Get a personal relationship manager',
    'Connect 1:1 with FAANG mentors',
    "Over 1000+ TA's to clear your doubts & more",
  ],
}

export const expertSessionsContent = {
  eyebrow: 'COMMUNITY EXCLUSIVE',
  title: 'Weekly chats with top industry talent',
  experts: EXPERT_SESSIONS,
  bootcamp: bootcampExpertsContent,
}
