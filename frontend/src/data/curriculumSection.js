import {
  SiGithub,
  SiGooglecloud,
  SiOpenai,
  SiSnowflake,
  SiTensorflow,
  SiTerraform,
} from 'react-icons/si'
import dataScienceImage from '../assets/data-science.webp'
import devopsImage from '../assets/devops.webp'

export const curriculumSectionContent = {
  'data-science': {
    heading: 'AI infused curriculum curated by experts',
    featureCard: {
      image: dataScienceImage,
      imageAlt: 'AI tools and applications preview',
      title: 'Learn 20+ AI tools',
      subtitle: 'Replit, Notion AI, Chat GPT and more...',
    },
    syllabusLabel: 'SYLLABUS',
    weeks: [
      {
        week: 'Week 1',
        topics: ['Introduction to Data Analytics', 'Data Analytics with Excel'],
      },
      {
        week: 'Week 2',
        topics: ['Data Analytics with SQL', 'Python Programming'],
      },
      {
        week: 'Week 3',
        topics: ['Machine Learning Foundations', 'Model Evaluation & Deployment'],
      },
      {
        week: 'Week 4',
        topics: ['Deep Learning Basics', 'GenAI Workflow Automation'],
      },
    ],
    trustLine: 'Content and technology you can trust, backed by experts',
    partners: [
      { id: 'openai', icon: SiOpenai, label: 'OpenAI', color: '#ffffff' },
      { id: 'tensorflow', icon: SiTensorflow, label: 'TensorFlow', color: '#ff6f00' },
      { id: 'snowflake', icon: SiSnowflake, label: 'Snowflake', color: '#29b5e8' },
    ],
  },
  devops: {
    heading: 'Cloud-native curriculum curated by experts',
    featureCard: {
      image: devopsImage,
      imageAlt: 'Cloud infrastructure and DevOps preview',
      title: 'Learn 20+ Cloud tools',
      subtitle: 'Docker, Kubernetes, Terraform and more..',
    },
    syllabusLabel: 'SYLLABUS',
    weeks: [
      {
        week: 'Week 1',
        topics: ['Linux & Networking Basics', 'Git & Version Control'],
      },
      {
        week: 'Week 2',
        topics: ['Docker & Containerization', 'CI/CD Pipelines'],
      },
      {
        week: 'Week 3',
        topics: ['Kubernetes & Orchestration', 'Infrastructure as Code'],
      },
      {
        week: 'Week 4',
        topics: ['AWS Cloud Services', 'Monitoring & Site Reliability'],
      },
    ],
    trustLine: 'Content and technology you can trust, backed by experts',
    partners: [
      { id: 'terraform', icon: SiTerraform, label: 'Terraform', color: '#844fba' },
      { id: 'github', icon: SiGithub, label: 'GitHub', color: '#ffffff' },
      { id: 'google-cloud', icon: SiGooglecloud, label: 'Google Cloud', color: '#4285f4' },
    ],
  },
}
