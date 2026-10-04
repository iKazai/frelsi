import { motion } from "framer-motion";
import type { Product, Size } from "../types";

interface ProductDetailProps {
  product: Product;
  selectedSize: Size;
  onSelectSize: (size: Size) => void;
  onAddToCart: () => void;
  onClose: () => void;
}

export function ProductDetail({ product, selectedSize, onSelectSize, onAddToCart, onClose }: ProductDetailProps) {
  return (
    <motion.div
      key="detail-view"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="absolute inset-0 z-40 bg-[#000000] flex flex-col md:flex-row items-center justify-between p-6 md:p-16"
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 md:top-10 md:right-12 text-xs tracking-widest text-[#777] hover:text-[#FFF] transition-colors focus:outline-none z-50"
      >
        [ FERMER ✕ ]
      </button>

      <div className="w-full md:w-1/2 h-[35vh] md:h-full flex items-center justify-center">
        <div className="w-[200px] h-[200px] md:w-[340px] md:h-[340px]">
          {product.imageSvg}
        </div>
      </div>

      <div className="w-full md:w-1/2 h-auto md:h-full flex flex-col justify-center max-w-md space-y-6">
        <div className="space-y-2">
          <p className="text-[10px] tracking-[0.3em] text-[#555]">RÉFÉRENCE : {product.sku}</p>
          <h1 className="text-sm md:text-base font-bold tracking-[0.15em] text-[#FFF]">{product.name}</h1>
          <p className="text-xs md:text-sm text-[#888] tracking-widest">{product.price.toFixed(2)} EUR</p>
        </div>

        <p className="text-xs leading-relaxed text-[#777] border-l border-[#222] pl-3">{product.description}</p>

        {product.hasSizes && (
          <div className="space-y-2">
            <p className="text-[10px] tracking-[0.2em] text-[#555]">TAILLE :</p>
            <div className="flex space-x-2">
              {(["S", "M", "L", "XL"] as Size[]).map((size) => {
                const stockCount = (product.stock as Record<Size, number>)[size];
                const isSoldOut = stockCount <= 0;
                const isSelected = selectedSize === size;

                return (
                  <button
                    key={size}
                    disabled={isSoldOut}
                    onClick={() => onSelectSize(size)}
                    className={`w-10 h-10 text-xs border transition-all flex items-center justify-center ${
                      isSelected
                        ? "border-[#EDEDED] text-[#FFF] bg-[#141414]"
                        : isSoldOut
                        ? "border-[#1A1A1A] text-[#333] cursor-not-allowed line-through"
                        : "border-[#262626] text-[#777] hover:border-[#444] hover:text-[#BBB]"
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <button
          onClick={onAddToCart}
          className="w-full py-3.5 bg-[#EDEDED] text-[#000] text-xs font-semibold tracking-[0.2em] hover:bg-[#FFF] active:scale-[0.99] transition-all focus:outline-none"
        >
          AJOUTER AU PANIER
        </button>
      </div>
    </motion.div>
  );
}
