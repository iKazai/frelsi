import { AnimatePresence, motion } from "framer-motion";
import type { CartItem } from "../types";

interface CartDrawerProps {
  isOpen: boolean;
  cart: CartItem[];
  subtotal: number;
  onClose: () => void;
  onRemove: (index: number) => void;
}

export function CartDrawer({ isOpen, cart, subtotal, onClose, onRemove }: CartDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 z-50 bg-[#000000]"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute top-0 right-0 z-50 w-full sm:w-[400px] h-full bg-[#0A0A0A] border-l border-[#1F1F1F] p-6 flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#1A1A1A]">
                <p className="text-xs tracking-[0.2em] font-bold text-[#EDEDED]">[ PANIER ]</p>
                <button
                  onClick={onClose}
                  className="text-xs text-[#666] hover:text-[#FFF] tracking-widest focus:outline-none"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                {cart.length === 0 ? (
                  <p className="text-xs text-[#444] tracking-widest py-12 text-center">PANIER VIDE</p>
                ) : (
                  cart.map((item, index) => (
                    <div
                      key={`${item.id}-${item.size || "none"}-${item.color || "none"}-${index}`}
                      className="flex justify-between items-center text-xs border-b border-[#141414] pb-3"
                    >
                      <div className="flex items-center space-x-3">
                        {item.imageUrl ? (
                          <div className="w-12 h-12 bg-[#121212] border border-[#222] rounded flex items-center justify-center p-1 shrink-0 overflow-hidden">
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-12 bg-[#121212] border border-[#222] rounded flex items-center justify-center shrink-0">
                            <span className="text-[9px] text-[#555] font-mono">FRELSI</span>
                          </div>
                        )}
                        <div className="space-y-1">
                          <p className="text-[#EDEDED] font-medium tracking-wider text-[11px] leading-tight">
                            {item.name}
                          </p>
                          <p className="text-[#777] text-[10px]">
                            {item.color ? `COUL: ${item.color.toUpperCase()} — ` : ""}
                            {item.size ? `T: ${item.size} — ` : ""}
                            QTÉ: {item.quantity}
                          </p>
                          <p className="text-[#AAA] font-mono">{(item.price * item.quantity).toFixed(2)} EUR</p>
                        </div>
                      </div>
                      <button
                        onClick={() => onRemove(index)}
                        className="text-[10px] text-[#555] hover:text-[#999] tracking-widest focus:outline-none"
                      >
                        [ SUPPR ]
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-[#1A1A1A] space-y-4">
              <div className="flex justify-between items-center text-xs tracking-widest">
                <span className="text-[#666]">SOUS-TOTAL :</span>
                <span className="text-[#FFF] font-semibold">{subtotal.toFixed(2)} EUR</span>
              </div>
              <p className="text-[9px] text-[#444] tracking-wider leading-tight">
                FRAIS D'EXPÉDITION CALCULÉS À L'ÉTAPE STRIPE CHECKOUT.
              </p>
              <button
                disabled={cart.length === 0}
                onClick={() => alert("Redirection vers Stripe Checkout API...")}
                className="w-full py-3.5 bg-[#EDEDED] text-[#000] text-xs font-semibold tracking-[0.2em] hover:bg-[#FFF] disabled:opacity-30 disabled:cursor-not-allowed transition-all focus:outline-none"
              >
                COMMANDER
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
