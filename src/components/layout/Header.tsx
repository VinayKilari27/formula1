import Link from 'next/link';
import { CarFront } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-card shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-2xl font-headline font-bold text-primary hover:opacity-80 transition-opacity">
          <CarFront className="w-8 h-8" />
          Apex Racers
        </Link>
        <nav>
          {/* Navigation links can be added here if needed */}
          {/* Example: <Link href="/about" className="text-foreground hover:text-accent transition-colors">About</Link> */}
        </nav>
      </div>
    </header>
  );
};

export default Header;
