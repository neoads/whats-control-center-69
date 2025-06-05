
import React from 'react';
import { motion } from 'framer-motion';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-radial from-warion-green/5 via-transparent to-transparent" />
      
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <motion.div 
            className="inline-flex items-center justify-center w-32 h-32 rounded-2xl mb-6 overflow-hidden floating-logo"
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <img 
              src="/lovable-uploads/4bd592f6-8c3f-4f70-8b94-7e7c1f77b43c.png" 
              alt="WARION Logo" 
              className="w-full h-full object-contain"
            />
          </motion.div>
          
          <motion.h1 
            className="text-4xl font-display font-bold text-foreground mb-2 tracking-wider warion-text-gradient"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            WARION
          </motion.h1>
          
          <motion.p 
            className="text-muted-foreground font-body text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Warrior + Automation Platform
          </motion.p>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayout;
