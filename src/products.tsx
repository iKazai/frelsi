import type { Product } from "./types";

const BASE = import.meta.env.BASE_URL;

export const PRODUCTS: Product[] = [
  {
    id: "cd-album",
    sku: "ALB-001",
    name: "ALBUM PHYSIQUE [ÉDITION NOIRE]",
    price: 18.0,
    description: "Boîtier jewel case sérigraphié. Livret 16 pages, paroles brutes et photographies argentiques. Enregistrement original masterisé haute fidélité. Tirage unique.",
    hasSizes: false,
    stock: 24,
    imageUrl: `${BASE}assets/images/items/jaquette.jpg`,
  },
  {
    id: "tee-merch",
    sku: "TEE-002",
    name: "T-SHIRT MERCH [HEAVYWEIGHT]",
    price: 45.0,
    description: "Coton lourd 260 GSM. Coupe boxy brute, col serré monté. Sérigraphie monochrome recto/verso haute densité avec signature graphique FRELSI.",
    hasSizes: true,
    stock: { S: 4, M: 12, L: 0, XL: 6 },
    imageUrl: `${BASE}assets/images/items/tshirt-noir-avant.png`,
    hasColorSelection: true,
    colorVariants: [
      {
        color: "noir",
        view: "avant",
        url: `${BASE}assets/images/items/tshirt-noir-avant.png`,
        label: "NOIR — RECTO",
      },
      {
        color: "noir",
        view: "dos",
        url: `${BASE}assets/images/items/tshirt-noir-dos.png`,
        label: "NOIR — VERSO",
      },
      {
        color: "blanc",
        view: "avant",
        url: `${BASE}assets/images/items/tshirt-blanc-avant.png`,
        label: "BLANC — RECTO",
      },
      {
        color: "blanc",
        view: "dos",
        url: `${BASE}assets/images/items/tshirt-blanc-dos.png`,
        label: "BLANC — VERSO",
      },
    ],
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
        <text x="50" y="210" fill="#666" fontSize="8" fontFamily="monospace" letterSpacing="1">SERIE 001/200</text>
      </svg>
    ),
  },
  {
    id: "pinz-frelsi",
    sku: "PIN-004",
    name: "PIN'S ÉMAILLÉ [LOGO FRELSI]",
    price: 12.0,
    description: "Pin's en métal die-cast lourd avec finition nickel noir et émail rouge brillant. Double fermoir papillon au dos. Badge collector sous blister scellé.",
    hasSizes: false,
    stock: 45,
    imageUrl: `${BASE}assets/images/items/pinz.jpg`,
  },
];
