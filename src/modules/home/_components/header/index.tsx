import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useContext, useRef } from "react";
import { ConfigContext } from "../../../../utils/configContext";
import SingleScreenshot from "./singleScreenshot";
import SVGWave from "./svg/wave";
import SVGBlob from "./svg/blob";

function Header() {
  const {
    googlePlayLink,
    appStoreLink,
    home: { header, partners },
  } = useContext(ConfigContext)!;

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
  });

  // Enhanced scroll-based animations
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  
  // Smooth spring animation for scroll effects
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  // Stagger animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id={header.id} className="relative pb-8 md:pb-4 overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-32 right-20 w-32 h-32 bg-secondary/10 rounded-full blur-xl animate-float-delayed"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-accent/10 rounded-full blur-xl animate-bounce-slow"></div>
      </div>

      <div className="max-w-screen-lg mx-auto py-4 px-4 md:py-16 relative z-10">
        <div className="flex flex-col md:flex-row">
          <motion.div 
            className="flex flex-1 items-center md:items-start md:h-[300vh]"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="static top-40 flex flex-col prose justify-center py-8 md:sticky md:h-[548px]"
              style={{ y: springY, opacity, scale }}
            >
              {/* Rewards badges with enhanced animation */}
              {header.rewards && (
                <motion.div 
                  className="flex flex-col gap-3 my-6 3xs:flex-row"
                  variants={itemVariants}
                >
                  {header.rewards.map((reward, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0, rotateZ: -10 }}
                      animate={{ opacity: 1, scale: 1, rotateZ: 0 }}
                      transition={{ 
                        delay: index * 0.2,
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        rotateZ: 2,
                        transition: { duration: 0.2 }
                      }}
                      className="flex items-center self-center h-8 md:h-12 glass rounded-full px-4 py-2 shadow-glow cursor-pointer"
                    >
                      <motion.img 
                        src="/misc/wreath-left.webp" 
                        className="h-full animate-wiggle" 
                        style={{ animation: "wiggle 3s ease-in-out infinite" }}
                      />
                      <p className="text-xs text-gray-600 dark:text-gray-300 whitespace-pre text-center font-medium mx-2">
                        {reward}
                      </p>
                      <motion.img 
                        src="/misc/wreath-right.webp" 
                        className="h-full animate-wiggle" 
                        style={{ animation: "wiggle 3s ease-in-out infinite 0.5s" }}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* Enhanced headline with gradient text */}
              <motion.h2
                variants={itemVariants}
                className="mt-0 mb-6 text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
              >
                {header.headlineMark ? (
                  <>
                    {header.headline
                      .split(" ")
                      .slice(0, header.headlineMark[0])
                      .join(" ")}{" "}
                    <span className="inline-block relative">
                      <span className="gradient-text">
                        {header.headline
                          .split(" ")
                          .slice(...header.headlineMark)
                          .join(" ")}
                      </span>
                      <motion.span
                        initial={{ width: 0, height: 0 }}
                        animate={{
                          width: "100%",
                          height: "100%",
                        }}
                        transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
                        className="absolute top-0 left-0 z-[-1] bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-sm animate-morphing"
                      />
                    </span>{" "}
                    {header.headline
                      .split(" ")
                      .slice(header.headlineMark[1])
                      .join(" ")}
                  </>
                ) : (
                  <span className="gradient-text">{header.headline}</span>
                )}
              </motion.h2>

              {/* Enhanced subtitle */}
              <motion.p
                variants={itemVariants}
                className="whitespace-pre-wrap text-left m-0 my-4 max-w-md md:text-xl md:max-w-lg text-gray-700 dark:text-gray-300 leading-relaxed"
              >
                {header.subtitle}
              </motion.p>

              {/* Enhanced app store buttons */}
              <motion.div
                variants={itemVariants}
                className="flex gap-4 m-0 p-0 my-6"
              >
                {googlePlayLink && (
                  <motion.a 
                    href={googlePlayLink}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="block transition-all duration-300 hover:shadow-glow rounded-2xl overflow-hidden"
                  >
                    <img
                      className="h-14 md:h-16"
                      alt="google play logo"
                      src="/stores/google-play.svg"
                    />
                  </motion.a>
                )}
                {appStoreLink && (
                  <motion.a 
                    href={appStoreLink}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="block transition-all duration-300 hover:shadow-glow rounded-2xl overflow-hidden"
                  >
                    <img
                      className="h-14 md:h-16"
                      alt="app store logo"
                      src="/stores/app-store.svg"
                    />
                  </motion.a>
                )}
              </motion.div>

              {/* Enhanced user testimonials */}
              {header.usersDescription && (
                <motion.div 
                  variants={itemVariants}
                  className="not-prose flex items-center gap-4 my-6 glass rounded-full px-6 py-3 shadow-modern"
                >
                  <div className="avatar-group -space-x-4">
                    {Array.from(Array(5)).map((_, index) => (
                      <motion.div
                        key={index}
                        initial={{ scale: 0, opacity: 0, rotateZ: -180 }}
                        animate={{ scale: 1, opacity: 1, rotateZ: 0 }}
                        transition={{ 
                          delay: 1.5 + index * 0.1,
                          type: "spring",
                          stiffness: 200,
                        }}
                        whileHover={{ scale: 1.1, z: 10 }}
                        className="avatar border-2 border-white shadow-lg"
                      >
                        <div className="w-10 rounded-full">
                          <img
                            src={`/avatars/${index + 1}.webp`}
                            alt={`app user ${index + 1}`}
                            className="rounded-full"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <motion.p
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 2 }}
                  >
                    {header.usersDescription}
                  </motion.p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>

          {/* Enhanced phone mockup */}
          <div className="min-h-[300vh] z-[-1]" ref={ref}>
            <div className="flex justify-center sticky top-28 md:top-40">
              <SVGBlob
                scrollYProgress={scrollYProgress}
                className="-z-10 absolute hidden w-[800px] -top-20 -right-60 md:hidden xl:block opacity-30 animate-rotate-slow"
              />
              
              {/* Floating elements around phone */}
              <motion.div
                className="absolute -top-10 -left-10 w-6 h-6 bg-primary rounded-full opacity-60"
                animate={{
                  y: [0, -20, 0],
                  x: [0, 10, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute -bottom-5 -right-5 w-4 h-4 bg-secondary rounded-full opacity-60"
                animate={{
                  y: [0, 15, 0],
                  x: [0, -8, 0],
                  scale: [1, 0.8, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              />

              <motion.div
                initial={{ scale: 0.4, opacity: 0, rotateY: -30 }}
                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  mass: 0.8,
                  duration: 1,
                  delay: 0.5,
                }}
                whileHover={{ 
                  scale: 1.02,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                className="relative h-[548px] 2xs:h-[720px] sm:h-[648px] md:h-[548px] rounded-[3rem] shadow-modern hover:shadow-glow-lg transition-all duration-500"
              >
                <div className="absolute top-2.5 left-3 w-[calc(100%-24px)] h-[calc(100%-16px)] rounded-[1rem] 2xs:rounded-[2rem] overflow-hidden">
                  {header.screenshots.map((src, index) => (
                    <SingleScreenshot
                      key={src}
                      src={src}
                      scrollYProgress={scrollYProgress}
                      index={index}
                      totalCount={header.screenshots.length}
                    />
                  ))}
                </div>
                <img
                  src="/misc/iphone-frame.webp"
                  alt="iphone-frame"
                  className="relative z-10 h-full drop-shadow-2xl"
                />
                
                {/* Phone glow effect */}
                <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-primary/20 to-secondary/20 blur-xl -z-10 animate-pulse-slow"></div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      
      {partners && (
        <SVGWave className="absolute -bottom-1 left-0 right-0 -z-10 opacity-80" />
      )}
    </section>
  );
}

export default Header;
