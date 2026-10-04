import type { Product } from "./types";

export const PRODUCTS: Product[] = [
  {
    id: "cd-album",
    sku: "ALB-001",
    name: "ALBUM PHYSIQUE [ÉDITION NOIRE]",
    price: 18.0,
    description: "Boîtier jewel case noir mat sérigraphié. Livret 16 pages, paroles brutes et photographies argentiques. Tirage unique.",
    hasSizes: false,
    stock: 24,
    imageSvg: (
      <svg viewBox="0 0 300 300" className="w-full h-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]">
        <rect x="25" y="25" width="250" height="250" rx="4" fill="#0D0D0D" stroke="#262626" strokeWidth="2" />
        <rect x="25" y="25" width="24" height="250" fill="#141414" stroke="#262626" strokeWidth="1" />
        <line x1="37" y1="40" x2="37" y2="260" stroke="#333" strokeDasharray="3 3" />
        <circle cx="160" cy="150" r="95" fill="#050505" stroke="#1F1F1F" strokeWidth="1.5" />
        <circle cx="160" cy="150" r="70" fill="none" stroke="#171717" strokeWidth="20" opacity="0.4" />
        <circle cx="160" cy="150" r="32" fill="#0D0D0D" stroke="#262626" strokeWidth="1" />
        <circle cx="160" cy="150" r="12" fill="#000000" />
        <text x="65" y="70" fill="#666666" fontSize="9" fontFamily="monospace" letterSpacing="2">DISC.01 // MASTER</text>
        <text x="65" y="240" fill="#EDEDED" fontSize="12" fontFamily="monospace" fontWeight="bold" letterSpacing="3">00:44:12</text>
      </svg>
    ),
  },
  {
    id: "tee-merch",
    sku: "TEE-002",
    name: "T-SHIRT MERCH [HEAVYWEIGHT]",
    price: 45.0,
    description: "Coton lourd 260 GSM. Coupe boxy brute, col serré monté. Sérigraphie monochrome recto/verso haute densité.",
    hasSizes: true,
    stock: { S: 4, M: 12, L: 0, XL: 6 },
    imageSvg: (
      <svg viewBox="0 0 300 300" className="w-full h-full drop-shadow-[0_25px_45px_rgba(0,0,0,0.95)]">
        <path d="M95 55 L135 68 C145 70 155 70 165 68 L205 55 L255 105 L225 135 L200 120 L200 255 L100 255 L100 120 L75 135 L45 105 Z" fill="#111111" stroke="#262626" strokeWidth="1.5" />
        <path d="M135 68 C145 82 155 82 165 68" fill="none" stroke="#2B2B2B" strokeWidth="2.5" />
        <rect x="125" y="130" width="50" height="50" fill="none" stroke="#333" strokeWidth="1" strokeDasharray="2 2" />
        <line x1="125" y1="155" x2="175" y2="155" stroke="#EDEDED" strokeWidth="1.5" />
        <text x="130" y="150" fill="#EDEDED" fontSize="7" fontFamily="monospace">OFFLINE</text>
      </svg>
    ),
  },
  {
    id: "postcard-pack",
    sku: "POS-003",
    name: "CARTE POSTALE COLLECTOR [ARCHIVE]",
    price: 10.0,
    description: "Tirage argentique sur papier texturé 350g, dos vierge tamponné à la main. Numérotée de 001 à 200.",
    hasSizes: false,
    stock: 50,
    imageSvg: (
      <svg viewBox="0 0 300 300" className="w-full h-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]">
        <rect x="35" y="65" width="230" height="170" rx="1" fill="#0C0C0C" stroke="#262626" strokeWidth="1.5" />
        <rect x="45" y="75" width="130" height="150" fill="#050505" stroke="#1C1C1C" strokeWidth="1" />
        <line x1="45" y1="75" x2="175" y2="225" stroke="#171717" strokeWidth="1" />
        <line x1="190" y1="120" x2="250" y2="120" stroke="#2B2B2B" strokeWidth="1" />
        <line x1="190" y1="145" x2="250" y2="145" stroke="#2B2B2B" strokeWidth="1" />
        <line x1="190" y1="170" x2="250" y2="170" stroke="#2B2B2B" strokeWidth="1" />
        <rect x="225" y="75" width="25" height="30" fill="none" stroke="#333" strokeDasharray="2 2" />
      </svg>
    ),
  },
];
