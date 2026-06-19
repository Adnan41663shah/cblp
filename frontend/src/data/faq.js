export const getFaqItems = (courseKey) => [
  {
    id: 1,
    question:
      courseKey === 'devops'
        ? 'What are the prerequisites for cloud DevOps courses?'
        : 'What are the prerequisites for Data Science & AI courses?',
    answer:
      courseKey === 'devops'
        ? 'Basic knowledge of IT concepts and familiarity with operating systems is recommended. However, we offer beginner friendly courses that start from the fundamentals.'
        : 'No prior coding, math, or statistics background is required. The program is beginner-friendly and starts from the absolute fundamentals of Python programming and basic mathematics.',
    category: 'general',
  },
  {
    id: 2,
    question: 'Do you provide job placement assistance?',
    answer:
      'Yes, we provide comprehensive job placement assistance including resume building, interview preparation, and connecting you with our corporate partners.',
    category: 'placement',
  },
  {
    id: 3,
    question: 'Are the courses available online?',
    answer:
      'Yes, we offer both online and hybrid learning options. You can choose the format that best suits your schedule and learning preferences.',
    category: 'curriculum',
  },
  {
    id: 4,
    question: 'What certifications will I receive?',
    answer:
      courseKey === 'devops'
        ? "Upon completion, you'll receive our course completion certificate and guidance to prepare for official cloud certifications like AWS (SysOps/Developer/Solutions Architect) and Kubernetes (CKA/CKAD)."
        : "Upon completion, you'll receive our course completion certificate and guidance to prepare for leading industry-recognized certifications in Data Science, Machine Learning, and AI.",
    category: 'general',
  },
  {
    id: 5,
    question: 'Do you have centers in multiple cities?',
    answer:
      'Yes, we have training centers in Pune (Kothrud, Wakad, Kharadi, Chakan), Nashik, Indore, Nagpur, and Amravati. We also offer online training for students worldwide.',
    category: 'general',
  },
  {
    id: 6,
    question: 'What is the course duration and fee structure?',
    answer:
      'Course duration varies from 90-130 hours depending on the program. Fees range from ₹30,000 to ₹1,20,000 with flexible payment options and EMI available.',
    category: 'pricing',
  },
]

export const FAQ_ITEMS = getFaqItems('data-science')

