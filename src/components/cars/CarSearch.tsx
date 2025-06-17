'use client';

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import type { Car } from '@/types';

interface CarSearchProps {
  cars: Car[];
  onFilterChange: (filteredCars: Car[]) => void;
}

const CarSearch: React.FC<CarSearchProps> = ({ cars, onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const teams = React.useMemo(() => Array.from(new Set(cars.map(car => car.team))).sort(), [cars]);
  const years = React.useMemo(() => Array.from(new Set(cars.map(car => car.year.toString()))).sort((a, b) => parseInt(b) - parseInt(a)), [cars]);

  useEffect(() => {
    let filtered = cars;

    if (searchTerm) {
      filtered = filtered.filter(car =>
        car.carName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.team.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.engine.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.drivers.some(driver => driver.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedTeam) {
      filtered = filtered.filter(car => car.team === selectedTeam);
    }

    if (selectedYear) {
      filtered = filtered.filter(car => car.year.toString() === selectedYear);
    }

    onFilterChange(filtered);
  }, [searchTerm, selectedTeam, selectedYear, cars, onFilterChange]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedTeam('');
    setSelectedYear('');
  };
  
  const hasActiveFilters = searchTerm || selectedTeam || selectedYear;

  return (
    <div className="mb-8 p-6 bg-card rounded-lg shadow-lg space-y-4 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div className="space-y-1">
          <label htmlFor="search" className="text-sm font-medium text-muted-foreground">Search Cars</label>
          <div className="relative">
            <Input
              id="search"
              type="text"
              placeholder="e.g., MP4/4, Ferrari, Schumacher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          </div>
        </div>
        
        <div className="space-y-1">
          <label htmlFor="team-filter" className="text-sm font-medium text-muted-foreground">Filter by Team</label>
          <Select value={selectedTeam} onValueChange={setSelectedTeam}>
            <SelectTrigger id="team-filter" className="w-full">
              <SelectValue placeholder="All Teams" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Teams</SelectItem>
              {teams.map(team => (
                <SelectItem key={team} value={team}>{team}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <label htmlFor="year-filter" className="text-sm font-medium text-muted-foreground">Filter by Year</label>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger id="year-filter" className="w-full">
              <SelectValue placeholder="All Years" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Years</SelectItem>
              {years.map(year => (
                <SelectItem key={year} value={year}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      {hasActiveFilters && (
        <div className="flex justify-end">
          <Button variant="ghost" onClick={handleResetFilters} className="text-accent hover:text-accent-foreground">
            <X className="mr-2 h-4 w-4" />
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default CarSearch;
