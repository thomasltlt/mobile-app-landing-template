import AnimatedText from "../../../../components/animatedText";
import clsx from "clsx";
import { motion, useInView } from "framer-motion";
import { useContext, useRef } from "react";
import { ConfigContext } from "../../../../utils/configContext";

function Features() {
  const {
    home: { features },
  } = useContext(ConfigContext)!;
  
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (!features) return null;

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.8,
      rotateX: -15,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, rotateZ: -180 },
    visible: { 
      scale: 1, 
      rotateZ: 0,
      transition: {
        delay: 0.2,
        type: "spring",
        stiffness: 200,
        damping: 15,
      }
    },
  };

  return (
    <section 
      id={features.id} 
      className="max-w-screen-lg mx-auto px-4 py-16 md:py-24 relative overflow-hidden"
      ref={ref}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-20 left-10 w-24 h-24 bg-gradient-to-br from-accent/10 to-primary/10 rounded-full blur-xl animate-float-delayed"></div>
      </div>

      <div className="mb-16 max-w-none flex flex-col items-center prose prose-lg text-center relative z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="mb-6 relative">
            <AnimatedText text={features.title} />
            {/* Decorative elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-8 h-8 bg-primary/20 rounded-full blur-sm"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </h1>
        </motion.div>

        <motion.div
          className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full overflow-hidden mb-8"
          initial={{ width: 0, opacity: 0 }}
          animate={isInView ? { width: "200px", opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        >
          <motion.div
            className="h-full w-full bg-gradient-to-r from-primary to-secondary"
            animate={{ x: ["-100%", "100%"] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
              delay: 1.5,
            }}
          />
        </motion.div>

        {features.subtitle && (
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 0.8 } : {}}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-lg max-w-2xl text-gray-600 dark:text-gray-300 leading-relaxed"
          >
            {features.subtitle}
          </motion.p>
        )}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:gap-10"
      >
        {features.cards.map((feat, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ 
              y: -8,
              rotateY: 2,
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
            className={clsx(
              "glass rounded-2xl card relative overflow-hidden group cursor-pointer",
              "border border-white/20 dark:border-gray-800/50",
              "shadow-modern hover:shadow-glow-lg transition-all duration-500",
              {
                "col-span-full sm:col-span-2":
                  index === features!.cards.length - 1 &&
                  features!.cards.length % 2 === 1,
              }
            )}
          >
            {/* Card background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
            
            {/* Floating particles effect */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-primary/30 rounded-full"
                  style={{
                    top: `${20 + i * 30}%`,
                    left: `${10 + i * 20}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 0.8, 0.3],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 3 + i,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            <div className="relative p-8 flex flex-col h-full">
              {/* Icon section with enhanced animation */}
              <motion.div 
                className="mb-6 flex justify-center"
                variants={iconVariants}
              >
                <div className="relative p-6 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl group-hover:from-primary/20 group-hover:to-secondary/20 transition-all duration-500">
                  <motion.img
                    src={feat.icon}
                    alt="feature icon"
                    className="w-16 h-16 object-contain filter drop-shadow-lg"
                    whileHover={{ 
                      rotateY: 180,
                      scale: 1.1,
                      transition: { duration: 0.5 }
                    }}
                  />
                  
                  {/* Icon glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              </motion.div>

              {/* Content */}
              <div className="flex-1 text-center space-y-4">
                <motion.h2 
                  className="text-2xl font-bold text-gray-800 dark:text-gray-100 group-hover:text-primary transition-colors duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  {feat.title}
                </motion.h2>
                
                {/* Animated divider */}
                <motion.div 
                  className="w-16 h-0.5 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"
                  initial={{ width: 0, opacity: 0 }}
                  animate={isInView ? { width: 64, opacity: 1 } : {}}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                />
                
                <motion.p 
                  className="text-gray-600 dark:text-gray-300 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  {feat.subtitle}
                </motion.p>
              </div>

              {/* Interactive hover elements */}
              <motion.div
                className="absolute top-4 right-4 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100"
                animate={{
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>

            {/* Card border animation */}
            <motion.div
              className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-primary/50 to-secondary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: "linear-gradient(white, white) padding-box, linear-gradient(45deg, rgba(102, 126, 234, 0.5), rgba(118, 75, 162, 0.5)) border-box",
              }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Call to action floating button */}
      <motion.div
        className="flex justify-center mt-16"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <motion.a
          href="/app"
          className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-full shadow-glow hover:shadow-glow-lg transition-all duration-300"
          whileHover={{ 
            scale: 1.05,
            y: -2,
          }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: [
              "0 0 20px rgba(102, 126, 234, 0.3)",
              "0 0 30px rgba(102, 126, 234, 0.5)",
              "0 0 20px rgba(102, 126, 234, 0.3)",
            ]
          }}
          transition={{
            boxShadow: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }
          }}
        >
          Join the Waitlist
        </motion.a>
      </motion.div>
    </section>
  );
}

export default Features;
