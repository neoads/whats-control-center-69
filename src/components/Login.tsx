
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/sonner';

const Login = () => {
  const [email, setEmail] = useState('teste@warion.com');
  const [password, setPassword] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    console.log('Tentando fazer login com:', { email, password });
    
    try {
      // Simulação de login com delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (email === 'teste@warion.com' && password === '123456') {
        console.log('Login bem-sucedido');
        localStorage.setItem('isLoggedIn', 'true');
        toast('Login realizado com sucesso!');
        
        // Navegar para a página principal
        navigate('/', { replace: true });
        window.location.reload(); // Força o reload para garantir que o estado seja atualizado
      } else {
        console.log('Credenciais incorretas');
        toast('Email ou senha incorretos');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      toast('Erro ao fazer login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-border bg-card neon-border mx-4 sm:mx-0">
      <CardHeader className="pb-4 sm:pb-6">
        <CardTitle className="text-center text-lg sm:text-xl font-display tracking-wider">ENTRAR</CardTitle>
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="font-display font-medium tracking-wide text-sm sm:text-base">EMAIL</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-input border-border warion-input-focus h-10 sm:h-11"
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="font-display font-medium tracking-wide text-sm sm:text-base">SENHA</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-input border-border pr-10 warion-input-focus h-10 sm:h-11"
                required
                disabled={isLoading}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent hover:text-warion-blue"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
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
            className="w-full warion-button font-display text-sm tracking-widest h-10 sm:h-11"
            disabled={isLoading}
          >
            {isLoading ? 'ENTRANDO...' : 'ENTRAR'}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p className="mb-2 font-display">DADOS DE TESTE:</p>
          <p className="text-xs sm:text-sm">Email: teste@warion.com</p>
          <p className="text-xs sm:text-sm">Senha: 123456</p>
        </div>

        <div className="mt-4 text-center">
          <span className="text-xs sm:text-sm text-muted-foreground">
            Não tem uma conta?{' '}
            <button
              onClick={() => navigate('/register')}
              className="text-warion-blue hover:text-warion-green transition-colors duration-200 font-display tracking-wide"
              disabled={isLoading}
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
