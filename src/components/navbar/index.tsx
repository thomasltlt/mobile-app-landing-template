import AnimatedList from "../../components/animatedList";
import MenuToggle from "../../components/menuToggle";
import clsx from "clsx";
import { easeIn, motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useContext, useState } from "react";
import { ConfigContext } from "../../utils/configContext";
import ThemeSwitcher from "./themeSwitcher";

function Navbar() {
  const {
    name,
    logo,
    showThemeSwitch,
    topNavbar,
    googlePlayLink,
    appStoreLink,
  } = useContext(ConfigContext)!;

  const [isMobileNavVisible, setIsMobileNavVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const { scrollYProgress, scrollY } = useScroll();
  
  // Enhanced scroll animations
  const y = useTransform(scrollYProgress, [0, 1 / 3], [0, 12], {
    ease: easeIn,
  });
  const width = useTransform(scrollYProgress, [0, 1 / 3], ["100%", "90%"], {
    ease: easeIn,
  });
  const opacity = useTransform(scrollYProgress, [0, 1 / 3], [0, 1], {
    ease: easeIn,
  });
  const blur = useTransform(scrollY, [0, 100], [0, 20]);

  // Monitor scroll position for dynamic styling
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  // Animation variants for navigation items
  const navItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    },
  };

  const logoVariants = {
    initial: { scale: 1, rotateY: 0 },
    hover: { 
      scale: 1.05, 
      rotateY: 5,
      transition: { duration: 0.3, ease: "easeOut" }
    },
  };

  return (
    <motion.nav
      className="max-w-screen-lg mx-auto sticky top-0 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        style={{
          width: isMobileNavVisible || topNavbar.disableWidthAnimation ? "100%" : width,
          translateY: isMobileNavVisible ? 0 : y,
          backdropFilter: `blur(${blur}px)`,
        }}
        className="will-change-[width,transform] transition-all mx-auto navbar relative px-4 max-md:!w-full"
        animate={{
          scale: isScrolled ? 0.98 : 1,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Enhanced backdrop with glassmorphism */}
        <motion.div
          style={{ opacity: isMobileNavVisible ? 1 : opacity }}
          className={clsx(
            "glass will-change-[border-radius,opacity] transition-all z-[-1] absolute left-0 right-0 top-0 bottom-0 shadow-modern",
            {
              "rounded-full": !isMobileNavVisible,
              "rounded-2xl": isMobileNavVisible,
            }
          )}
          animate={{
            boxShadow: isScrolled 
              ? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Logo section with enhanced animation */}
        <div className="navbar-start">
          <motion.a 
            href="/" 
            className="flex items-center group cursor-pointer"
            variants={logoVariants}
            initial="initial"
            whileHover="hover"
          >
            <motion.div className="relative">
              <motion.img 
                className="h-16 relative z-10" 
                src={logo} 
                alt="logo"
                whileHover={{ rotateY: 10 }}
                transition={{ duration: 0.3 }}
              />
              {/* Logo glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
            <motion.span 
              className="font-bold mx-3 md:text-lg gradient-text relative"
              initial={{ opacity: 0.8 }}
              whileHover={{ opacity: 1 }}
            >
              {name}
              {/* Text shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full opacity-0 group-hover:opacity-100"
                animate={{
                  translateX: ["-100%", "100%"],
                }}
                transition={{
                  duration: 1.5,
                  ease: "linear",
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              />
            </motion.span>
          </motion.a>
        </div>

        {/* Mobile navigation controls */}
        <div className="navbar-end md:hidden flex items-center gap-2">
          {showThemeSwitch && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <ThemeSwitcher />
            </motion.div>
          )}
          <MenuToggle
            toggle={() => setIsMobileNavVisible((current) => !current)}
            isOpen={isMobileNavVisible}
          />
        </div>

        {/* Desktop navigation */}
        <div className="navbar-end hidden font-semibold md:flex">
          <motion.ul 
            className="flex gap-6 px-1 items-center"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.3,
                }
              }
            }}
          >
            {showThemeSwitch && (
              <motion.li variants={navItemVariants}>
                <ThemeSwitcher />
              </motion.li>
            )}
            {topNavbar.links.map(({ title, href }, index) => (
              <motion.li key={index} variants={navItemVariants}>
                <motion.a
                  className="text-sm whitespace-nowrap relative py-2 px-3 rounded-lg transition-all duration-300 hover:bg-primary/10"
                  href={href}
                  whileHover={{ 
                    y: -2,
                    scale: 1.05,
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {title}
                  {/* Underline animation */}
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-secondary origin-center scale-x-0"
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </motion.a>
              </motion.li>
            ))}
          </motion.ul>
          
          {/* Enhanced CTA button */}
          {topNavbar.cta && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              <motion.a 
                href="/app" 
                className="ml-4 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-full shadow-glow hover:shadow-glow-lg transition-all duration-300 relative overflow-hidden"
                whileHover={{ 
                  scale: 1.05,
                  y: -2,
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">{topNavbar.cta}</span>
                {/* Button shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                  animate={{
                    translateX: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: "linear",
                  }}
                />
              </motion.a>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Enhanced mobile navigation menu */}
      <AnimatedList
        listKey="mobile-navbar"
        listClassName="absolute glass top-20 shadow-modern rounded-2xl w-full px-6 py-4 flex flex-col gap-3 md:hidden border border-white/20"
        isVisible={isMobileNavVisible}
      >
        {topNavbar.links.map(({ title, href }, index) => (
          <motion.a
            key={index}
            className="relative py-3 px-4 rounded-xl text-center font-medium transition-all duration-300 hover:bg-primary/10"
            href={href}
            variants={{
              show: { 
                x: 0, 
                opacity: 1,
                transition: { delay: index * 0.1 }
              },
              hidden: { 
                x: "-100%", 
                opacity: 0 
              },
            }}
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
          >
            {title}
            {/* Mobile item indicator */}
            <motion.div
              className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-gradient-to-b from-primary to-secondary rounded-full"
              whileHover={{ height: "60%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>
        ))}
        
        {/* Mobile app store links */}
        <motion.div
          variants={{
            show: { 
              opacity: 1, 
              y: 0,
              transition: { delay: topNavbar.links.length * 0.1 + 0.2 }
            },
            hidden: { 
              opacity: 0, 
              y: "50%" 
            },
          }}
          className="flex justify-center gap-4 mt-4 pt-4 border-t border-gray-200/20"
        >
          {googlePlayLink && (
            <motion.a 
              href={googlePlayLink} 
              target="_blank"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="transition-all duration-300 hover:shadow-glow rounded-2xl overflow-hidden"
            >
              <img className="h-12" src="/stores/google-play.svg" alt="Google Play" />
            </motion.a>
          )}
          {appStoreLink && (
            <motion.a 
              href={appStoreLink} 
              target="_blank"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="transition-all duration-300 hover:shadow-glow rounded-2xl overflow-hidden"
            >
              <img className="h-12" src="/stores/app-store.svg" alt="App Store" />
            </motion.a>
          )}
        </motion.div>
      </AnimatedList>
    </motion.nav>
  );
}

export default Navbar;
