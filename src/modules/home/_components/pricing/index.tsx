import AnimatedText from "../../../../components/animatedText";
import clsx from "clsx";
import { motion, useInView } from "framer-motion";
import { useContext, useRef } from "react";
import { ConfigContext } from "../../../../utils/configContext";

const planImages = [
  "/misc/wallet-front-color.webp",
  "/misc/money-front-color.webp",
  "/misc/locker-front-color.webp",
];

const planBGs = [
  "from-primary/20 to-primary/5",
  "from-secondary/20 to-secondary/5", 
  "from-accent/20 to-accent/5"
];

const planGlows = [
  "shadow-[0_0_30px_rgba(59,130,246,0.3)]",
  "shadow-[0_0_30px_rgba(168,85,247,0.3)]",
  "shadow-[0_0_30px_rgba(34,197,94,0.3)]"
];

function Pricing() {
  const {
    home: { pricing },
  } = useContext(ConfigContext)!;
  
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (!pricing) return null;

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 80,
      scale: 0.8,
      rotateY: -20,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        type: "spring",
        stiffness: 80,
      },
    },
  };

  return (
    <section
      id={pricing.id}
      className="overflow-hidden max-w-screen-lg mx-auto px-4 py-16 md:py-24 relative"
      ref={ref}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-16 left-10 w-40 h-40 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-16 right-10 w-32 h-32 bg-gradient-to-br from-accent/10 to-primary/10 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-secondary/10 to-accent/10 rounded-full blur-2xl animate-pulse-slow"></div>
      </div>

      <div className="mb-16 max-w-none flex flex-col items-center prose prose-lg text-center relative z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="mb-6 relative">
            <AnimatedText text={pricing.title} />
            {/* Floating price indicators */}
            <motion.div
              className="absolute -top-6 -right-8 text-2xl"
              animate={{
                y: [0, -10, 0],
                rotateZ: [0, 5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              💰
            </motion.div>
          </h1>
        </motion.div>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 0.8 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-xl max-w-2xl text-gray-600 dark:text-gray-300 leading-relaxed"
        >
          {pricing.subtitle}
        </motion.p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="flex flex-col max-w-none gap-8 md:flex-row md:justify-center lg:gap-10"
      >
        {pricing.plans?.map((plan, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ 
              y: -12,
              scale: 1.03,
              rotateY: 2,
              transition: { duration: 0.3 }
            }}
            className="md:w-1/3 flex relative group"
          >
            {/* Featured plan background effect */}
            {plan.featured && (
              <motion.div 
                className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={{
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )}

            {/* Enhanced featured plan shadow */}
            {plan.featured && (
              <div className="absolute top-1 bottom-2 right-2 left-1 bg-gradient-to-br from-secondary/40 to-primary/40 -z-10 rounded-3xl blur-sm" />
            )}

            <div
              className={clsx(
                "glass border-2 border-white/20 dark:border-gray-800/50 flex-1 card p-0 shadow-modern bg-white/80 dark:bg-gray-900/80 z-10 overflow-hidden rounded-3xl transition-all duration-500",
                planGlows[index],
                {
                  "hover:shadow-glow-lg": !plan.featured,
                  "shadow-glow-lg hover:shadow-[0_0_50px_rgba(59,130,246,0.5)]": plan.featured,
                  "-translate-x-3 -translate-y-3 hover:translate-x-0 hover:translate-y-0": plan.featured,
                }
              )}
            >
              <div className="card-body p-0 text-center relative">
                {/* Enhanced header section */}
                <div className="flex relative overflow-hidden">
                  {/* Best Price Badge */}
                  {plan.featured && (
                    <motion.div 
                      className="absolute top-4 right-4 z-20"
                      initial={{ scale: 0, rotateZ: -45 }}
                      animate={{ scale: 1, rotateZ: 0 }}
                      transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                    >
                      <div className="bg-gradient-to-r from-primary to-secondary text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        Best Price
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-sm opacity-50"
                          animate={{
                            scale: [1, 1.2, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Icon section with enhanced animation */}
                  <div className={clsx("h-40 w-[40%] p-6 relative overflow-hidden bg-gradient-to-br", planBGs[index])}>
                    {/* Floating particles */}
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white/50 rounded-full"
                        style={{
                          top: `${20 + i * 25}%`,
                          left: `${15 + i * 20}%`,
                        }}
                        animate={{
                          y: [0, -15, 0],
                          opacity: [0.3, 1, 0.3],
                          scale: [1, 1.3, 1],
                        }}
                        transition={{
                          duration: 2 + i * 0.5,
                          repeat: Infinity,
                          delay: i * 0.3,
                          ease: "easeInOut",
                        }}
                      />
                    ))}

                    <motion.img
                      src={planImages[index]}
                      alt="pricing plan"
                      className="m-0 h-full w-full object-contain relative z-10 filter drop-shadow-lg"
                      whileHover={{ 
                        rotateY: 15,
                        scale: 1.1,
                        transition: { duration: 0.3 }
                      }}
                      animate={{
                        y: [0, -5, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.5,
                      }}
                    />
                  </div>

                  {/* Pricing information */}
                  <div className="mt-10 flex-1 font-bold relative">
                    <motion.h4 
                      className="text-2xl my-2 text-gray-800 dark:text-gray-100"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      {plan.title}
                    </motion.h4>
                    
                    <motion.div
                      className="relative"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.8 + index * 0.1 }}
                    >
                      <p className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        {plan.price}
                      </p>
                      {/* Price glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
                    </motion.div>
                  </div>
                </div>

                {/* Enhanced features list */}
                <div className="w-full flex-1 flex flex-col p-6 space-y-4">
                  {plan.rows.map((row, rowIndex) => (
                    <motion.div 
                      key={rowIndex} 
                      className="flex relative items-center group/item"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 1 + index * 0.1 + rowIndex * 0.1 }}
                    >
                      {/* Enhanced bullet point */}
                      <div className="relative flex h-3 w-3 mx-4 flex-shrink-0">
                        <motion.span 
                          className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.7, 0.3, 0.7],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: rowIndex * 0.2,
                          }}
                        />
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-gradient-to-r from-primary to-secondary shadow-glow"></span>
                      </div>
                      
                      <p className="flex-1 text-left text-gray-700 dark:text-gray-300 group-hover/item:text-primary transition-colors duration-300">
                        {row}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Enhanced CTA button */}
                {pricing.actionText && (
                  <motion.div 
                    className="w-full p-6 pt-0"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1.4 + index * 0.1 }}
                  >
                    <motion.a
                      href="/app"
                      className="w-full px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-2xl shadow-glow hover:shadow-glow-lg transition-all duration-300 relative overflow-hidden block"
                      whileHover={{ 
                        scale: 1.02,
                        y: -2,
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10">{pricing.actionText}</span>
                      
                      {/* Button shine effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"
                        animate={{
                          translateX: ["-100%", "100%"],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 4,
                          ease: "linear",
                        }}
                      />
                    </motion.a>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Money rain animation for featured plans */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-20"
            initial={{
              top: "-10%",
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              top: "110%",
              rotateZ: [0, 360],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 2,
              ease: "linear",
            }}
          >
            💵
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Pricing;
