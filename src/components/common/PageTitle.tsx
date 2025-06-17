import React from 'react';
import { cn } from '@/lib/utils';

interface PageTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  icon?: React.ReactNode;
}

const PageTitle: React.FC<PageTitleProps> = ({ title, subtitle, className, icon }) => {
  return (
    <div className={cn("mb-8 text-center md:text-left animate-fade-in", className)}>
      <h1 className="font-headline text-3xl md:text-4xl font-bold text-primary flex items-center justify-center md:justify-start gap-3">
        {icon}
        {title}
      </h1>
      {subtitle && <p className="mt-2 text-lg text-muted-foreground">{subtitle}</p>}
    </div>
  );
};

export default PageTitle;
