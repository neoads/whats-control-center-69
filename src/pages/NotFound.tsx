
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-6xl font-bold text-muted-foreground">404</CardTitle>
          <p className="text-xl font-semibold">Página não encontrada</p>
          <p className="text-muted-foreground">
            A página que você está procurando não existe ou foi movida.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button asChild className="w-full">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Voltar ao início
            </Link>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link to="/login">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Fazer login
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
