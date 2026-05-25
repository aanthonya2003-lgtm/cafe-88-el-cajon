// ============================================================
// CAFE 88 — SINGLE SOURCE OF TRUTH
// ============================================================
// Every verified piece of business data lives here. Do not hardcode
// addresses, phone numbers, social handles, or delivery URLs anywhere
// else in the codebase. Update here, propagates everywhere.
//
// STANDING FLAGS (verified at session start):
//   🔴 Hours        — Conflicting across sources. NEVER publish. Use
//                    BUSINESS.hours.placeholder until Kevin confirms.
//   🔴 wecafe88.com — Do not link. Status unverified.
//   🔴 Yelp         — Consumer Alert active. Do not link.
//   🟡 TikTok       — Not included. Handle unverified.
//   🟡 Pricing      — Item names + descriptions only. Route to
//                    delivery platforms or phone for current prices.
// ============================================================

export const BUSINESS = {
  name: "Cafe 88",
  tagline: "Aca\u00ed Bowls \u00b7 Crepes \u00b7 Turkish Coffee",
  shortDescription:
    "Family-run caf\u00e9 in El Cajon serving organic a\u00e7a\u00ed bowls, hand-folded crepes, real Turkish coffee, and dessert worth the drive.",
  address: {
    street: "737 Jamacha Rd",
    city: "El Cajon",
    state: "CA",
    zip: "92019",
    full: "737 Jamacha Rd, El Cajon, CA 92019",
    gmaps:
      "https://www.google.com/maps/place/737+Jamacha+Rd,+El+Cajon,+CA+92019",
    lat: 32.7787,
    lng: -116.9486,
  },
  phone: {
    display: "(619) 312-1077",
    tel: "+16193121077",
    href: "tel:+16193121077",
  },
  // 🔴 STANDING FLAG — Hours conflict across sources (Sirved 10–10,
  // Joe Coffee 12–10, Yelp users 4pm open). DO NOT publish actual
  // times. Use placeholder string until Kevin confirms.
  hours: {
    placeholder: "Call to confirm",
    note: "Hours pending owner verification",
  },
  rating: {
    stars: 4.6,
    count: 231,
    healthScore: 98,
  },
  owner: "Kevin",
  catering: {
    available: true,
    serviceArea: "Throughout San Diego County",
    leadTime: "48 hours preferred for full-service orders",
  },
  payment: ["Credit", "Debit", "Apple Pay", "Google Pay"] as const,
} as const;

export const SOCIAL = {
  instagram: {
    handle: "@wecafe88",
    url: "https://www.instagram.com/wecafe88/",
    followers: 3048,
  },
  facebook: {
    handle: "/wecafe88",
    url: "https://www.facebook.com/wecafe88",
  },
  // 🟡 TikTok    — NOT included until owner confirms exact handle.
  // 🔴 Yelp      — Consumer Alert active. Do not link.
  // 🔴 Website   — wecafe88.com not verified live. Do not link.
} as const;

export const DELIVERY = {
  doordash: {
    name: "DoorDash",
    url: "https://www.doordash.com/store/cafe-88-el-cajon-799384",
    tagline: "Fast delivery \u00b7 widely available",
  },
  ubereats: {
    name: "Uber Eats",
    url: "https://www.ubereats.com/store/cafe-88/GMmqPXDaSSeL9ox29TyUWg",
    tagline: "Member perks \u00b7 Uber One eligible",
  },
  grubhub: {
    name: "Grubhub",
    url: "https://www.grubhub.com/restaurant/cafe-88-737-jamacha-road-el-cajon/1670792",
    tagline: "Pickup or delivery",
  },
} as const;

export const COLORS = {
  espresso: "#1A0F0A",
  espressoDeep: "#120A07",
  acai: "#6B3FA0",
  pistachio: "#7FB069",
  honey: "#E8A830",
  honeyBright: "#F4B842",
  cream: "#FAF6F0",
  charcoal: "#2A1F1A",
} as const;

// ============================================================
// MENU — names and descriptions only. NO PRICES.
// Toppings/composition pulled from verified Uber Eats menu.
// ============================================================
export const MENU = {
  acaiBowls: [
    {
      name: "Paradise",
      description:
        "Organic a\u00e7a\u00ed layered with granola, blueberries, strawberries, banana, and toasted coconut flakes.",
    },
    {
      name: "Hawaiian",
      description:
        "Granola, pineapple, mango, kiwi, and coconut flakes over deep-blended a\u00e7a\u00ed.",
    },
    {
      name: "Lit",
      description:
        "Granola, chocolate chip, banana, strawberry, and blueberry \u2014 indulgent and bright.",
    },
    {
      name: "Glow",
      description:
        "Granola, strawberry, blueberry, shaved almond, and chia seeds for the clean-burn morning.",
    },
    {
      name: "Power",
      description:
        "Granola, blueberry, banana, hemp seeds, chia seeds, and almonds \u2014 protein-loaded fuel.",
    },
    {
      name: "Make Your Own",
      description:
        "Build it your way \u2014 pick your base, granola, fruit, and toppings.",
    },
  ],
  crepes: [
    {
      name: "International Mix",
      description:
        "One-of-a-kind crepe with Nutella, Kinder, Lotus, Belgian white and milk chocolate, strawberry, and banana.",
    },
    {
      name: "French Style",
      description:
        "Sweet crepe filled with strawberry, banana, Nutella, KitKat, Oreos, and Kinder \u2014 topped with Belgian chocolate and hand-crushed pistachio.",
    },
    {
      name: "Nutella Pistachio",
      description:
        "Warm crepe folded over Nutella, pistachio cream, and crushed pistachios.",
    },
    {
      name: "Kinder Mini Pancakes",
      description:
        "Stack of mini pancakes draped in Kinder chocolate, hazelnut, and fresh berries.",
    },
  ],
  milkshakes: [
    {
      name: "Lotus",
      description:
        "Hand-spun Biscoff cookie-butter shake topped with whipped cream and a Lotus cookie.",
    },
    {
      name: "Pistachio",
      description:
        "Real pistachio cream blended into a thick, slow-pour shake.",
    },
  ],
  beverages: [
    {
      name: "Turkish Coffee",
      description:
        "Traditional fine-ground Turkish coffee, brewed slow and served with the foam intact.",
    },
    {
      name: "Glow Green Smoothie",
      description:
        "Spinach, kale, pineapple, mango, banana, and a touch of honey.",
    },
  ],
  desserts: [
    {
      name: "Nutella Sushi Rolls",
      description:
        "Crepe rolls filled with Nutella and fruit, sliced sushi-style.",
    },
    {
      name: "Cream Puffs",
      description:
        "Choux pastry filled with vanilla cream and dusted with sugar.",
    },
    {
      name: "Chocolate Covered Strawberries",
      description:
        "Fresh strawberries dipped in chocolate and finished with toppings.",
    },
    {
      name: "Belgian Waffles",
      description:
        "Classic Belgian waffles served warm with your choice of toppings.",
    },
  ],
} as const;

// ============================================================
// TESTIMONIALS — sourced from verified review platforms.
// Light editorial cleanup; voice and meaning preserved.
// ============================================================
export const TESTIMONIALS = [
  {
    quote:
      "Been obsessed with this coffee shop for years. Highly recommend the a\u00e7a\u00ed (make your own), Turkish coffee, crepes, and the un-beet-able.",
    author: "Verified customer",
    source: "Joe Coffee",
  },
  {
    quote:
      "A\u00e7a\u00ed bowl is so fire \u2014 best one you\u2019ll ever find. My boyfriend and I travel long distances to come back even though we no longer live in the area. The portion is huge.",
    author: "Zack F.",
    source: "Joe Coffee",
  },
  {
    quote:
      "Best quality ingredients in El Cajon. My go-to is the Paradise Bowl. I also love their smoothies and Nutella desserts.",
    author: "Beatrice F.",
    source: "Uber Eats",
  },
  {
    quote: "The best a\u00e7a\u00ed bowls in SD.",
    author: "Christina E.",
    source: "Uber Eats",
  },
  {
    quote:
      "Cafe 88 is very clean. Kevin and the team are friendly. The bowls always have fresh fruit and are loaded with goodness.",
    author: "Regular customer",
    source: "Restaurantji",
  },
  {
    quote:
      "Best crepe I\u2019ve ever had. If you\u2019re looking for a milkshake \u2014 get the Lotus.",
    author: "Verified diner",
    source: "Restaurant Guru",
  },
] as const;

export const SITE = {
  // Update SITE.url to custom domain once confirmed by owner.
  url: "https://cafe-88-el-cajon.vercel.app",
  title:
    "Cafe 88 \u2014 Aca\u00ed Bowls, Crepes & Turkish Coffee \u00b7 El Cajon",
  description:
    "Family-run caf\u00e9 in El Cajon serving organic a\u00e7a\u00ed bowls, hand-folded crepes, real Turkish coffee, and dessert worth the drive. Order pickup or delivery on DoorDash, Uber Eats, or Grubhub.",
  keywords: [
    "acai bowl El Cajon",
    "crepes El Cajon",
    "Turkish coffee San Diego",
    "Cafe 88",
    "Jamacha Road dessert",
    "milkshake El Cajon",
  ],
} as const;

export const EASING = "cubic-bezier(0.22, 1, 0.36, 1)" as const;
