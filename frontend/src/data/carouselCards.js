export const carouselSectionContent = {
  'data-science': {
    heading: 'Build with data science like never before',
    cards: [
      {
        id: 'health-care-analytics',
        title: 'US Health Care Analytics',
        description: 'Analyze patient data and build predictive health insights with AI.',
        badge: null,
      },
      {
        id: 'python-sheets',
        title: 'Spreadsheet Data with Python',
        description: 'Automate reporting and transform raw sheets into actionable dashboards.',
        badge: 'IIT Exclusive',
      },
      {
        id: 'meal-plan-ml',
        title: 'Meal Plan Analysis',
        description: 'Use ML to evaluate nutrition data and generate smart recommendations.',
        badge: null,
      },
      {
        id: 'fraud-detection',
        title: 'Fraud Detection Models',
        description: 'Detect anomalies in transactions using supervised learning pipelines.',
        badge: null,
      },
      {
        id: 'churn-prediction',
        title: 'Customer Churn Prediction',
        description: 'Forecast retention risk and drive data-backed engagement strategies.',
        badge: null,
      },
      {
        id: 'genai-workflows',
        title: 'GenAI Workflow Automation',
        description: 'Design end-to-end AI workflows that scale across business teams.',
        badge: null,
      },
    ],
  },
  devops: {
    heading: 'Build production-grade DevOps projects',
    cards: [
      {
        id: 'cicd-pipeline',
        title: 'CI/CD Pipeline Automation',
        description: 'Automate builds, tests, and deployments with GitHub Actions pipelines.',
        badge: null,
      },
      {
        id: 'kubernetes-orchestration',
        title: 'Kubernetes Orchestration',
        description: 'Deploy, scale, and manage containerized apps across production clusters.',
        badge: null,
      },
      {
        id: 'terraform-iac',
        title: 'Terraform Infrastructure as Code',
        description: 'Provision cloud resources reproducibly with version-controlled IaC.',
        badge: null,
      },
      {
        id: 'docker-containers',
        title: 'Docker Containerization',
        description: 'Package microservices into portable containers for consistent deployments.',
        badge: null,
      },
      {
        id: 'aws-cloud',
        title: 'AWS Cloud Infrastructure',
        description: 'Architect secure, scalable cloud environments on Amazon Web Services.',
        badge: 'AWS Project',
      },
      {
        id: 'monitoring-sre',
        title: 'Monitoring & Site Reliability',
        description: 'Set up observability stacks with metrics, alerts, and uptime dashboards.',
        badge: null,
      },
    ],
  },
}

export const defaultCarouselCards = carouselSectionContent['data-science'].cards
