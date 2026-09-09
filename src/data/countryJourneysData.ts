import { CountryJourneyData } from '../types/countryJourney';

export const swedenJourneyDefaultData: CountryJourneyData = {
  order: 1,
  countryId: 'sweden',
  countryName: 'Sweden',
  flag: '🇸🇪',
  status: 'Available',
  isReady: true,
  tagline: 'An Evolving Mission-Oriented Approach to Urban Climate Transition',
  summary: 'Showcasing how Viable Cities, Climate City Contract 2030, the Coordination Function, and System Demonstrators form an interconnected multilevel delivery system spanning 48 municipalities and 6 national agencies.',
  keyMechanisms: [
    'Viable Cities Platform',
    'Climate City Contract 2030',
    'System Demonstrators',
    'EnergyNet Local Energy',
    'Viability Fund for Cities',
  ],
  cardImage: 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?auto=format&fit=crop&w=800&q=80',
  themeColor: '#3c4799',

  headerSubtitle: '• Sweden Deep Dive',
  headerTitle: 'Sweden’s Multilevel Governance and Implementation Journey',
  headerDescription:
    'An in-depth analysis of Sweden’s evolving mission-oriented innovation ecosystem, demonstrating how municipal autonomy, recurring political contracts, system demonstrators, and emerging local investment structures connect into a continuous multilevel delivery architecture.',

  tabATitle: 'The Swedish Context',
  tabASubtitle: 'An Evolving Mission-Oriented Approach to Urban Climate Transition',
  premisesHeading: 'Two Central Premises of Sweden’s Multilevel Journey',
  premisesIntro: 'Sweden’s approach to urban climate transformation is grounded in two fundamental institutional premises:',
  premises: [
    {
      number: 1,
      title: 'No Single Actor Delivers Alone',
      description:
        'No individual institution or level of government possesses all mandates, assets, or capital required for complete urban decarbonization.',
    },
    {
      number: 2,
      title: 'Finance Follows Governance',
      description:
        'Capital and financing instruments become dramatically more effective when the governance, coordination, and portfolio structuring needed to organize collective action are firmly in place.',
    },
  ],

  contextSections: [
    {
      title: 'An Evolving, Iterative Governance Architecture',
      paragraphs: [
        'Sweden’s multilevel climate governance model has evolved iteratively, as successive stages of climate action exposed new governance, delivery and financing challenges and opportunities. This evolution has been shaped by strong municipal autonomy, a well-developed research and innovation system, established municipal financing capacity and a governance culture that supports experimentation and learning across institutional boundaries.',
      ],
    },
    {
      title: 'Municipalities as a "Gathering Force"',
      paragraphs: [
        'Swedish municipalities have substantial responsibility for systems central to climate transition, including spatial planning, infrastructure, municipal companies, procurement and investment. Yet many regulatory, financial and infrastructure conditions are determined nationally or at European level, while businesses, utilities, property owners and citizens control important assets and decisions.',
        'Municipalities can instead act as a **“gathering force”**, connecting their own mandates with actors whose decisions are also necessary for transition. This has encouraged a shift from traditional municipal governance toward more network-based, multilevel forms of governance and coordination.',
      ],
    },
    {
      title: 'Viable Cities & Phased Scaling',
      paragraphs: [
        'Sweden\'s multilevel model developed through its mission-oriented innovation ecosystem. **Viable Cities** was established in 2017 and progressively brought municipalities, national agencies, research institutions, businesses and civil society around the mission of climate-neutral cities by 2030.',
        'Rather than attempting national scale immediately, the programme developed approaches with pioneer municipalities:',
      ],
      bulletPoints: [
        { label: '9 Pioneer Municipalities', text: 'in 2019' },
        { label: '23 Municipalities', text: 'in 2021' },
        { label: '48 Municipalities', text: 'in 2024 (representing approximately half of Sweden\'s total population)' },
      ],
    },
    {
      title: 'Integrating into Ordinary Planning Cycles (Climate City Contract 2030)',
      paragraphs: [
        'As participation grew, experience demonstrated that a shared mission needed to be translated into durable political commitments, locally owned transition processes and continuous national–local coordination. **Climate City Contract 2030** along with **Transition Arenas** and later **Samordningsfunktionen (the Coordination Function)** developed within this context.',
        'Importantly, the emerging governance process was designed to interact directly with municipalities\' ordinary planning, budgeting and political cycles and to be reviewed and renewed annually, rather than becoming a parallel climate-governance structure. The process has also helped national agencies identify how their programmes, policy instruments and funding calls can be better coordinated with municipal implementation needs and with one another.',
      ],
    },
    {
      title: 'Shifting from Isolated Pilots to System Demonstrators',
      paragraphs: [
        'A second challenge emerged from Sweden\'s experience with innovation and pilots. Individual technologies or projects could succeed technically without scaling because surrounding governance, regulation, infrastructure, business models, finance, procurement or behaviours remained unchanged.',
        'This shifted attention from testing individual solutions toward changing the systems in which solutions must operate. **System Demonstrators**, including those in Lund and Stockholm, emerged as a way to bring multiple actors and interventions together around bounded real-world transition challenges and progressively connect experimentation with cities\' wider transition portfolios.',
      ],
    },
    {
      title: 'Bridging the Financing Gap: Local Climate Investment Structures & Viability Fund',
      paragraphs: [
        'As these governance and delivery approaches matured, they exposed a further gap between transition priorities and investment. Urban transition portfolios can involve multiple owners, different risk and maturity profiles and enabling interventions that are not themselves investable. Sweden already has strong municipal borrowing capacity through **Kommuninvest**, but conventional debt does not by itself provide project preparation, portfolio structuring, catalytic capital or coordination across actors and assets.',
        'This has led to emerging work on **Local Climate Investment Structures**, including learning from the **EnergyNet** use case, to better connect locally owned transition priorities with investment and finance.',
        'This thinking has informed the emerging **Viability Fund for Cities**, intended to strengthen connections between systemic urban transformation, local investment and national and international finance. In parallel, work on aggregated demand and market shaping, including **First Mover Cities**, reflects recognition that finance alone is insufficient for scale: cities and other urban actors can also use coordinated purchasing and credible demand signals to help create markets for transition solutions.',
      ],
    },
  ],

  tabBTitle: 'The Multilevel Model',
  tabBSubtitle: 'Architecture Diagram & 6 Multilevel Governance Actions',
  modelHeading: 'Sweden’s Multilevel Climate Governance and Implementation Model',
  modelOverview:
    'Sweden’s experience brings together mechanisms at different stages of maturity. **Viable Cities**, **Climate City Contract 2030**, the **Coordination Function** and **System Demonstrators** are established components, while **Local Climate Investment Structures**, the **Viability Fund for Cities** and stronger aggregated-demand and finance interfaces are being developed.',
  modelDiagramNote:
    'The diagram below illustrates how these programs form a continuous multilevel implementation system. Click on the image or the Fullscreen button to zoom and pan.',
  diagramImageUrl: '/sweden-model-architecture.png',
  diagramImageAlt: 'Sweden’s Multilevel Climate Governance and Implementation Architecture',

  actionsHeading: "Sweden's Journey Across the 6 Implementation Pathways",
  actionsSubtitle: "How the Swedish mission model maps into the Toolkit's 6 core multilevel climate governance actions.",
  actions: [
    {
      actionNumber: 1,
      actionThemeTitle: '• Shared Commitments',
      title: 'Develop Shared Commitments, Political Alignment and Ownership',
      paragraphs: [
        '**Climate City Contract 2030** provides the recurring process through which municipalities, national agencies and Viable Cities establish shared direction and commitments. The contracts are voluntary rather than legally binding and are renewed through successive cycles of review, learning and political recommitment. Municipalities retain locally adapted pathways, while national agencies and Viable Cities make complementary commitments around enabling conditions, coordination and support.',
        'At local level, **Transition Arenas** extend ownership of climate action beyond municipal government, bringing public, private, academic and civic actors together to co-create transition priorities and portfolios. More recently, **Joint Commitments** have enabled groups of municipalities to work collectively on recurring challenges—including governance, climate investment and procurement—rather than addressing them city by city.',
      ],
      enabledSummary:
        'Sweden has expanded the initiative from nine municipalities in 2019 to 48 municipalities, representing approximately half the country\'s population, while retaining locally owned transition processes. The opportunity is to embed commitments into ordinary political, planning, budgeting and investment processes so they endure beyond programme and political cycles.',
    },
    {
      actionNumber: 2,
      actionThemeTitle: '• Enabling Environments',
      title: 'Develop Enabling Environments',
      paragraphs: [
        'Sweden\'s approach illustrates a continuous process of assessing enabling-environments. Climate City Contracts and Transition Arenas have surfaced implementation barriers and needs, while the Coordination Function identifies recurring governance gaps across municipalities.',
        '**System Demonstrators** deepen this diagnostic function through real-world implementation. They examine key barriers and transformation potential across governance, regulation, finance and business models, infrastructure, behaviour and technology, allowing cities and partners to understand not only whether an intervention works but what surrounding conditions must change for systemic transformation to occur.',
      ],
      enabledSummary:
        'Barriers identified through local experience can become inputs into subsequent portfolios, coordination and policy discussions. The opportunity is converting dispersed implementation evidence into sufficiently systematic information that national actors can act upon.',
    },
    {
      actionNumber: 3,
      actionThemeTitle: '• Governance and Coordination',
      title: 'Institutionalize Multilevel Governance Frameworks and National Platforms',
      paragraphs: [
        '**Viable Cities** provides the national platform and intermediary infrastructure connecting municipalities, national agencies and wider transition actors. Rather than acting simply as another programme participant, it provides continuity across the different governance and implementation functions of the Swedish model.',
        'Within the platform, the **Coordination Function (Samordningsfunktionen)** provides dedicated intermediary capacity for analysis, facilitation, coordination and learning. It helps identify recurring municipal needs and governance gaps, supports interaction between municipalities and national agencies, and feeds experience into subsequent Climate City Contract cycles. The six participating national agencies also use joint action planning to connect their commitments with their mandates, programmes and policy instruments.',
      ],
      enabledSummary:
        'The combination of a national platform, recurring governance process and intermediary function creates a route for local experience to inform national coordination and for national developments to connect back to cities. The opportunity is sustaining this intermediary capacity and strengthening how implementation evidence translates into adjustments in national support.',
    },
    {
      actionNumber: 4,
      actionThemeTitle: '• Investment Planning',
      title: 'Jointly Prioritize, Plan and Prepare Investment Portfolios',
      paragraphs: [
        'Climate City Contracts help translate shared commitments into locally owned transition priorities. Through Transition Arenas and related planning processes, municipalities and their partners organize these priorities into transition portfolios, which include interconnected actions spanning investment, policy, governance, procurement and capacity. As these portfolios mature, cities can identify their investment needs and develop investment plans for the components requiring finance. This process is still at different stages across participating municipalities, so not all Swedish cities yet have mature investment plans.',
        'Transition portfolios also provide the strategic basis for **System Demonstrators**. While Climate City Contracts address the municipality\'s wider transition, System Demonstrators focus on more bounded systemic challenges and are increasingly grounded in cities\' Climate City Contract priorities and portfolios. This helps ensure that demonstration activity contributes to the wider transition rather than operating as a standalone pilot.',
      ],
      caseStudy: {
        title: 'Case: EnergyNet’s Portfolio Approach',
        paragraphs: [
          'EnergyNet shows why transition priorities need to be organized as portfolios rather than standalone projects. Emerging as a “game-changer” intervention through **CoAction Lund\'s** work on local energy systems, EnergyNet is a decentralized local electricity network architecture that enables buildings, vehicles and local energy resources to share renewable electricity, reducing dependence on conventional grid reinforcement.',
          'Its implementation is connected to a wider set of interventions across buildings, energy infrastructure, mobility and multiple public and private actors. The portfolio approach helps identify these interdependencies and the combination of actions needed to enable the transition, while also surfacing investment needs and barriers for further preparation.',
        ],
      },
      enabledSummary:
        'Sweden has progressively connected shared political commitments with locally anchored portfolios and investment needs, creating a clearer bridge between climate governance and investment planning. The opportunity is to strengthen investment planning and preparation across municipalities with different levels of capacity and maturity, while retaining the broader systemic interventions needed to deliver the transition.',
    },
    {
      actionNumber: 5,
      actionThemeTitle: '• Finance and Implementation',
      title: 'Mobilize Finance, Shape Local Markets and Deliver Investment Portfolios',
      paragraphs: [
        'The transition portfolios developed under Climate City Contracts contain different types of interventions and therefore require different pathways to implementation and scale. Sweden is increasingly connecting three such functions: **systemic implementation through System Demonstrators**, **preparation and financing through emerging Local Climate Investment Structures**, and **aggregated demand and market shaping through initiatives such as First Mover Cities**.',
        'Sweden\'s experience shows that while debt financing through Kommuninvest is well established for creditworthy municipal investments, systemic transitions require complementary financing and implementation tools. **Local Climate Investment Structures** are being developed to bridge transition portfolios and finance, helping cities and partners package multi-asset interventions, structure investment vehicles, combine public and private capital and aggregate smaller projects into investable scale.',
        'To connect these local structures with larger pools of capital, the **Viability Fund for Cities** is being developed as an institutional intermediary connecting cities with national and international public and private capital. It is intended to perform three core functions:\n\n1. **Align**: Channel and coordinate multiple sources of capital around locally owned transition portfolios.\n2. **Co-finance**: Deploy concessional, catalytic and risk-bearing capital to unlock private and commercial investment.\n3. **Demand**: Support aggregated demand, procurement and pipeline preparation across cities.',
        'In parallel, **First Mover Cities** illustrates how Swedish municipalities can use collective market-shaping and procurement demand—in heavy transport, construction and energy—to accelerate market readiness for zero-emission solutions, showing that finance and demand aggregation must work together to scale transition solutions.',
      ],
      caseStudy: {
        title: 'Case: Local Climate Investment Frameworks (EnergyNet Use Case)',
        paragraphs: [
          'EnergyNet in Lund illustrates how a local transition intervention moves from a system demonstrator into an investable framework. By interconnecting buildings, vehicles, and renewable resources in Brunnshög, EnergyNet demonstrated decentralised power sharing.',
          'To scale across other Swedish municipalities, it is being structured through Local Climate Investment Frameworks and the Viability Fund for Cities, combining municipal assets with catalytic de-risking and private capital.',
        ],
      },
      enabledSummary:
        'Sweden is moving from individual municipal finance approaches toward structured interfaces between transition portfolios, local investment vehicles, national and international finance and market-shaping mechanisms. The opportunity is to operationalize these financing structures and prove their ability to crowd in private capital at scale.',
    },
    {
      actionNumber: 6,
      actionThemeTitle: '• Learning and Scale',
      title: 'Monitor Progress, Facilitate Learning and Adapt Joint Strategies',
      paragraphs: [
        'Climate City Contracts provide the primary framework for recurring review, learning and adaptation. Annual revisions allow municipalities and national agencies to review progress, update transition priorities and portfolios, and adjust commitments based on experience.',
        'The national platform supports horizontal learning across the 48 participating municipalities through peer exchange, shared development and joint commitments, while the Coordination Function identifies recurring implementation challenges and feeds them into national coordination and policy discussions.',
        '**System Demonstrators** function as real-world learning environments that test not only technical solutions but also regulatory, governance and financial conditions. Evidence generated through demonstrators can directly inform subsequent iterations of Climate City Contracts and policy dialogue, creating a feedback loop between local experimentation, citywide portfolios and national enabling conditions.',
      ],
      enabledSummary:
        'Sweden has created a multilevel learning system where local experimentation, citywide portfolios and national coordination inform one another through recurring cycles. The opportunity is to strengthen the links between learning and policy change, ensuring that implementation evidence systematically leads to regulatory and financial adjustments.',
    },
  ],
};

export const defaultCountryJourneys: CountryJourneyData[] = [
  swedenJourneyDefaultData,
  {
    order: 2,
    countryId: 'brazil',
    countryName: 'Brazil',
    flag: '🇧🇷',
    status: 'Coming Soon',
    isReady: false,
    tagline: '',
    summary: '',
    keyMechanisms: [],
    cardImage: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=800&q=80',
    themeColor: '#5d8d8b',
    headerSubtitle: '• Brazil Overview',
    headerTitle: "Brazil's Journey to Multilevel Climate Implementation",
    headerDescription:
      'Subnational climate governance frameworks and climate finance implementation in Brazil.',
    tabATitle: 'The Brazilian Context',
    tabASubtitle: 'Federal-Subnational Articulation and Climate Finance Windows',
    premises: [],
    contextSections: [],
    tabBTitle: 'The Multilevel Model',
    tabBSubtitle: 'Governance Structure & Action Pathways',
    modelHeading: "Brazil's Multilevel Climate Architecture",
    modelOverview: 'Content coming soon...',
    actionsHeading: "Brazil's Implementation Pathways",
    actions: [],
  },
  {
    order: 3,
    countryId: 'morocco',
    countryName: 'Morocco',
    flag: '🇲🇦',
    status: 'Coming Soon',
    isReady: false,
    tagline: '',
    summary: '',
    keyMechanisms: [],
    cardImage: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=800&q=80',
    themeColor: '#e8983c',
    headerSubtitle: '• Morocco Overview',
    headerTitle: "Morocco's Journey to Multilevel Climate Implementation",
    headerDescription:
      'Territorial climate planning and climate adaptation finance across Moroccan territories.',
    tabATitle: 'The Moroccan Context',
    tabASubtitle: 'Territorial Decentralization & Adaptation Finance',
    premises: [],
    contextSections: [],
    tabBTitle: 'The Multilevel Model',
    tabBSubtitle: 'Governance Structure & Action Pathways',
    modelHeading: "Morocco's Multilevel Climate Architecture",
    modelOverview: 'Content coming soon...',
    actionsHeading: "Morocco's Implementation Pathways",
    actions: [],
  },
];
