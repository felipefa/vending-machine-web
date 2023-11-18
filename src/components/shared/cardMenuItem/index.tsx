import { Card, CardContent } from '@/components/ui/card';

import { CardMenuItemProps } from './types';

export function CardMenuItem({ label, icon, onClick }: CardMenuItemProps) {
  return (
    <Card
      className="hover:bg-accent hover:text-accent-foreground hover:cursor-pointer w-[300px]"
      onClick={onClick}
    >
      <CardContent className="flex flex-col items-center justify-center px-6 py-4">
        {icon}
        <div className="mt-4 text-md font-medium">{label}</div>
      </CardContent>
    </Card>
  );
}
