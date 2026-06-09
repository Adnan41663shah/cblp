import { FaAws } from 'react-icons/fa'
import { PiMicrosoftExcelLogo } from 'react-icons/pi'
import {
  SiDocker,
  SiGithubactions,
  SiGooglecolab,
  SiJenkins,
  SiJupyter,
  SiKubernetes,
  SiLinux,
  SiPandas,
  SiPython,
  SiPytorch,
  SiScikitlearn,
  SiTerraform,
} from 'react-icons/si'
import { TbChartBar, TbDatabase } from 'react-icons/tb'

export const toolIconClass = 'w-[18px] h-[18px] flex-shrink-0'

export const courses = {
  'data-science': {
    slug: 'data-science',
    title: 'Data Science & AI Program by Cloudblitz',
    pageTitle: 'Data Science & AI | Cloudblitz',
    heading: 'Become an Industry‑Ready Data Scientist & AI Expert.',
    bullets: [
      'Designed for professionals to stand out in data science & AI job market',
      'AI-infused curriculum that helps you master 12+ real-world projects and workflows',
    ],
    toolsHeading: 'Master 20+ data science & AI tools',
    tools: [
      { icon: SiPython, label: 'Python', color: '#3776AB' },
      { icon: SiJupyter, label: 'Jupyter', color: '#F37626' },
      { icon: SiGooglecolab, label: 'Colab', color: '#F9AB00' },
      { icon: SiPandas, label: 'Pandas', color: '#150458' },
      { icon: SiPytorch, label: 'PyTorch', color: '#EE4C2C' },
      { icon: SiScikitlearn, label: 'Scikit-learn', color: '#F7931E' },
      { icon: TbDatabase, label: 'SQL', color: '#f16a3a' },
      { icon: TbChartBar, label: 'Power BI', color: '#F2C811' },
      { icon: PiMicrosoftExcelLogo, label: 'Excel', color: '#217346' },
    ],
    companyValues: {
      stats: [
        { value: '6 months', label: 'Intensive job bootcamp' },
        { value: '8.2 LPA', label: 'Average CTC in placements' },
        { value: '128% avg hike', label: 'After program completion' },
        { value: '80K+', label: 'Students enrolled' },
      ],
      heading: 'AI is redefining the future of data science jobs',
      points: [
        {
          title: '2.3M+ Data Science & AI Jobs',
          description: 'Global demand for data scientists, ML engineers, and AI specialists across industries',
        },
        {
          title: '80% of roles now require AI skills',
          description: 'Python, ML models, and GenAI workflows are becoming baseline expectations in hiring',
        },
        {
          title: '40% faster career growth with AI expertise',
          description: 'Professionals with data science & AI skills see accelerated promotions and salary hikes',
        },
      ],
      chart: {
        label: 'AI SKILLS DEMAND IN JOB MARKET',
        headline: '80% increase in 3 years',
        bars: [
          { year: '2023', height: 42 },
          { year: '2024', height: 58 },
          { year: '2025', height: 88, highlight: true },
        ],
      },
    },
  },
  devops: {
    slug: 'devops',
    title: 'Cloud DevOps Program by Cloudblitz',
    pageTitle: 'Cloud DevOps | Cloudblitz',
    heading: 'Become a Production‑Ready Cloud DevOps Engineer.',
    bullets: [
      'Built for professionals ready to deploy, scale, and automate in the cloud',
      'Hands-on labs covering CI/CD, Kubernetes, and production infrastructure',
    ],
    toolsHeading: 'Master 20+ DevOps & cloud tools',
    tools: [
      { icon: SiDocker, label: 'Docker', color: '#2496ED' },
      { icon: SiKubernetes, label: 'Kubernetes', color: '#326CE5' },
      { icon: FaAws, label: 'AWS', color: '#FF9900' },
      { icon: SiTerraform, label: 'Terraform', color: '#844FBA' },
      { icon: SiJenkins, label: 'Jenkins', color: '#D24939' },
      { icon: SiGithubactions, label: 'GitHub Actions', color: '#2088FF' },
      { icon: SiLinux, label: 'Linux', color: '#FCC624' },
      { icon: SiPython, label: 'Python', color: '#3776AB' },
    ],
    companyValues: {
      stats: [
        { value: '6 months', label: 'Intensive job bootcamp' },
        { value: '8.2 LPA', label: 'Average CTC in placements' },
        { value: '115% avg hike', label: 'After program completion' },
        { value: '10K+', label: 'Students enrolled' },
      ],
      heading: 'Cloud & DevOps are reshaping every tech team',
      points: [
        {
          title: '1.8M+ Cloud & DevOps Jobs',
          description: 'Rising demand for engineers who can deploy, automate, and scale production systems',
        },
        {
          title: '90% of companies are moving to the cloud',
          description: 'AWS, Kubernetes, and CI/CD pipelines are now core requirements across IT roles',
        },
        {
          title: '35% higher salaries for DevOps engineers',
          description: 'Cloud-native skills command premium pay in startups and enterprise teams alike',
        },
      ],
      chart: {
        label: 'DEVOPS SKILLS DEMAND IN JOB MARKET',
        headline: '75% increase in 3 years',
        bars: [
          { year: '2023', height: 45 },
          { year: '2024', height: 62 },
          { year: '2025', height: 85, highlight: true },
        ],
      },
    },
  },
}
