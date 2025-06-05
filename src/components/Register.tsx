
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('As senhas não coincidem');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await signUp(formData.email, formData.password, formData.name);
      
      if (error) {
        console.error('Erro no registro:', error);
        toast.error(error.message || 'Erro ao criar conta');
        return;
      }

      toast.success('Conta criada com sucesso! Verifique seu email para confirmar.');
      navigate('/login');
    } catch (error) {
      console.error('Erro no registro:', error);
      toast.error('Erro ao criar conta');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="border border-gray-700 bg-gray-900/80 backdrop-blur-sm shadow-2xl">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-xl font-bold text-white tracking-wider">
            CRIAR CONTA
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white font-medium">
                NOME COMPLETO
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="bg-gray-800 border-gray-600 text-white focus:border-green-500 focus:ring-green-500/20"
                required
                disabled={isLoading}
                placeholder="Digite seu nome completo"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white font-medium">
                EMAIL
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
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
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
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

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-white font-medium">
                CONFIRMAR SENHA
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="bg-gray-800 border-gray-600 text-white focus:border-green-500 focus:ring-green-500/20 pr-12"
                  required
                  disabled={isLoading}
                  placeholder="Confirme sua senha"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-700 text-gray-400 hover:text-white z-10"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isLoading}
                >
                  {showConfirmPassword ? (
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
              {isLoading ? 'CRIANDO CONTA...' : 'CRIAR CONTA'}
            </Button>
          </form>

          <div className="text-center pt-4">
            <span className="text-gray-400 text-sm">
              Já tem uma conta?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-green-400 hover:text-green-300 font-semibold transition-colors duration-200 underline cursor-pointer"
                disabled={isLoading}
              >
                FAÇA LOGIN
              </button>
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
