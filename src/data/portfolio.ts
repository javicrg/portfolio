export const profile = {
  name: 'Javier Careaga',
  shortName: 'Javi Careaga',
  email: 'jcareagamoraleda@gmail.com',
  github: 'https://github.com/javicrg',
  linkedin: 'https://www.linkedin.com/in/javier-careaga/',
  updated: 'November 2026',
  description:
    'Computer Science student at the University of Edinburgh. Building practical software and exploring machine learning, computer systems, and financial technology.',
};

export interface ProjectSection {
  title: string;
  paragraphs: string[];
}
export interface Project {
  slug: string;
  number: string;
  title: string;
  category: string;
  summary: string;
  tags: string[];
  role: string;
  status: string;
  repository?: string;
  sections: ProjectSection[];
}

export const projects: Project[] = [
  {
    slug: 'private-markets-tracker',
    number: '01',
    title: 'Private Markets Tracker',
    category: 'Full-stack engineering · Financial software',
    summary:
      'A private-markets management platform that brings customers, investment positions, and reporting into one workflow. Developed around a practical financial use case in collaboration with a stakeholder.',
    tags: ['Next.js', 'TypeScript', 'MySQL', 'Clerk', 'Tailwind CSS'],
    role: 'Independent developer · Stakeholder collaboration',
    status: 'Public source',
    repository: 'https://github.com/javicrg/private-markets-tracker',
    sections: [
      {
        title: 'The problem',
        paragraphs: [
          'Customer records, investment commitments, and fund schedules need to stay connected for reporting to be useful. I developed this application for a practical financial use case, working with a stakeholder to translate business requirements into a usable management workflow.',
        ],
      },
      {
        title: 'What the application does',
        paragraphs: [
          'Users can create, edit, search, and delete customer and product records, associate investment positions with each customer, and review fund-level and cumulative reports. Positions distinguish primary commitments, follow-on investments, and secondary purchases.',
          'The implementation records capital-call and distribution schedules, including projected cash flows. Dashboard charts summarise commitments and allocation; customer reports aggregate annual and cumulative cash flows. These are calculations from entered schedules and assumptions, rather than live market data.',
        ],
      },
      {
        title: 'Architecture',
        paragraphs: [
          'Next.js App Router and React provide the dashboard, with TypeScript across the application. React Server Actions authenticate changes through Clerk, validate form data with Zod, and persist it through parameterised mysql2 queries. Dashboard routes require a signed-in user.',
          'MySQL/MariaDB stores customers and products in separate tables. Customer positions and product cash-flow schedules are stored as JSON text, with associations resolved by the application. The database layer also generates report data; Recharts presents the resulting time series and allocations. Tailwind CSS and shadcn/ui support the interface.',
        ],
      },
      {
        title: 'Engineering decisions',
        paragraphs: [
          'An investment position has its own commitment, purchase type, entry date, and optional secondary purchase price. Keeping that information separate from a shared fund schedule allows the same product to appear in different customer contexts.',
          'Reports need to align different schedules to a shared year axis before aggregation. Product edits also need to preserve customer associations: the application updates embedded references when a product is renamed and removes them when it is deleted. These were useful challenges in connecting data management, calculations, and the interface.',
        ],
      },
      {
        title: 'Scope and presentation',
        paragraphs: [
          'This is independent software development informed by a real use case. The public repository and screenshots use fictional demo data. No customer records or confidential financial positions are shown here.',
        ],
      },
    ],
  },
  {
    slug: 'language-model-calibration',
    number: '02',
    title: 'Language Model Evaluation & Calibration',
    category: 'Independent ML experimentation · DIY JEV',
    summary:
      'Evaluating Qwen3-0.6B on CommonsenseQA: LoRA fine-tuning improved accuracy, then temperature scaling brought confidence closer to observed performance without changing the predicted answers.',
    tags: ['Python', 'PyTorch', 'Hugging Face', 'Temperature scaling', 'LoRA'],
    role: 'Independent experimentation',
    status: 'Public source · Evaluation study',
    repository: 'https://github.com/javicrg/diy-jev',
    sections: [
      {
        title: 'The question',
        paragraphs: [
          'A confident answer is not necessarily a correct answer. In DIY JEV, I independently investigated prediction quality, confidence estimation, and decision-making using Qwen3-0.6B on five-choice CommonsenseQA questions. The original model was highly overconfident: 92.00% average confidence at 49.33% accuracy.',
        ],
      },
      {
        title: 'Evaluation method',
        paragraphs: [
          'The final experiment shuffled the 9,741-question CommonsenseQA training split with seed 42, then used 8,341 questions for training, 400 for validation, 400 for calibration, and 600 for held-out evaluation. These are internal partitions of the training split, not an independent external benchmark.',
          'I evaluated the original model, the selected LoRA adapter, and the same adapter after temperature scaling on the same 600 held-out questions. The temperature was fitted only on the separate calibration partition. Earlier experiments on the official validation split are separate development runs and are not mixed into this comparison.',
        ],
      },
      {
        title: 'What changed',
        paragraphs: [
          'LoRA fine-tuning raised accuracy from 49.33% to 65.17% and reduced average confidence from 92.00% to 82.60%. Applying temperature scaling to the fine-tuned model then reduced average confidence to 65.07%, while accuracy stayed at 65.17%.',
          'Negative log-likelihood fell from 3.7584 for the original model to 1.1344 after fine-tuning and 0.9160 after calibration. Ten-bin expected calibration error fell from 42.94% to 17.43% to 3.91%. Lower NLL indicates better probability assignments to correct answers; lower ECE indicates a smaller binned confidence–accuracy gap.',
          'Scaling logits by a positive temperature changes probabilities without changing the highest-scoring answer. Fine-tuning improved prediction accuracy in this experiment; temperature scaling improved calibration. Average confidence alone is not a complete calibration test.',
        ],
      },
      {
        title: 'Implementation',
        paragraphs: [
          'The Python workflow uses PyTorch, Hugging Face Transformers and Datasets, and PEFT. LoRA adapters target the attention q_proj and v_proj modules with rank 8, alpha 16, and dropout 0.05. Training uses AdamW, a learning-rate schedule, gradient accumulation, validation checks, and early stopping.',
          'The inference pipeline scores answer tokens A–E, applies the fitted temperature (approximately 2.0905), and can abstain below a confidence threshold. At a 70% threshold, it answered 260 of 600 questions: 43.33% coverage with 82.69% accuracy on answered questions. That selective accuracy reflects abstention, not an improvement in overall model accuracy.',
        ],
      },
      {
        title: 'Limits and learning',
        paragraphs: [
          'The results describe a specific model, prompt, dataset partition, and adapter. Calibration may not transfer to unfamiliar questions or a different distribution, and abstention reduces coverage. This is an independent experiment using an existing model, rather than foundation-model training or a production AI system.',
          'The work helped me distinguish prediction quality, confidence estimation, and evaluation design—and use separate training, validation, calibration, and held-out partitions to assess each step.',
        ],
      },
    ],
  },
  {
    slug: 'cross-platform-mobile',
    number: '03',
    title: 'Cross-Platform Mobile Application',
    category: 'Mobile engineering · Ongoing',
    summary:
      'A private iOS and Android application focused on secure account connections, shared-data synchronisation, and a reliable mobile experience.',
    tags: ['React Native', 'Expo', 'TypeScript', 'Supabase', 'PostgreSQL'],
    role: 'Independent developer',
    status: 'Ongoing · Private source',
    sections: [
      {
        title: 'The engineering focus',
        paragraphs: [
          'I am developing a private cross-platform application with React Native, Expo, and TypeScript. The work centres on secure data synchronisation between connected accounts and a consistent user experience on iOS and Android.',
        ],
      },
      {
        title: 'Identity and data access',
        paragraphs: [
          'Supabase provides email OTP authentication, session management, PostgreSQL storage, and realtime communication. Database migrations track schema changes, while Row Level Security enforces row-level authorisation for user data.',
          'Secure user pairing requires coordinating account connections with the data each account can access. This makes authentication, database policies, and the interface part of the same engineering problem.',
        ],
      },
      {
        title: 'Working beyond the happy path',
        paragraphs: [
          'The implementation includes mobile navigation, automated testing, realtime data synchronisation, and connection recovery. Handling application lifecycle changes is particularly important: a mobile app needs to restore a useful state when it returns to the foreground or reconnects.',
        ],
      },
      {
        title: 'Project privacy',
        paragraphs: [
          'The application is personal and remains private. This case study describes the engineering work only; private content and application screenshots are intentionally omitted.',
        ],
      },
    ],
  },
];

export const calibration = {
  total: 9741,
  training: 8341,
  validation: 400,
  calibration: 400,
  heldOut: 600,
  stages: [
    {
      label: 'Original',
      confidence: 92.0,
      accuracy: 49.33,
      nll: '3.7584',
      ece: 42.94,
      tone: 'before',
    },
    {
      label: 'Fine-tuned',
      confidence: 82.6,
      accuracy: 65.17,
      nll: '1.1344',
      ece: 17.43,
      tone: 'fine-tuned',
    },
    {
      label: 'Calibrated',
      confidence: 65.07,
      accuracy: 65.17,
      nll: '0.9160',
      ece: 3.91,
      tone: 'after',
    },
  ],
};

export const experiences = [
  {
    organisation: 'Edinburgh University Trading & Investment Club',
    role: 'Energy & Utilities Analyst',
    context: 'Student society · Investment research & team leadership',
    description:
      'Researching companies, evaluating business and financial performance, and contributing to investment pitches. I have led teams of five analysts in junior and senior analyst contexts. My research has included Naturgy’s business performance, financial position, capital expenditure, and investment considerations.',
  },
  {
    organisation: 'Fundación Balia',
    role: 'Volunteer',
    context: 'Madrid · Summer 2026 · Approximately two weeks',
    description:
      'Worked with approximately 45 children and helped lead educational activities in science, engineering, and computer science. An opportunity to adapt technical ideas for younger audiences and develop communication and leadership skills.',
  },
];

export const skillGroups = [
  {
    title: 'Languages',
    items: [
      'Python',
      'TypeScript / JavaScript',
      'Java',
      'C',
      'SQL',
      'MIPS Assembly',
    ],
  },
  {
    title: 'Web & mobile',
    items: [
      'React',
      'Next.js',
      'React Native',
      'Expo',
      'Astro',
      'Tailwind CSS',
    ],
  },
  {
    title: 'Data & tooling',
    items: [
      'PostgreSQL',
      'MySQL',
      'Supabase',
      'Git',
      'pandas',
      'PyTorch',
      'Hugging Face',
    ],
  },
  {
    title: 'Foundations & practice',
    items: [
      'Algorithms & data structures',
      'Object-oriented programming',
      'Data modelling',
      'Authentication & authorisation',
      'ML evaluation',
      'Statistical analysis',
      'Testing & debugging',
    ],
  },
];
