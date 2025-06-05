
import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-xl mb-4">
            <span className="text-2xl font-bold text-primary-foreground">W</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Whats Manager</h1>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
