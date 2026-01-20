import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { 
  MessageCircle, 
  Phone,
  X
} from "lucide-react";

const SimpleChatBubble = () => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    {
      icon: Phone,
      text: "Call Us",
      description: "Speak directly with our team",
      action: () => window.open('tel:904-900-1617', '_self'),
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/10"
    },
    {
      icon: MessageCircle,
      text: "Message Us", 
      description: "Send us an email",
      action: () => window.open('mailto:trip@parrahamrislaw.com', '_self'),
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10"
    }
  ];

  return (
    <>
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-16 h-16 bg-gradient-to-br from-church-gold to-amber-500 rounded-full shadow-2xl shadow-church-gold/30 flex items-center justify-center text-white hover:shadow-golden transition-all duration-300"
      >
        <MessageCircle className="w-7 h-7" />
        
        <motion.div
          className="absolute inset-0 rounded-full bg-church-gold/20 border-2 border-church-gold/30"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-24 right-6 z-50 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-church-navy to-church-light-blue p-4 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg">Contact Parra Harris Law</h3>
                    <p className="text-blue-100 text-sm">We're here to help</p>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200 flex items-center justify-center"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-4 space-y-3">
                {actions.map((action, index) => (
                  <motion.button
                    key={action.text}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={action.action}
                    className="w-full flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-gray-300 bg-white hover:shadow-md transition-all duration-200 group"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                      <action.icon className="w-6 h-6" />
                    </div>
                    
                    <div className="flex-1 text-left">
                      <h4 className="font-semibold text-gray-900 group-hover:text-church-navy transition-colors duration-200">
                        {action.text}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {action.description}
                      </p>
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  Typically respond within 1 business hour
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default SimpleChatBubble;