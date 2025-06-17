import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-card shadow-md mt-auto">
      <div className="container mx-auto px-4 py-6 text-center text-muted-foreground">
        <p className="flex items-center justify-center gap-1">
          &copy; {currentYear} Apex Racers. Built with <Heart className="w-4 h-4 text-primary fill-primary" /> for F1 enthusiasts.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
