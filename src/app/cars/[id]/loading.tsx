import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, CalendarDays, Cog, Users, Weight, Zap, Thermometer, CheckCircle, Trophy, Palette, ShieldQuestion } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function LoadingCarDetail() {
  return (
    <div className="animate-pulse">
      <Button variant="outline" className="mb-6 opacity-50 cursor-not-allowed">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Listings
      </Button>

      <div className="mb-8">
        <Skeleton className="h-10 w-3/4 md:w-1/2 mb-2" />
        <Skeleton className="h-6 w-1/2 md:w-1/3" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Image Gallery Skeleton */}
          <div className="bg-card p-6 rounded-lg">
            <Skeleton className="h-8 w-1/3 mb-4" /> {/* Gallery Title */}
            <Skeleton className="aspect-video w-full rounded-lg mb-2" />
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="aspect-video w-full rounded-md" />
              ))}
            </div>
          </div>

          {/* AI Description Skeleton */}
          <div className="bg-card p-6 rounded-lg">
            <Skeleton className="h-8 w-1/2 mb-4" /> {/* Description Title */}
            <Skeleton className="h-5 w-full mb-2" />
            <Skeleton className="h-5 w-full mb-2" />
            <Skeleton className="h-5 w-5/6 mb-2" />
            <Skeleton className="h-5 w-full" />
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          {/* Key Details Skeleton */}
          <div className="bg-card p-6 rounded-lg space-y-4">
            <Skeleton className="h-6 w-1/3 mb-3" /> {/* Details Title */}
            {[CalendarDays, Cog, Users, Weight, Zap, Thermometer, Trophy, Palette, ShieldQuestion].map((Icon, i) => (
              <div key={i} className="flex items-start">
                <Skeleton className="w-5 h-5 mr-3 mt-0.5 rounded-full" />
                <div className="w-full">
                  <Skeleton className="h-5 w-1/2 mb-1" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            ))}
          </div>

          {/* Drivers Skeleton (example) */}
          <div className="bg-card p-6 rounded-lg space-y-2">
            <Skeleton className="h-6 w-1/4 mb-3" /> {/* Drivers Title */}
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="h-5 w-1/2" />
          </div>

          {/* Key Features Skeleton (example) */}
           <div className="bg-card p-6 rounded-lg space-y-2">
            <Skeleton className="h-6 w-1/3 mb-3" /> {/* Features Title */}
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-5/6" />
          </div>
        </div>
      </div>
    </div>
  );
}
