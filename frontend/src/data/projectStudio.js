// Project-centric, outcome-first content for the Build-to-Hire studio.
// Each project tells a story (steps) and maps to the careers it unlocks.
// No fabricated metrics — qualitative project framing + role mappings only.

export const projectStudioContent = {
  'data-science': {
    eyebrow: 'Projects, not just lectures',
    heading: 'Build the projects that get you hired',
    subhead:
      'Every project mirrors a real business problem you ship work that looks like the job, and walk away with a portfolio that maps to in-demand roles.',
    projects: [
      {
        id: 'fraud-detection',
        title: 'Fraud Detection Models',
        tag: 'Anomaly Detection',
        summary: 'Catch fraudulent transactions hidden inside millions of records.',
        steps: [
          { label: 'Problem', detail: 'Fraud hides inside millions of transactions.' },
          { label: 'Data', detail: 'Explore labelled transaction histories.' },
          { label: 'Model', detail: 'Train supervised anomaly-detection pipelines.' },
          { label: 'Impact', detail: 'Flag fraud in real time and cut losses.' },
        ],
        roles: ['ML Engineer', 'Risk Analyst', 'Financial Data Analyst'],
      },
      {
        id: 'churn-prediction',
        title: 'Customer Churn Prediction',
        tag: 'Predictive Analytics',
        summary: 'Predict which customers are about to leave before they do.',
        steps: [
          { label: 'Problem', detail: 'Companies lose customers without warning.' },
          { label: 'Data', detail: 'Behavioural and subscription signals.' },
          { label: 'Model', detail: 'Score churn probability per user.' },
          { label: 'Impact', detail: 'Trigger retention before customers leave.' },
        ],
        roles: ['Product Analyst', 'Data Scientist'],
      },
      {
        id: 'genai-workflows',
        title: 'GenAI Workflow Automation',
        tag: 'Generative AI',
        summary: 'Orchestrate LLM agents that automate real business workflows.',
        steps: [
          { label: 'Problem', detail: 'Teams burn hours on repetitive knowledge work.' },
          { label: 'Data', detail: 'Company docs and live tool APIs.' },
          { label: 'Model', detail: 'Chain LLM agents end-to-end.' },
          { label: 'Impact', detail: 'Automate workflows across business teams.' },
        ],
        roles: ['AI Engineer', 'GenAI Specialist'],
      },
      {
        id: 'health-care-analytics',
        title: 'US Health Care Analytics',
        tag: 'Predictive Healthcare',
        summary: 'Predict patient risk early from real clinical data.',
        steps: [
          { label: 'Problem', detail: "Hospitals can't flag at-risk patients early." },
          { label: 'Data', detail: 'Clean and explore patient records.' },
          { label: 'Model', detail: 'Predict health outcomes with ML.' },
          { label: 'Impact', detail: 'Intervene before patients deteriorate.' },
        ],
        roles: ['Healthcare Data Analyst', 'ML Engineer'],
      },
      {
        id: 'meal-plan-ml',
        title: 'Meal Plan Analysis',
        tag: 'Recommendation',
        summary: 'Build a recommendation engine for personalised nutrition.',
        steps: [
          { label: 'Problem', detail: "Generic diet plans don't fit individuals." },
          { label: 'Data', detail: 'Nutrition and user-preference datasets.' },
          { label: 'Model', detail: 'Build an ML recommendation engine.' },
          { label: 'Impact', detail: 'Personalised meal plans at scale.' },
        ],
        roles: ['ML Engineer', 'AI Engineer'],
      },
      {
        id: 'python-sheets',
        title: 'Spreadsheet Data with Python',
        tag: 'Automation',
        badge: 'IIT Exclusive',
        summary: 'Turn messy spreadsheets into automated, living dashboards.',
        steps: [
          { label: 'Problem', detail: 'Manual reporting eats analyst hours.' },
          { label: 'Data', detail: 'Ingest messy spreadsheets at scale.' },
          { label: 'Build', detail: 'Automate cleaning and analysis in Python.' },
          { label: 'Impact', detail: 'Raw sheets become live dashboards.' },
        ],
        roles: ['Data Analyst', 'Business Analyst'],
      },
    ],
  },
  devops: {
    eyebrow: 'Projects, not just lectures',
    heading: 'Build the production systems that get you hired',
    subhead:
      'Every project mirrors real production infrastructure you ship work that looks like the job, and walk away with a portfolio that maps to in-demand roles.',
    projects: [
      {
        id: 'kubernetes-orchestration',
        title: 'Kubernetes Orchestration',
        tag: 'Orchestration',
        summary: 'Run resilient, self-healing services across production clusters.',
        steps: [
          { label: 'Challenge', detail: 'Apps fall over under real traffic.' },
          { label: 'Build', detail: 'Containerise and deploy to clusters.' },
          { label: 'Ship', detail: 'Auto-scaling, self-healing workloads.' },
          { label: 'Impact', detail: 'Resilient services at production scale.' },
        ],
        roles: ['DevOps Engineer', 'Platform Engineer', 'SRE'],
      },
      {
        id: 'cicd-pipeline',
        title: 'CI/CD Pipeline Automation',
        tag: 'Automation',
        summary: 'Ship code to production in minutes with zero-touch pipelines.',
        steps: [
          { label: 'Challenge', detail: 'Manual deploys are slow and risky.' },
          { label: 'Build', detail: 'GitHub Actions build and test pipelines.' },
          { label: 'Ship', detail: 'Automated, zero-touch deployments.' },
          { label: 'Impact', detail: 'Safe releases to prod in minutes.' },
        ],
        roles: ['DevOps Engineer', 'Release Engineer'],
      },
      {
        id: 'aws-cloud',
        title: 'AWS Cloud Infrastructure',
        tag: 'Cloud',
        badge: 'AWS Project',
        summary: 'Architect secure, scalable cloud environments on AWS.',
        steps: [
          { label: 'Challenge', detail: 'Scaling on-prem is costly and rigid.' },
          { label: 'Build', detail: 'Architect secure AWS environments.' },
          { label: 'Ship', detail: 'Scalable, cost-aware cloud infra.' },
          { label: 'Impact', detail: 'Enterprise-grade cloud foundations.' },
        ],
        roles: ['Cloud Engineer', 'AWS Solutions Architect'],
      },
      {
        id: 'terraform-iac',
        title: 'Terraform Infrastructure as Code',
        tag: 'Infrastructure as Code',
        summary: 'Provision reproducible cloud infrastructure with one command.',
        steps: [
          { label: 'Challenge', detail: 'Click-ops infra is impossible to reproduce.' },
          { label: 'Build', detail: 'Version-controlled Terraform modules.' },
          { label: 'Ship', detail: 'Provision cloud with one command.' },
          { label: 'Impact', detail: 'Reproducible, auditable infrastructure.' },
        ],
        roles: ['DevOps Engineer', 'Cloud Engineer'],
      },
      {
        id: 'docker-containers',
        title: 'Docker Containerization',
        tag: 'Containers',
        summary: 'Package microservices into portable, consistent containers.',
        steps: [
          { label: 'Challenge', detail: "'Works on my machine' breaks in prod." },
          { label: 'Build', detail: 'Package microservices into images.' },
          { label: 'Ship', detail: 'Portable containers across environments.' },
          { label: 'Impact', detail: 'Consistent deploys, anywhere.' },
        ],
        roles: ['DevOps Engineer', 'Backend Engineer'],
      },
      {
        id: 'monitoring-sre',
        title: 'Monitoring & Site Reliability',
        tag: 'Observability',
        summary: 'Catch incidents before customers ever notice them.',
        steps: [
          { label: 'Challenge', detail: 'Outages go unnoticed until users complain.' },
          { label: 'Build', detail: 'Metrics, logs and alerting stacks.' },
          { label: 'Ship', detail: 'Live dashboards and on-call alerts.' },
          { label: 'Impact', detail: 'Catch issues before customers do.' },
        ],
        roles: ['SRE', 'DevOps Engineer'],
      },
    ],
  },
}
