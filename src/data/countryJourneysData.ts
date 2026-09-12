import { CountryJourneyData } from '../types/countryJourney';

export const swedenJourneyDefaultData: CountryJourneyData = {
  order: 1,
  countryId: 'sweden',
  countryName: 'Sweden',
  flag: '🇸🇪',
  status: 'Available',
  isReady: true,
  tagline: 'Sweden: An Evolving Mission-Oriented Approach to Urban Climate Transition',
  summary: 'Showcasing how Viable Cities, Climate City Contract 2030, the Coordination Function, and System Demonstrators form an interconnected multilevel delivery system spanning 48 municipalities and 6 national agencies.',
  keyMechanisms: [
    'Viable Cities Platform',
    'Climate City Contract 2030',
    'System Demonstrators',
    'EnergyNet Local Energy',
    'Viability Fund for Cities',
  ],
  cardImage: 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?auto=format&fit=crop&w=800&q=80',
  themeColor: '#3B877E',

  headerSubtitle: '• Sweden Deep Dive',
  headerTitle: 'Sweden’s Multilevel Governance and Implementation Journey',
  headerDescription:
    'An in-depth analysis of Sweden’s evolving mission-oriented innovation ecosystem, demonstrating how municipal autonomy, recurring political contracts, system demonstrators, and emerging local investment structures connect into a continuous multilevel delivery architecture.',

  tabATitle: 'The Swedish Context',
  tabASubtitle: 'An Evolving Mission-Oriented Approach to Urban Climate Transition',
  premisesHeading: 'Two Central Premises of Sweden’s Multilevel Journey',
  premises: [
    {
      number: 1,
      title: '1) No Actor Can Deliver the Transition Alone',
      description:
        'No single actor or level of government can deliver the transition alone. Municipalities can act as a “gathering force”, connecting their own mandates with businesses, utilities, property owners and citizens whose decisions are also necessary for transition.',
    },
    {
      number: 2,
      title: '2) Finance Follows Governance',
      description:
        'Finance becomes more effective when the governance and implementation systems needed to organize collective action are in place. Political direction, local ownership, coordination and credible portfolios create the conditions for financing needs to become clearer and for finance actors to engage.',
    },
  ],

  contextSections: [
    {
      title: 'An Evolving, Iterative Multilevel Climate Action Model',
      paragraphs: [
        "Sweden's multilevel climate action model has evolved iteratively, as successive stages of climate action exposed new financing, implementation and coordination challenges and opportunities. This evolution has been shaped by strong municipal autonomy, a well-developed research and innovation system, established municipal financing capacity and a governance culture that supports experimentation and learning across institutional boundaries.",
      ],
    },
    {
      title: 'Municipalities as a "Gathering Force"',
      paragraphs: [
        'Swedish municipalities have substantial responsibility for systems central to climate transition, including spatial planning, infrastructure, municipal companies, procurement and investment. Yet many regulatory, financial and infrastructure conditions are determined nationally or at European level, while businesses, utilities, property owners and citizens control important assets and decisions.',
        'A central premise of the Swedish approach is therefore that no single actor or level of government can deliver the transition alone. Municipalities can instead act as a “gathering force”, connecting their own mandates with actors whose decisions are also necessary for transition. This has encouraged a shift from traditional municipal governance toward more network-based, multilevel forms of governance and coordination.',
      ],
    },
    {
      title: 'Viable Cities: A National Platform Orchestrating the Swedish Ecosystem',
      paragraphs: [
        "Sweden's multilevel model developed through its mission-oriented innovation ecosystem. Viable Cities was established in 2017 and progressively brought municipalities, national agencies, research institutions, businesses and civil society around the mission of climate-neutral cities by 2030. Rather than attempting national scale immediately, the programme developed approaches with pioneer municipalities",
      ],
      bulletPoints: [
        { label: '9 Pioneer Municipalities', text: 'in 2019' },
        { label: '23 Municipalities', text: 'in 2021' },
        { label: '48 Municipalities', text: 'in 2024 (representing approximately half of Sweden\'s total population)' },
      ],
    },
    {
      title: 'Climate City Contracts: Integrating Climate Action into Coordination and Planning Process',
      paragraphs: [
        "As participation grew, experience demonstrated that a shared mission needed to be translated into durable political commitments, locally owned transition processes and continuous national–local coordination. Climate City Contract 2030 along with Transition Arenas and later Samordningsfunktionen (the Coordination Function) developed within this context. Importantly, the emerging governance process was designed to interact with municipalities' ordinary planning, budgeting and political cycles and to be reviewed and renewed over time, rather than becoming a parallel climate-governance structure.",
        "The process has also helped national agencies identify how their programmes, policy instruments and funding calls can be better coordinated with municipal implementation needs and with one another.",
      ],
    },
    {
      title: 'System Demonstrators: Collaborative Implementation Environments',
      paragraphs: [
        "Sweden’s work on System Demonstrators predates the first Climate City Contract and developed from earlier experience with innovation and pilots. A recurring challenge was that pilots could produce results without a clear pathway towards wider implementation and scale. This experience also highlighted that technology alone was insufficient when policy, finance, business models and other conditions shaped implementation.",
        "System Demonstrators were developed to bring multiple actors and interventions together around bounded, real-world transition challenges and coordinated portfolios of action. Examples in Lund and Stockholm demonstrate this approach across areas including energy, mobility and transport. From 2021 onwards, System Demonstrators were progressively connected to the wider Climate City Contract process.",
      ],
    },
    {
      title: 'Bridging the Financing Gap: Local Climate Investment Structures & Viability Fund',
      paragraphs: [
        "As these governance and delivery approaches matured, they exposed a further gap between transition priorities and finance. Urban transition portfolios can involve multiple owners, different risk and maturity profiles and enabling interventions that are not themselves investable. Sweden already has strong municipal borrowing capacity through Kommuninvest, but conventional debt does not by itself provide project preparation, portfolio structuring, catalytic capital or coordination across actors and assets. This has led to emerging work on Local Climate Investment Structures, including learning from the EnergyNet use case, to better connect locally owned transition priorities with investment and finance.",
        "This evolution reflects a second core principle emphasized by Viable Cities: finance follows governance. This does not mean that finance only enters after governance is complete. Rather, political direction, local ownership, coordination and credible portfolios create the conditions for financing needs to become clearer and for finance actors to engage. The financing challenge is therefore also a governance and implementation challenge: connecting actors, priorities, investment planning, finance and procurement into a coherent system.",
        "This thinking has informed the emerging Viability Fund for Cities, intended to strengthen connections between systemic urban transformation, local investment and national and international finance. In parallel, work on aggregated demand and market shaping, including First Mover Cities, reflects recognition that finance alone is insufficient for scale: cities and other urban actors can also use coordinated purchasing and credible demand signals to help create markets for transition solutions.",
        "Part B examines the mechanisms that emerged through this evolution and how they interact across the Toolkit's six Actions.",
      ],
    },
  ],

  tabBTitle: 'The Multilevel Model',
  tabBSubtitle: 'Architecture Diagram & 6 Multilevel Governance Actions',
  modelHeading: 'Sweden’s Multilevel Climate Governance and Implementation Model',
  modelOverview:
    'Sweden’s experience brings together mechanisms at different stages of maturity. Viable Cities, Climate City Contract 2030, the Coordination Function and System Demonstrators are established components, while Local Climate Investment Structures, the Viability Fund for Cities and stronger aggregated-demand and finance interfaces are being developed. The diagram above shows how these programs form a continuous multilevel implementation system. \n\nBelow sections describe how Sweden has embarked on the 6 Actions as part of its multilevel climate finance and implementation journey.',
  modelDiagramNote:
    'The diagram below illustrates how these programs form a continuous multilevel implementation system. Click on the image or the Fullscreen button to zoom and pan.',
  diagramImageUrl: '/sweden-model-architecture.png',
  diagramImageAlt: 'Sweden’s Multilevel Climate Governance and Implementation Architecture',

  actionsHeading: "Sweden's Journey Across the 6 Actions",
  actionsSubtitle: "Below sections describe how Sweden has embarked on the 6 Actions as part of its multilevel climate finance and implementation journey.",
  actions: [
    {
      actionNumber: 1,
      actionThemeTitle: '• Shared Commitments',
      title: 'Develop Shared Commitments, Political Alignment and Ownership',
      paragraphs: [
        'Climate City Contract 2030 provides the recurring process through which municipalities, national agencies and Viable Cities establish shared direction and commitments. The contracts are voluntary rather than legally binding and are renewed through successive cycles of review, learning and political recommitment. Municipalities retain locally adapted pathways, while national agencies and Viable Cities make complementary commitments around enabling conditions, coordination and support.',
        'At local level, Transition Arenas extend ownership of climate action beyond municipal government, bringing public, private, academic and civic actors together to co-create transition priorities and portfolios. More recently, Joint Commitments have enabled groups of municipalities to work collectively on recurring challenges—including governance, climate investment and procurement—rather than addressing them city by city.',
      ],
      enabledSummary:
        "Sweden has expanded the initiative from nine municipalities in 2019 to 48 municipalities, representing approximately half the country's population, while retaining locally owned transition processes. The opportunity is to embed commitments into ordinary budgeting and investment processes so they endure beyond programme and political cycles.",
    },
    {
      actionNumber: 2,
      actionThemeTitle: '• Enabling Environments',
      title: 'Strengthen Enabling Environments for Climate Investment',
      paragraphs: [
        "Sweden's approach illustrates a continuous process of assessing enabling-environments. Climate City Contracts and Transition Arenas have surfaced implementation barriers and needs, while the Coordination Function identifies recurring governance and finance gaps across municipalities.",
        'System Demonstrators deepen this diagnostic function through real-world implementation. They examine key barriers and transformation potential across governance, regulation, finance and business models, infrastructure, behaviour and technology, allowing cities and partners to understand not only whether an intervention works but what surrounding conditions must change for systemic transformation to occur.',
      ],
      enabledSummary:
        'Barriers identified through local experience can become inputs into subsequent portfolios, coordination and policy discussions. The opportunity is converting dispersed implementation evidence into sufficiently systematic information that national actors can act upon.',
    },
    {
      actionNumber: 3,
      actionThemeTitle: '• Institutionalize MLG',
      title: 'Establish Multilevel Platforms for Coordinated Investment',
      paragraphs: [
        'Viable Cities provides the national platform and intermediary infrastructure connecting municipalities, national agencies and wider transition actors. Rather than acting simply as another programme participant, it provides continuity across the different governance and implementation functions of the Swedish model.',
        'Within the platform, the Coordination Function provides dedicated intermediary capacity for analysis, facilitation, coordination and learning. It helps identify recurring municipal needs and governance gaps, supports interaction between municipalities and national agencies, and feeds experience into subsequent Climate City Contract cycles. The six participating national agencies also use joint action planning to connect their commitments with their mandates, programmes and policy instruments.',
      ],
      enabledSummary:
        'The combination of a national platform, recurring governance process and intermediary function creates a route for local experience to inform national coordination and for national developments to connect back to cities. The opportunity is sustaining this intermediary capacity and strengthening how implementation evidence translates into adjustments in national support.',
    },
    {
      actionNumber: 4,
      actionThemeTitle: '• Plan Investments',
      title: 'Jointly Plan and Prepare Climate Investment Portfolios',
      paragraphs: [
        "Climate City Contracts help translate shared commitments into locally owned transition priorities. Through Transition Arenas and related planning processes, municipalities and their partners organize these priorities into transition portfolios, which include interconnected actions spanning investment, policy, governance, procurement and capacity. As these portfolios mature, cities can identify their investment needs and develop investment plans for the components requiring finance. This process is still at different stages across participating municipalities, so not all Swedish cities yet have mature investment plans.",
        "Transition portfolios also provide the strategic basis for System Demonstrators. While Climate City Contracts address the municipality's wider transition, System Demonstrators focus on more bounded systemic challenges and are increasingly grounded in cities' Climate City Contract priorities and portfolios. This helps ensure that demonstration activity contributes to the wider transition rather than operating as a standalone pilot. System Demonstrators’ role in implementing these portfolios and creating pathways to finance and scale is discussed under Action 5.",
      ],
      caseStudy: {
        title: 'EnergyNet’s Portfolio Approach',
        paragraphs: [
          'EnergyNet shows why transition priorities need to be organized as portfolios rather than standalone projects. EnergyNet is a decentralized local electricity network architecture that enables buildings, vehicles and local energy resources to share renewable electricity, reducing dependence on conventional grid reinforcement. It was identified as a potential system gamechanger within CoAction Lund’s work on local energy systems. Its implementation is connected to a wider set of interventions across buildings, energy infrastructure, mobility and multiple public and private actors. The portfolio approach helps identify these interdependencies and the combination of actions needed to enable the transition, while also surfacing investment needs and barriers for further preparation.',
        ],
      },
      enabledSummary:
        'Sweden has progressively connected shared political commitments with locally anchored portfolios and investment needs, creating a clearer bridge between climate governance and investment planning. The opportunity is to strengthen investment planning and preparation across municipalities with different levels of capacity and maturity, while retaining the broader systemic interventions needed to deliver the transition.',
    },
    {
      actionNumber: 5,
      actionThemeTitle: '• Mobilize Finance & Delivery',
      title: 'Mobilize Finance, Shape Local Markets and Deliver Investment Portfolios',
      paragraphs: [
        'The transition portfolios developed under Climate City Contracts contain different types of interventions and therefore require different pathways to implementation and scale. Sweden is increasingly connecting three such functions: systemic implementation through System Demonstrators, preparation and financing through emerging Local Climate Investment Structures, and aggregated demand and market shaping to support wider uptake.',
        'System Demonstrators provide a mechanism for implementing transition portfolios systemically. They build on earlier experiences with conventional pilots, which often tested individual solutions without addressing the wider conditions needed for transformation and scale. System Demonstrators instead bring multiple actors together around a defined transition challenge to implement an interconnected portfolio of interventions across governance, regulation, finance, infrastructure, behaviour, technology and markets. Their methodology combines mission-setting, system mapping, identification of structural barriers and transformation potential, identification of a system game changer, and portfolio implementation, supported throughout by continuous orchestration.',
        "Sweden's System Demonstrators in Lund and Stockholm show this approach in practice. Crucially, not every intervention within a demonstrator needs to become an investable project. Implementation can instead reveal where specific investment opportunities exist, what financing or enabling barriers prevent them from scaling, and where changes to policy or markets are also required. Investment pipelines can emerge from the wider portfolio of systemic interventions rather than defining that portfolio itself.",
        'This creates the rationale for emerging Local Climate Investment Structures. These are intended to turn suitable components of transition portfolios into prepared investments by combining locally anchored governance with project preparation, risk and financing structuring, capital matching and reinvestment.',
        'Importantly, local climate investment structures can be delivered through municipal balance sheets, public banks, funds, trusts, SPVs, bonds or delegated managers depending on local circumstances. Cities would retain ownership of priorities and investment decisions, while national-platform coordination could connect multiple local structures with policy, finance and scaling support.',
        'Sweden already has a strong foundation for conventional municipal finance through Kommuninvest, which provides long-term pooled municipal debt. The emerging investment architecture is intended to complement this strength by addressing functions that debt alone does not provide, including early-stage preparation, catalytic or risk-bearing capital, portfolio structuring and coordination across multiple actors. A stronger interface between Kommuninvest, Viable Cities and locally anchored climate investment structures is therefore being explored.',
        'The Viability Fund for Cities seeks to connect systemic implementation with finance, demand and wider scaling. Its architecture combines three reinforcing functions:\n\n1) ALIGN, focused on aligning funders, programmes and implementation partners around common System Demonstrators principles;\n2) CO-FINANCE, mobilizing catalytic capital to help scale opportunities emerging from System Demonstrators, transition portfolios and local climate investment structures; and\n3) DEMAND, connecting these efforts with aggregated demand and market shaping.',
        'Finally, aggregated demand and market shaping initiatives emerging in Sweden provide a complementary route to scale. Ongoing work with First Mover Cities brings cities and other actors across urban value chains together to articulate shared needs, engage suppliers early and advance coordinated procurement and purchasing. The aim is to create more credible demand signals that can give suppliers greater certainty to invest in and scale low-carbon solutions. These approaches are also being explored in connection with System Demonstrators, where a working hypothesis is that demonstrators could generate evidence and help de-risk solutions for wider adoption. Earlier visibility of aggregated, credible demand could also help identify which solutions have potential for demonstration, financing and scale.',
      ],
      caseStudy: {
        title: 'EnergyNet: illustrating the need for Local Climate Investment Structures in Sweden',
        paragraphs: [
          'EnergyNet shows how systemic implementation can generate investment needs that cannot be organized as a single project. Scaling local energy systems requires coordinated investment across buildings, utilities, grids, storage and mobility, involving multiple public and private owners. Costs, revenues and resilience benefits accrue to different actors, while investments have different maturity, risk and return profiles. Some investments may be able to access conventional finance, while others require preparation, guarantees or catalytic capital.',
          'This is the need Local Climate Investment Structures are intended to address. In Sweden, these structures are being developed to organize and finance interconnected investments spanning multiple owners, assets and financing needs. EnergyNet is being used as a practical case to develop this emerging approach, including how investments can be prepared, coordinated and matched with appropriate capital.',
          'While EnergyNet is a use case for the Swedish local climate investment approach, the underlying functions – i.e., coordinating multiple actors and assets, preparing investments and matching different financing needs with appropriate sources of capital – can be adapted to other sectors and contexts. For example, locally anchored water funds in Quito, Bogotá and Nairobi illustrate different institutional approaches to coordinating stakeholders and finance around shared water-system priorities.',
        ],
      },
      enabledSummary:
        'Sweden is beginning to connect systemic implementation, investment preparation, finance and market demand rather than treating them as separate processes. The key opportunity is now to strengthen these interfaces while maintaining local ownership and ensuring that finance supports the wider transition portfolio rather than narrowing it to standalone bankable projects.',
    },
    {
      actionNumber: 6,
      actionThemeTitle: '• Monitor & Learn',
      title: 'Learn, Strengthen Capacities and Scale',
      paragraphs: [
        'Peer learning and collective capacity building have been central to how the Swedish model has expanded. Rather than expecting every municipality to develop transition capabilities independently, Viable Cities creates recurring spaces for cities to learn from one another and jointly develop approaches to shared challenges. Transition Arenas (discussed in Action 1) provide spaces for exchange, learning and joint problem-solving, while Joint Commitments enable groups of cities to develop approaches around common priorities and progress from different levels of readiness.',
        'The Coordination Function helps carry this learning across the wider multilevel governance system. By analysing recurring municipal needs and experiences and facilitating dialogue between cities and national agencies, it can help turn learning from individual municipalities and initiatives into inputs for wider coordination and subsequent Climate City Contract cycles. In this way, learning can move both horizontally between cities and vertically between local and national levels, rather than remaining within individual projects or municipalities.',
        'Learning is also increasingly connected to implementation and scaling. Joint Commitments are structured around Initiate, Establish and Transform, allowing cities to move from building shared understanding and capacity toward institutionalizing and scaling new approaches. System Demonstrators similarly capture learning through implementation and use it to identify institutional, investment and market pathways for wider adoption.',
        'Sweden is also extending this learning through strategic international partnerships. The System Demonstrators approach (discussed is Action 5) is structured around common principles through which governments, funders and implementation partners can align while adapting those principles to local contexts. Similarly, Viability Fund for Cities is exploring how these partnerships can connect implementation experience with aligned programmes, finance and wider scaling (discussed in Action 5).',
      ],
      enabledSummary:
        'Sweden has developed a learning architecture connecting peer exchange, intermediary coordination, implementation experience and international partnerships. The opportunity is to translate learning into transformative changes in institutional capacity, policy and finance, and to scale approaches across places.',
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
