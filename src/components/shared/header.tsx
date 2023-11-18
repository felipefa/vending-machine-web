import { LogOut, UserCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/useAuth';

export function Header() {
  const { depositFormatted, signOut, user } = useAuth();

  const isBuyer = user?.role === 'buyer';

  return (
    <div className="px-6 py-3 flex items-center justify-between border-b">
      <Link to={`/${user?.role ?? ''}`}>
        <h1 className="font-bold text-xl">Vending Machine</h1>
      </Link>

      <div className="flex items-center gap-3">
        <UserCircle className="h-4 w-4" />
        <span className="font-bold text-muted-foreground">
          {user?.username}{' '}
          {isBuyer && <span className="font-normal">({depositFormatted})</span>}
        </span>

        <Separator className="h-6" orientation="vertical" />

        <Button onClick={signOut} variant="destructive">
          <LogOut className="h-4 w-4 mr-2" />
          Sign out
        </Button>
      </div>
    </div>
  );
}
