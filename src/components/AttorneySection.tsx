import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Languages, Star, Calendar } from "lucide-react";
import PaolaImage from "@/assets/PaolaParra.png";
import LynnImage from "@/assets/Lynn.png";
import JohnImage from "@/assets/John.png";
import PJImage from "@/assets/Priscilla.png";

const AttorneysSection = () => {
  const attorneys = {
    featured: {
      name: "Paola Parra Harris, Esquire",
      title: "Managing Partner",
      image: PaolaImage,
      bio: "Mrs. Parra Harris is fully bilingual and a large percentage of her clientele are Spanish speaking only.  She has been practicing family trial law since 1998 after practicing insurance defense litigation in Atlanta, Georgia since 1996 and later in Jacksonville.",
      specialties: ["Florida Family Law Inns of Court – Barrister", "Leadership Florida – NE Region Council", "Sulzbacher Center – Board of Directors", "Jacksonville Bar Association – Naturalization Committee","Jax Icemen – Community Partner and  Women in Business Sponsor"],
      link: "/attorneys/paola-parra-harris"
    },
    team: [
      {
        name: "Lynn Salvatore, Esquire",
        title: "Senior Associate",
        image: LynnImage,
        bio: "Specializing in high-conflict divorce and asset division with a focus on protecting client interests through meticulous legal strategy and negotiation.",
        link: "/attorneys/lynn-salvatore"
      },
      {
        name: "John Joseph Clark, Esquire",
        title: "Senior Associate",
        image: JohnImage,
        bio: "Experienced in family mediation and collaborative law with a track record of achieving favorable settlements while minimizing courtroom conflict.",
        link: "/attorneys/john-clark"
      },
      {
        name: "Priscilla 'PJ' Justianno, Esquire",
        title: "Associate Attorney",
        image: PJImage,
        bio: "Dedicated to child advocacy and support matters, bringing fresh perspective and vigorous representation to protect families' futures.",
        link: "/attorneys/pj-justianno"
      }
    ]
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
           <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-church-navy mb-4 leading-tight">
             Meet Our Attorneys
           </h2>
          <p className="text-xl leading-relaxed font-light mx-auto">
            Meet our dedicated team of experienced family law professionals committed to protecting your family's future with compassion and expertise.
          </p>
        </motion.div>

        {/* Featured Attorney - Paola Parra Harris */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="order-2 lg:order-1">
              <div className="flex items-center mb-4">
                <Award className="w-6 h-6 text-church-gold mr-2" />
                <span className="text-sm font-semibold text-church-gold uppercase tracking-wide">Managing Partner</span>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-bold text-church-navy mb-4">
                {attorneys.featured.name}
              </h3>

              <p className="text-lg leading-relaxed font-light mb-6">
                {attorneys.featured.bio}
              </p>

              {/* Specialties */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-church-navy mb-3">Community Involvement & Leadership</h4>
                <div className="flex flex-wrap gap-2">
                  {attorneys.featured.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="bg-church-light-blue text-church-navy px-3 py-1 rounded-full text-sm leading-relaxed font-light"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="church-button">
                  Learn More About Paola
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button variant="outline" className="church-button-outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Consultation
                </Button>
              </div>
            </div>

            {/* Image */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative"
              >
                <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-lg overflow-hidden border-4 border-white shadow-divine">
                  <img 
                    src={attorneys.featured.image} 
                    alt={attorneys.featured.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Decorative Element */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-church-gold rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-church-light-blue rounded-full opacity-30"></div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Team Attorneys */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-church-navy mb-4">
              Our Legal Team
            </h3>
            <p className="text-lg text-muted-foreground">
              Dedicated associates bringing diverse expertise to your family law needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {attorneys.team.map((attorney, index) => (
              <motion.div
                key={attorney.name}
                variants={itemVariants}
                whileHover="hover"
                className="feature-card text-center group"
              >
                {/* Attorney Image */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 border-4 border-white shadow-soft group-hover:shadow-golden transition-all duration-300"
                >
                  <img 
                    src={attorney.image} 
                    alt={attorney.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Attorney Info */}
                <div className="mb-4">
                  <h4 className="text-xl font-bold text-church-navy mb-1">
                    {attorney.name}
                  </h4>
                  <p className="text-church-gold font-semibold text-sm mb-3">
                    {attorney.title}
                  </p>
                  <p className="text-sm leading-relaxed font-light max-w-3xl mx-auto">
                    {attorney.bio}
                  </p>
                </div>

                {/* View Portfolio Link */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="ghost"
                    className="text-church-gold hover:text-church-navy hover:bg-church-gold/10 font-semibold py-2 px-4 rounded-lg transition-all duration-300 group/btn"
                  >
                    View Portfolio
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-divine rounded-2xl p-8 shadow-soft">
            <h3 className="text-2xl md:text-3xl font-bold text-church-navy mb-4">
              Ready to Discuss Your Case?
            </h3>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Schedule a confidential consultation with our bilingual legal team to discuss your family law matters.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="church-button text-base py-3 px-8">
                <Calendar className="w-5 h-5 mr-2" />
                Book Consultation
              </Button>
              <Button variant="outline" className="church-button-outline text-base py-3 px-8">
                Call Us:  (904) 900-1617
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AttorneysSection;