
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    console.log('Tentando fazer login com:', { email, password });
    
    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        console.error('Erro no login:', error);
        toast.error(error.message || 'Erro ao fazer login');
        return;
      }
      
      console.log('Login bem-sucedido');
      toast.success('Login realizado com sucesso!');
      navigate('/', { replace: true });
      
    } catch (error) {
      console.error('Erro no login:', error);
      toast.error('Erro ao fazer login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="border border-gray-700 bg-gray-900/80 backdrop-blur-sm shadow-2xl">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-xl font-bold text-white tracking-wider">
            ENTRAR
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white font-medium">
                EMAIL
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800 border-gray-600 text-white focus:border-green-500 focus:ring-green-500/20"
                required
                disabled={isLoading}
                placeholder="Digite seu email"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white font-medium">
                SENHA
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white focus:border-green-500 focus:ring-green-500/20 pr-12"
                  required
                  disabled={isLoading}
                  placeholder="Digite sua senha"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-700 text-gray-400 hover:text-white z-10"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-3 text-sm tracking-wider transition-all duration-200 hover:scale-105"
              disabled={isLoading}
            >
              {isLoading ? 'ENTRANDO...' : 'ENTRAR'}
            </Button>
          </form>

          <div className="text-center pt-4">
            <span className="text-gray-400 text-sm">
              Não tem uma conta?{' '}
              <button
                onClick={() => navigate('/register')}
                className="text-green-400 hover:text-green-300 font-semibold transition-colors duration-200 underline cursor-pointer"
                disabled={isLoading}
              >
                CADASTRE-SE
              </button>
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
