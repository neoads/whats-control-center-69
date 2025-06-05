
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
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-32 h-32 rounded-2xl mb-6 overflow-hidden">
            <img 
              src="/lovable-uploads/ce0047c6-a677-4884-947a-3a6b13a5aa8f.png" 
              alt="WARION Logo" 
              className="w-full h-full object-contain floating-logo"
            />
          </div>
          
          <h1 className="text-4xl font-display font-bold text-foreground mb-2 tracking-wider warion-text-gradient">
            WARION
          </h1>
          
          <p className="text-muted-foreground font-body text-lg">
            Warrior + Automation Platform
          </p>
        </div>
        
        <div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
