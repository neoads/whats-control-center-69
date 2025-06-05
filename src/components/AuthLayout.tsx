
import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-black to-blue-900/20" />
      
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl mb-6 overflow-hidden">
            <img 
              src="/lovable-uploads/ce0047c6-a677-4884-947a-3a6b13a5aa8f.png" 
              alt="WARION Logo" 
              className="w-full h-full object-contain"
              style={{
                filter: 'drop-shadow(0 0 20px rgba(16, 185, 129, 0.5))'
              }}
            />
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-2 tracking-wider">
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              WARION
            </span>
          </h1>
        </div>
        
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
