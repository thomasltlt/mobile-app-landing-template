import { motion } from "framer-motion";
import { useState } from "react";
import type { TemplateConfig } from "utils/configType";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { ConfigContext } from "../../utils/configContext";

interface Props {
  config: TemplateConfig;
}

function WaitlistPage({ config }: Props) {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitted(true);
    setIsLoading(false);
  };

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
    <ConfigContext.Provider value={config}>
      <div className="min-h-screen flex flex-col relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-float"></div>
          <div className="absolute top-40 right-20 w-40 h-40 bg-secondary/10 rounded-full blur-xl animate-float-delayed"></div>
          <div className="absolute bottom-32 left-1/4 w-24 h-24 bg-accent/10 rounded-full blur-xl animate-bounce-slow"></div>
        </div>

        <Navbar />
        
        <main className="flex-1 flex items-center justify-center px-4 py-16">
          <motion.div 
            className="max-w-2xl w-full mx-auto text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {!isSubmitted ? (
              <>
                {/* Waitlist Form */}
                <motion.div variants={itemVariants}>
                  <motion.h1 
                    className="text-4xl md:text-6xl font-bold mb-6 gradient-text"
                    animate={{
                      textShadow: [
                        "0 0 20px rgba(59,130,246,0.3)",
                        "0 0 30px rgba(59,130,246,0.5)", 
                        "0 0 20px rgba(59,130,246,0.3)"
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    Join the Waitlist
                  </motion.h1>
                </motion.div>

                <motion.p 
                  variants={itemVariants}
                  className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
                >
                  Be the first to experience our revolutionary app. Get early access and exclusive updates!
                </motion.p>

                <motion.div 
                  variants={itemVariants}
                  className="glass rounded-2xl p-8 shadow-modern border border-white/20 mb-8"
                >
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                      <motion.input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        required
                        className="w-full px-6 py-4 text-lg rounded-2xl border-2 border-gray-200 dark:border-gray-700 focus:border-primary focus:outline-none transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
                        whileFocus={{ scale: 1.02 }}
                      />
                      <motion.div
                        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 pointer-events-none"
                        animate={{
                          opacity: email ? [0, 0.3, 0] : 0,
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isLoading || !email}
                      className="w-full px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-2xl shadow-glow hover:shadow-glow-lg transition-all duration-300 relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10">
                        {isLoading ? "Joining..." : "Join Waitlist"}
                      </span>
                      
                      {/* Button shine effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"
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
                      
                      {isLoading && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-primary/50 to-secondary/50 rounded-2xl"
                          animate={{ opacity: [0.5, 0.8, 0.5] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                      )}
                    </motion.button>
                  </form>
                </motion.div>

                <motion.div 
                  variants={itemVariants}
                  className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 dark:text-gray-400"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    No spam, ever
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                    Early access guaranteed
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
                    Exclusive updates
                  </span>
                </motion.div>
              </>
            ) : (
              /* Success State */
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-center"
              >
                <motion.div
                  className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 360],
                  }}
                  transition={{
                    scale: { duration: 2, repeat: Infinity },
                    rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                  }}
                >
                  <span className="text-4xl text-white">✓</span>
                </motion.div>
                
                <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                  You're on the list! 🎉
                </h2>
                
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                  Thank you for joining our waitlist. You'll be among the first to know when we launch!
                </p>

                <motion.button
                  onClick={() => window.location.href = '/'}
                  className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-full shadow-glow hover:shadow-glow-lg transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Back to Home
                </motion.button>
              </motion.div>
            )}

            {/* Floating elements */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-primary/30 rounded-full"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 0.8, 0.3],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </motion.div>
        </main>

        <Footer />
      </div>
    </ConfigContext.Provider>
  );
}

export default WaitlistPage;
