import { carsData } from '@/data/cars';
import type { Car, CarTechnicalSpec } from '@/types';
import { generateCarDescription } from '@/ai/flows/generate-car-description';
import ImageGallery from '@/components/cars/ImageGallery';
import PageTitle from '@/components/common/PageTitle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CalendarDays, Cog, Users, Weight, Zap, Thermometer, CheckCircle, Trophy, Palette, ShieldQuestion } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

async function getCarDataWithAIDescription(id: string): Promise<Car | null> {
  const car = carsData.find(c => c.id === id);
  if (!car) return null;

  let aiDescription = car.aiDescription;
  if (!aiDescription) { // Generate if not already "cached" (for this demo)
    try {
      const aiOutput = await generateCarDescription({
        team: car.team,
        year: car.year,
        engine: car.engine,
        carName: car.carName,
      });
      aiDescription = aiOutput.description;
    } catch (error) {
      console.error(`Failed to generate AI description for ${car.carName}:`, error);
      aiDescription = "An engaging, AI-powered description of this iconic car is being fine-tuned and will be available soon. Check back later for fascinating insights and historical context!";
    }
  }
  return { ...car, aiDescription };
}

export async function generateStaticParams() {
  return carsData.map((car) => ({
    id: car.id,
  }));
}

const CarDetailPage = async ({ params }: { params: { id: string } }) => {
  const car = await getCarDataWithAIDescription(params.id);

  if (!car) {
    return (
      <div className="text-center py-12">
        <PageTitle title="Car Not Found" subtitle="The car you are looking for does not exist." />
        <Button asChild variant="link">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Go Back to Listings
          </Link>
        </Button>
      </div>
    );
  }

  const techSpecs: CarTechnicalSpec[] = [
    { label: 'Team', value: car.team, icon: Users },
    { label: 'Year', value: car.year.toString(), icon: CalendarDays },
    { label: 'Engine', value: car.engine, icon: Cog },
    { label: 'Chassis', value: car.chassis || 'N/A', icon: Palette /* Using Palette as a generic chassis icon */ },
    { label: 'Suspension', value: car.suspension || 'N/A', icon: Zap /* Using Zap for suspension tech */ },
    { label: 'Gearbox', value: car.gearbox || 'N/A', icon: Cog },
    { label: 'Weight', value: car.weight || 'N/A', icon: Weight },
    { label: 'Fuel', value: car.fuel || 'N/A', icon: Thermometer /* Using Thermometer for Fuel */ },
    { label: 'Tires', value: car.tires || 'N/A', icon: ShieldQuestion /* Using ShieldQuestion for Tires */ },
    { label: 'Championship Standing', value: car.championshipStanding || 'N/A', icon: Trophy },
  ];
  
  const carHintForGallery = `${car.team} ${car.carName}`;

  return (
    <div className="animate-fade-in">
      <Button asChild variant="outline" className="mb-6 group">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to Listings
        </Link>
      </Button>

      <PageTitle title={car.carName} subtitle={`${car.team} - ${car.year}`} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-headline text-accent">Image Gallery</CardTitle>
            </CardHeader>
            <CardContent>
              <ImageGallery images={car.images} altTextPrefix={car.carName} carHint={carHintForGallery} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-headline text-accent">AI-Powered Description</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none prose-p:text-foreground prose-headings:text-accent">
              {/* Tailwind prose styles are for markdown, here we just need basic text styling */}
              <p className="text-base leading-relaxed whitespace-pre-line">{car.aiDescription}</p>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-6">
           <Card>
            <CardHeader>
              <CardTitle className="text-xl font-headline text-accent">Key Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {techSpecs.map((spec) => (
                spec.value !== 'N/A' && (
                  <div key={spec.label} className="flex items-start">
                    {spec.icon && <spec.icon className="w-5 h-5 mr-3 mt-0.5 text-primary flex-shrink-0" />}
                    <div>
                      <p className="font-semibold text-foreground">{spec.label}</p>
                      <p className="text-sm text-muted-foreground">{spec.value}</p>
                    </div>
                  </div>
                )
              ))}
            </CardContent>
          </Card>

          {car.drivers && car.drivers.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-headline text-accent">Drivers</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1">
                  {car.drivers.map(driver => (
                    <li key={driver} className="text-foreground flex items-center">
                      <Users className="w-4 h-4 mr-2 text-primary" /> {driver}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
          
          {car.keyFeatures && car.keyFeatures.length > 0 && (
             <Card>
              <CardHeader>
                <CardTitle className="text-xl font-headline text-accent">Key Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {car.keyFeatures.map(feature => (
                    <li key={feature} className="flex items-start text-foreground">
                      <CheckCircle className="w-5 h-5 mr-2 mt-0.5 text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarDetailPage;
