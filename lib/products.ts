export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  desc: string;
  fullDesc?: string;
  specs?: string[];
}

export const products: Product[] = [
  {
    id: "shadow-star-deck",
    name: "Shadow Star Deck",
    price: 89,
    category: "Decks",
    image: "/images/products/Skateboard_deck_with_wheels_202605021306.jpeg",
    desc: '8.25" maple pressed',
    fullDesc: "Designed for technical street skating, the Shadow Star features our signature steep kick and deep concave for maximum flip control. Hand-pressed in California from 7 plies of premium Canadian Maple.",
    specs: ["7-Ply Grade A Maple", "Medium-High Concave", "Steep Nose & Tail", "Signature Heat-Transfer Graphic"]
  },
  {
    id: "street-rider-pro",
    name: "Street Rider Pro",
    price: 79,
    category: "Decks",
    image: "/images/products/Skateboard_leaning_against_fence_202605021308.jpeg",
    desc: '8.0" Canadian maple',
    fullDesc: "The versatile choice for both park and street. A slightly flatter concave allows for more comfortable foot placement during long sessions, while maintaining the pop you expect from a pro-tier deck.",
    specs: ["7-Ply Cold Pressed Maple", "Medium Concave", "Standard Shape", "Eco-Friendly Dyes"]
  },
  {
    id: "concrete-wave-deck",
    name: "Concrete Wave Deck",
    price: 95,
    category: "Decks",
    image: "/images/products/Skateboard_in_dark_studio_202605021308.jpeg",
    desc: '8.5" seven-ply',
    fullDesc: "Built for speed and heavy impact. The Concrete Wave is our widest deck, providing a stable platform for transition skating and high-speed street lines. Reinforced with a secret epoxy resin for extra durability.",
    specs: ["Resin-7 Technology", "High Pop Formula", "Wide 8.5\" Platform", "Impact Support Zones"]
  },
  {
    id: "urban-flow-trucks",
    name: "Urban Flow Trucks",
    price: 54,
    category: "Hardware",
    image: "/images/products/Hand_holding_skateboard_wheel_202605021302.jpeg",
    desc: '5.25" hollow kingpin',
    fullDesc: "Ultra-lightweight and incredibly responsive. Urban Flow trucks feature a hollow kingpin and axle to shed weight without sacrificing strength. The low-profile geometry prevents kingpin hang-ups during grinds.",
    specs: ["Hollow Kingpin & Axle", "Grade 8 Steel", "92A Bushings", "Polished Finish"]
  },
  {
    id: "gold-rush-wheels",
    name: "Gold Rush Wheels",
    price: 38,
    category: "Wheels",
    image: "/images/products/Skateboard_on_urban_sidewalk_fence_202605021306.jpeg",
    desc: "52mm / 99A durometer",
    fullDesc: "Fast, flat-spot resistant, and perfectly balanced. Our 99A urethane formula provides the ideal blend of grip and slide, making these the perfect all-around street wheel.",
    specs: ["High Rebound Urethane", "Anti-Flatspot Formula", "Classic Street Shape", "52mm Diameter"]
  },
  {
    id: "complete-starter",
    name: "Skateboard & Co Complete",
    price: 145,
    category: "Complete",
    image: "/images/products/Person_holding_skateboard_walking_202605021308.jpeg",
    desc: "Ready to shred",
    fullDesc: "The ultimate out-of-the-box experience. Featuring our pro-grade deck, Urban Flow trucks, and Gold Rush wheels, this complete is built to the same standards as our individual components. No assembly required.",
    specs: ["Pre-Assembled", "ABEC-7 Bearings", "Grip Tape Included", "Pro-Tier Components"]
  },
];
