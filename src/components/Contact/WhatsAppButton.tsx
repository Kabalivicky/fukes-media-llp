import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  return (
    <motion.a
      href="https://wa.me/916362281003?text=Hi%2C%20I%27m%20interested%20in%20your%20VFX%20services.%20Can%20we%20discuss%20my%20project%3F"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#25D366] hover:bg-[#1ebe57] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Chat on WhatsApp"
    >
      <div className="flex items-center gap-2 pl-5 pr-5 py-3 md:pr-6">
        <MessageCircle className="w-6 h-6 fill-white" />
        <span className="hidden md:inline font-medium text-sm">Chat with us</span>
      </div>
    </motion.a>
  );
};

export default WhatsAppButton;
