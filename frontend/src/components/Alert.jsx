import { XMarkIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const STATUS_STYLES = {
  info: {
    bg: 'bg-blue-50 text-blue-800',
    ring: 'focus:ring-blue-400',
    hover: 'hover:bg-blue-200',
  },
  error: {
    bg: 'bg-red-50 text-red-800',
    ring: 'focus:ring-red-400',
    hover: 'hover:bg-red-200',
  },
  success: {
    bg: 'bg-green-50 text-green-800',
    ring: 'focus:ring-green-500',
    hover: 'hover:bg-green-300',
  },
  warning: {
    bg: 'bg-yellow-50 text-yellow-800',
    ring: 'focus:ring-yellow-400',
    hover: 'hover:bg-yellow-200',
  },
  neutral: {
    bg: 'bg-gray-50 text-gray-800',
    ring: 'focus:ring-gray-400',
    hover: 'hover:bg-gray-200',
  },
};

export default function Alert({ status = 'info', content, duration = 3000 }) {
  const [visible, setVisible] = useState(true);
  const style = STATUS_STYLES[status] || STATUS_STYLES.info;

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="alert"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className={`flex items-center p-4 mb-4 rounded-lg absolute top-12 z-40 right-0 shadow-lg ${style.bg}`}
        >
          <InformationCircleIcon className="w-5 h-5 shrink-0 mr-3" aria-hidden="true" />
          <div className="text-sm font-medium flex-1">{content}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
