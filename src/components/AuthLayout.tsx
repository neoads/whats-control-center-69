
import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-radial from-warion-green/5 via-transparent to-transparent" />
      
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-32 h-32 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-2xl mb-4 sm:mb-6 overflow-hidden">
            <img 
              src="/lovable-uploads/ce0047c6-a677-4884-947a-3a6b13a5aa8f.png" 
              alt="WARION Logo" 
              className="w-full h-full object-contain floating-logo"
            />
          </div>
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground mb-2 tracking-wider warion-text-gradient">
            WARION
          </h1>
        </div>
        
        <div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
