import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { 
  MessageCircle, 
  X, 
  Send, 
  User, 
  Clock,
  Phone,
  Mail,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ChatBubble = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm here to help with your family law questions. How can I assist you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: message,
      isBot: false,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setMessage("");

    // Simulate bot typing
    setIsTyping(true);
    setTimeout(() => {
      const botResponses = [
        "I understand. Our family law attorneys can help with that. Would you like to schedule a consultation?",
        "That's a common concern in family law cases. We have extensive experience in this area.",
        "I recommend speaking with one of our attorneys about your specific situation. They can provide personalized guidance.",
        "We handle cases like yours regularly. Let me connect you with the right legal expert.",
        "Your situation sounds important. Our team can provide the legal support you need."
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      const botMessage = {
        id: messages.length + 2,
        text: randomResponse,
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const quickActions = [
    {
      icon: Phone,
      text: "Call Now",
      action: () => window.open('tel:904-900-1617', '_self')
    },
    {
      icon: Mail,
      text: "Send Email",
      action: () => window.open('mailto:trip@parrahamrislaw.com', '_self')
    },
    {
      icon: Calendar,
      text: "Schedule Consult",
      action: () => window.open('/contact', '_self')
    }
  ];

  const commonQuestions = [
    "How much does a divorce cost?",
    "What's the process for child custody?",
    "Do you offer payment plans?",
    "How long does adoption take?"
  ];

  return (
    <>
      {/* Chat Bubble Trigger */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-16 h-16 bg-gradient-to-br from-church-gold to-amber-500 rounded-full shadow-2xl shadow-church-gold/30 flex items-center justify-center text-white hover:shadow-golden transition-all duration-300 group"
      >
        <MessageCircle className="w-7 h-7" />
        
        {/* Pulsing Animation */}
        <motion.div
          className="absolute inset-0 rounded-full bg-church-gold/20 border-2 border-church-gold/30"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Notification Badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
        >
          <span className="text-xs font-bold text-white">1</span>
        </motion.div>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] h-[600px] max-h-[80vh] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-church-navy to-church-light-blue p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold">Parra Harris Law</h3>
                    <div className="flex items-center gap-1 text-sm text-blue-100">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      Online now
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200 flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-gray-50 to-gray-100">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl p-3 ${
                        msg.isBot
                          ? 'bg-white border border-gray-200 text-gray-800 rounded-tl-none'
                          : 'bg-gradient-to-r from-church-gold to-amber-500 text-white rounded-tr-none'
                      } shadow-sm`}
                    >
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                      <div className={`flex items-center gap-1 mt-1 text-xs ${msg.isBot ? 'text-gray-500' : 'text-amber-100'}`}>
                        <Clock className="w-3 h-3" />
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none p-3 shadow-sm">
                      <div className="flex items-center gap-1">
                        <div className="flex space-x-1">
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                            className="w-2 h-2 bg-gray-400 rounded-full"
                          />
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                            className="w-2 h-2 bg-gray-400 rounded-full"
                          />
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                            className="w-2 h-2 bg-gray-400 rounded-full"
                          />
                        </div>
                        <span className="text-xs text-gray-500 ml-2">Typing...</span>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Actions */}
              {messages.length <= 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-4 space-y-3"
                >
                  <p className="text-xs text-gray-500 text-center">Quick actions:</p>
                  <div className="flex gap-2 justify-center">
                    {quickActions.map((action, index) => (
                      <motion.button
                        key={action.text}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={action.action}
                        className="flex items-center gap-1 bg-white border border-gray-200 rounded-full px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200"
                      >
                        <action.icon className="w-3 h-3" />
                        {action.text}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Common Questions */}
              {messages.length <= 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="mt-4"
                >
                  <p className="text-xs text-gray-500 text-center mb-2">Common questions:</p>
                  <div className="space-y-2">
                    {commonQuestions.map((question, index) => (
                      <motion.button
                        key={question}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.2 + index * 0.1 }}
                        whileHover={{ x: 5 }}
                        onClick={() => setMessage(question)}
                        className="w-full text-left text-sm bg-white/80 border border-gray-200 rounded-xl p-3 hover:bg-white hover:border-church-gold/30 transition-all duration-200 text-gray-700"
                      >
                        {question}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-white">
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 border-gray-300 focus:border-church-gold focus:ring-church-gold"
                  disabled={isTyping}
                />
                <Button
                  type="submit"
                  disabled={!message.trim() || isTyping}
                  className="bg-gradient-to-r from-church-gold to-amber-500 hover:from-amber-500 hover:to-church-gold text-white px-4"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 text-center mt-2">
                We typically respond within 5 minutes
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBubble;