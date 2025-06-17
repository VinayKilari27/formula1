'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ImageGalleryProps {
  images: string[];
  altTextPrefix: string;
  carHint: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, altTextPrefix, carHint }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return <p className="text-muted-foreground">No images available for this car.</p>;
  }

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="space-y-4">
      <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg">
        <Image
          src={images[currentIndex]}
          alt={`${altTextPrefix} - Image ${currentIndex + 1}`}
          layout="fill"
          objectFit="cover"
          className="transition-opacity duration-500 ease-in-out"
          data-ai-hint={carHint}
          priority
        />
        {images.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrev}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-background/50 hover:bg-background/80 text-foreground"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-background/50 hover:bg-background/80 text-foreground"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
          {images.map((src, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={cn(
                "aspect-video overflow-hidden rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
                currentIndex === index ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : "opacity-70 hover:opacity-100 transition-opacity"
              )}
              aria-label={`View image ${index + 1}`}
            >
              <Image
                src={src}
                alt={`${altTextPrefix} - Thumbnail ${index + 1}`}
                width={150}
                height={100}
                className="w-full h-full object-cover"
                data-ai-hint={carHint}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
