'use client';

import React, { useState, useEffect } from 'react';
import type { Car } from '@/types';
import { carsData } from '@/data/cars';
import CarCard from '@/components/cars/CarCard';
import CarSearch from '@/components/cars/CarSearch';
import PageTitle from '@/components/common/PageTitle';
import { List } from 'lucide-react';

export default function HomePage() {
  const [filteredCars, setFilteredCars] = useState<Car[]>(carsData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300); // Short delay to allow initial animation setup
    return () => clearTimeout(timer);
  }, []);

  const handleFilterChange = (newFilteredCars: Car[]) => {
    setFilteredCars(newFilteredCars);
  };

  return (
    <div className="w-full">
      <PageTitle 
        title="Explore F1 Cars" 
        subtitle="Discover legendary machines from the history of Formula 1."
        icon={<List className="w-8 h-8" />}
      />
      
      <CarSearch cars={carsData} onFilterChange={handleFilterChange} />

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-card rounded-lg shadow-md p-4 space-y-3 animate-pulse">
              <div className="h-48 bg-muted rounded"></div>
              <div className="h-6 w-3/4 bg-muted rounded"></div>
              <div className="h-4 w-1/2 bg-muted rounded"></div>
              <div className="h-4 w-5/6 bg-muted rounded"></div>
            </div>
          ))}
        </div>
      ) : filteredCars.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car, index) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 animate-fade-in">
          <h2 className="text-2xl font-semibold text-foreground mb-2">No Cars Found</h2>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
}
