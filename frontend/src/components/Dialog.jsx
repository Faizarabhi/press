import { motion, AnimatePresence } from "framer-motion";

export default function Dialog({ isOpen, onClose, onConfirm, title, message }) {
  const backdrop = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const modal = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 120 },
    },
    exit: { scale: 0.8, opacity: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-lg p-6 shadow-xl w-full max-w-md"
            variants={modal}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              {title || "Êtes-vous sûr ?"}
            </h2>
            <p className="mb-6 text-gray-600">
              {message || "Cette action ne peut pas être annulée."}
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded"
                onClick={onClose}
              >
                Annuler
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded"
                onClick={onConfirm}
              >
                Confirmer
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
