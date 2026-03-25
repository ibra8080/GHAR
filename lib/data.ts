// ============================================
// GHAR Foundation - Central Data Store
// Will be replaced by Sanity CMS in Sprint 4
// ============================================

export const projects = [
  {
    id: "clean-water-project",
    image: "/images/ProjectCards1.png",
    title: "Clean Water Project",
    countryCode: "SD",
    country: "Sudan",
    category: "Water",
    raised: 12500,
    goal: 20000,
    desc: "Providing clean water access to villages in Sudan, improving health outcomes for thousands of families through solar-powered pumping stations.",
    details: "Access to clean water is one of the most fundamental human rights. In rural Sudan, thousands of families are forced to walk miles every day to fetch contaminated water, leading to widespread disease and suffering. GHAR Foundation's Clean Water Project aims to change this reality by installing solar-powered pumping stations and water purification systems in the most affected villages.",
    impact: ["5,000+ families served", "12 villages covered", "80% reduction in waterborne diseases", "200+ children returning to school"],
    gallery: ["/images/ProjectCards1.png", "/images/HeroImage1.png", "/images/HeroImage2.png"],
  },
  {
    id: "food-aid-distribution",
    image: "/images/ProjectCards2.png",
    title: "Food Aid Distribution",
    countryCode: "YE",
    country: "Yemen",
    category: "Food",
    raised: 8700,
    goal: 15000,
    desc: "Delivering essential food packages to vulnerable families in Yemen facing severe food insecurity and malnutrition.",
    details: "Yemen is facing one of the world's worst humanitarian crises, with millions of people on the brink of famine. GHAR Foundation's Food Aid Distribution program delivers monthly food packages to the most vulnerable families.",
    impact: ["1,000+ families per month", "6 distribution points across Yemen", "40% female-headed households", "Zero diversion of aid reported"],
    gallery: ["/images/ProjectCards2.png", "/images/NewsSection2.png", "/images/HeroImage2.png"],
  },
  {
    id: "medical-camps",
    image: "/images/ProjectCards3.png",
    title: "Medical Camps",
    countryCode: "SD",
    country: "Sudan",
    category: "Medical",
    raised: 6200,
    goal: 10000,
    desc: "Providing free medical care and essential medicines in refugee camps across conflict-affected regions in Sudan.",
    details: "In conflict zones, access to basic healthcare can mean the difference between life and death. GHAR Foundation deploys mobile medical teams to refugee camps and remote communities in Sudan.",
    impact: ["800+ patients per campaign", "4 medical camps per year", "300+ children vaccinated", "50+ pregnant women receiving prenatal care"],
    gallery: ["/images/ProjectCards3.png", "/images/NewsSection1.png", "/images/HeroImage1.png"],
  },
  {
    id: "education-initiative",
    image: "/images/ProjectCards4.png",
    title: "Education Initiative",
    countryCode: "YE",
    country: "Yemen",
    category: "Education",
    raised: 9800,
    goal: 18000,
    desc: "Supporting children's right to education by building and equipping schools in conflict zones across Yemen.",
    details: "Conflict has deprived millions of Yemeni children of their right to education. GHAR Foundation's Education Initiative rebuilds and equips damaged schools, trains and pays teachers' salaries.",
    impact: ["200+ children enrolled", "3 schools rebuilt and equipped", "15 teachers supported", "90% attendance rate achieved"],
    gallery: ["/images/ProjectCards4.png", "/images/HeroImage1.png", "/images/NewsSection2.png"],
  },
  {
    id: "emergency-shelter",
    image: "/images/HeroImage1.png",
    title: "Emergency Shelter",
    countryCode: "SD",
    country: "Sudan",
    category: "Shelter",
    raised: 14000,
    goal: 25000,
    desc: "Building temporary and permanent shelters for families displaced by conflict and natural disasters in Sudan.",
    details: "Displacement is one of the most devastating consequences of conflict. GHAR Foundation's Emergency Shelter program provides displaced families with safe, dignified shelter.",
    impact: ["300+ families sheltered", "50 permanent homes built", "1,200+ people protected", "100% meet humanitarian standards"],
    gallery: ["/images/HeroImage1.png", "/images/HeroImage2.png", "/images/ProjectCards1.png"],
  },
  {
    id: "winter-aid-campaign",
    image: "/images/HeroImage2.png",
    title: "Winter Aid Campaign",
    countryCode: "YE",
    country: "Yemen",
    category: "Aid",
    raised: 5500,
    goal: 12000,
    desc: "Distributing winter clothing, blankets, and heating supplies to vulnerable families in Yemen during harsh winter months.",
    details: "Yemen's winters can be bitterly cold, especially in mountainous regions, yet millions of displaced families have no warm clothing or heating.",
    impact: ["500+ families received winter kits", "2,500+ individuals protected", "Coverage across 3 governorates", "Zero cold-related deaths among beneficiaries"],
    gallery: ["/images/HeroImage2.png", "/images/NewsSection1.png", "/images/ProjectCards2.png"],
  },
];

export const news = [
  { id: 1, image: "/images/NewsSection1.png", title: "GHAR Foundation launches new water project in Sudan", excerpt: "The new water project aims to provide clean drinking water to over 5,000 families in rural Sudan through solar-powered pumping stations.", date: "March 15, 2026", year: 2026, category: "Water" },
  { id: 2, image: "/images/NewsSection2.png", title: "Food distribution campaign reaches 1,000 families in Yemen", excerpt: "Our latest food aid campaign successfully distributed emergency food packages to families in the most affected areas of Yemen.", date: "February 20, 2026", year: 2026, category: "Food" },
  { id: 3, image: "/images/ProjectCards3.png", title: "Medical camp serves 800 patients in refugee camp", excerpt: "GHAR Foundation's mobile medical team provided free consultations, medicines and emergency care to hundreds of patients.", date: "January 10, 2026", year: 2026, category: "Medical" },
  { id: 4, image: "/images/ProjectCards4.png", title: "New school opens its doors for 200 children", excerpt: "Thanks to the generous support of our donors, a new school has been built providing quality education to 200 children in conflict zones.", date: "December 5, 2025", year: 2025, category: "Education" },
  { id: 5, image: "/images/HeroImage1.png", title: "Emergency shelter project completed in Sudan", excerpt: "GHAR Foundation has successfully completed the construction of 50 permanent homes for displaced families in Sudan.", date: "November 18, 2025", year: 2025, category: "Shelter" },
  { id: 6, image: "/images/HeroImage2.png", title: "Winter aid campaign kicks off in Yemen", excerpt: "As temperatures drop, GHAR Foundation begins distributing winter kits to vulnerable families across three governorates in Yemen.", date: "October 30, 2025", year: 2025, category: "Aid" },
  { id: 7, image: "/images/NewsSection1.png", title: "GHAR Foundation receives recognition from German authorities", excerpt: "The foundation has been officially recognized by German humanitarian authorities for its transparent operations and effective aid delivery.", date: "September 12, 2025", year: 2025, category: "News" },
  { id: 8, image: "/images/NewsSection2.png", title: "Partnership signed with local organizations in Sudan", excerpt: "A new partnership agreement has been signed with three local organizations in Sudan to strengthen our presence and reach on the ground.", date: "August 3, 2025", year: 2025, category: "News" },
  { id: 9, image: "/images/ProjectCards1.png", title: "Clean water project phase 2 begins", excerpt: "Following the success of phase 1, GHAR Foundation has launched phase 2 of the clean water project, targeting 8 additional villages.", date: "July 20, 2025", year: 2025, category: "Water" },
  { id: 10, image: "/images/ProjectCards2.png", title: "Ramadan food campaign distributes 2,000 packages", excerpt: "During Ramadan 2025, GHAR Foundation distributed 2,000 food packages to families in Sudan and Yemen.", date: "March 25, 2025", year: 2025, category: "Food" },
  { id: 11, image: "/images/ProjectCards3.png", title: "Medical training program launched for local health workers", excerpt: "A new training program has been launched to build local capacity in basic healthcare delivery in remote areas of Sudan.", date: "February 14, 2025", year: 2025, category: "Medical" },
  { id: 12, image: "/images/ProjectCards4.png", title: "GHAR Foundation celebrates its first anniversary", excerpt: "One year after its founding, GHAR Foundation reflects on its achievements and looks ahead to an ambitious year of growth and impact.", date: "January 1, 2025", year: 2025, category: "News" },
];

export const stats = [
  { number: 5100, label: "Families Supported" },
  { number: 2100, label: "Donations Received" },
  { number: 12, label: "Countries Reached" },
];

export const team = [
  { name: "Ahmed Al-Rashid", role: "Executive Director", image: "/images/HeroImage1.png" },
  { name: "Sara Müller", role: "Program Manager", image: "/images/HeroImage2.png" },
  { name: "Omar Hassan", role: "Field Coordinator", image: "/images/ProjectCards1.png" },
  { name: "Lena Weber", role: "Finance Director", image: "/images/ProjectCards2.png" },
];

export const partners = [
  { name: "Partner 1", image: "/images/GahrLogo.svg" },
  { name: "Partner 2", image: "/images/GahrLogo.svg" },
  { name: "Partner 3", image: "/images/GahrLogo.svg" },
  { name: "Partner 4", image: "/images/GahrLogo.svg" },
];

export const slides = [
  { image: "/images/HeroImage1.png", title: "Sheltering Lives,\nRestoring Hope", subtitle: "German Humanitarian Relief Organization providing aid to crisis-affected regions" },
  { image: "/images/HeroImage2.png", title: "Clean Water\nFor All", subtitle: "Bringing safe drinking water to thousands of families in Sudan" },
  { image: "/images/ProjectCards1.png", title: "Fighting Hunger\nTogether", subtitle: "Delivering food aid to vulnerable families across Yemen" },
  { image: "/images/ProjectCards2.png", title: "Education\nChanges Lives", subtitle: "Supporting children's right to learn in conflict zones" },
];