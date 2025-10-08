import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Tag, Users, Package, HeartCrackIcon, GavelIcon  } from "lucide-react";

const PracticeAreas = () => {
  const practices = [
    {
      icon: HeartCrackIcon,
      title: "Divorce",
      subtitle: "Comprehensive divorce legal services with compassionate guidance through difficult transitions.",
      color: "bg-white border-gray-100",
      iconColor: "text-blue-600",
      iconBg: "bg-blue-50"
    },
    {
      icon: Users,
      title: "Child Support",
      subtitle: "Ensuring fair child support arrangements that prioritize the wellbeing of your children.",
      color: "bg-white border-gray-100",
      iconColor: "text-green-600",
      iconBg: "bg-green-50"
    },
    {
      icon: GavelIcon ,
      title: "Family Law",
      subtitle: "Expert legal counsel for all family matters including marriage, adoption, and domestic issues.",
      color: "bg-white border-gray-100",
      iconColor: "text-purple-600",
      iconBg: "bg-purple-50"
    },
    {
      icon: Tag,
      title: "Custody",
      subtitle: "Protecting parental rights and securing custody arrangements in the best interest of the child.",
      color: "bg-white border-gray-100",
      iconColor: "text-red-600",
      iconBg: "bg-red-50"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const hoverVariants = {
    hover: {
      y: -5,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="py-10 bg-gradient-divine">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Practice Cards - 4 columns */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {practices.map((practice, index) => (
            <motion.div
              key={practice.title}
              variants={cardVariants}
              whileHover="hover"
              className={`${practice.color} border rounded-xl p-6 flex flex-col h-full transition-all duration-300 shadow-sm hover:shadow-md`}
            >
              {/* Icon */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={`w-12 h-12 ${practice.iconBg} rounded-lg flex items-center justify-center mb-4`}
              >
                <practice.icon className={`w-6 h-6 ${practice.iconColor}`} />
              </motion.div>

              {/* Title & Description */}
              <div className="flex-grow">
                <h3 className="text-lg font-bold text-gray-900 mb-3 tracking-wide">
                  {practice.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed font-light">
                  {practice.subtitle}
                </p>
              </div>

              {/* Learn More Link */}
              <motion.div
                whileHover={{ x: 3 }}
                className="mt-4 pt-4 border-t border-gray-100"
              >
                <button className="text-xs text-gray-500 hover:text-gray-700 font-medium transition-colors duration-200 flex items-center group">
                  Learn More
                  <ArrowRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" />
                </button>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PracticeAreas;