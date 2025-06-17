import type { Car } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Users, Cog } from 'lucide-react';

interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  return (
    <Link href={`/cars/${car.id}`} className="block group animate-slide-in-up opacity-0" style={{ animationDelay: `${Math.random() * 0.5}s` }}>
      <Card className="h-full flex flex-col overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1">
        <CardHeader className="p-0 relative">
          <Image
            src={car.images[0]}
            alt={`Image of ${car.carName}`}
            width={600}
            height={400}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
            data-ai-hint={`${car.team} race car`}
            priority={car.id === 'mercedes-w11-2020' || car.id === 'ferrari-f2004-2004'} // Prioritize first few important images
          />
           <div className="absolute top-2 right-2">
            <Badge variant="default" className="bg-primary/80 backdrop-blur-sm text-primary-foreground">{car.year}</Badge>
          </div>
        </CardHeader>
        <CardContent className="flex-grow p-4">
          <CardTitle className="font-headline text-xl mb-2 text-primary group-hover:text-accent transition-colors">{car.carName}</CardTitle>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p className="flex items-center gap-2">
              <Users className="w-4 h-4 text-accent" />
              Team: {car.team}
            </p>
            <p className="flex items-center gap-2">
              <Cog className="w-4 h-4 text-accent" />
              Engine: <span className="truncate w-40">{car.engine}</span>
            </p>
          </div>
        </CardContent>
        <CardFooter className="p-4 border-t">
          <p className="text-xs text-accent font-medium">View Details &rarr;</p>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default CarCard;
