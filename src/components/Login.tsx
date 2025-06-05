
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Login = () => {
  const [email, setEmail] = useState('teste@warion.com');
  const [password, setPassword] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulação de login
    if (email === 'teste@warion.com' && password === '123456') {
      localStorage.setItem('isLoggedIn', 'true');
      toast.success('Login realizado com sucesso!', {
        className: 'warion-toast'
      });
      navigate('/');
    } else {
      toast.error('Email ou senha incorretos', {
        className: 'bg-warion-gray border-l-4 border-l-warion-red'
      });
    }
  };

  return (
    <Card className="border-border bg-card neon-border">
      <CardHeader>
        <CardTitle className="text-center text-xl font-display tracking-wider">ENTRAR</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="font-display font-medium tracking-wide">EMAIL</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-input border-border warion-input-focus"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="font-display font-medium tracking-wide">SENHA</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-input border-border pr-10 warion-input-focus"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent hover:text-warion-blue"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full warion-button font-display text-sm tracking-widest"
          >
            ENTRAR
          </Button>
        </form>

        <div className="mt-4 text-center">
          <span className="text-sm text-muted-foreground">
            Não tem uma conta?{' '}
            <button
              onClick={() => navigate('/register')}
              className="text-warion-blue hover:text-warion-green transition-colors duration-200 font-display tracking-wide"
            >
              CADASTRE-SE
            </button>
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default Login;
