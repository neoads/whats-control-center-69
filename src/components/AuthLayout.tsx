
import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 overflow-hidden warion-glow">
            <img 
              src="/lovable-uploads/4bd592f6-8c3f-4f70-8b94-7e7c1f77b43c.png" 
              alt="WARION Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-3xl font-display font-bold text-foreground mb-2 tracking-wider">WARION</h1>
          <p className="text-muted-foreground font-body">Warrior + Automation Platform</p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
