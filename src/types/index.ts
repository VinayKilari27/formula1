
export interface CarTechnicalSpec {
  label: string;
  value: string;
  icon?: React.ElementType;
}

export interface Car {
  id: string;
  team: string;
  year: number;
  engine: string;
  carName: string;
  drivers: string[];
  chassis?: string;
  suspension?: string;
  gearbox?: string;
  weight?: string;
  fuel?: string;
  tires?: string;
  images: string[]; // URLs for placeholder images
  aiDescription?: string; // To store generated description
  keyFeatures?: string[];
  championshipStanding?: string;
}
