import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  onLoad?: () => void;
}

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  onLoad,
  ...props
}: OptimizedImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (priority) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setLoaded(true);
        onLoad?.();
      };
      img.onerror = () => setError(true);
    }
  }, [src, priority, onLoad]);

  const handleLoad = () => {
    setLoaded(true);
    onLoad?.();
  };
  const handleError = () => setError(true);

  // Generate srcSet for responsive images
  const generateSrcSet = () => {
    if (!width) return undefined;
    
    const sizes = [0.5, 1, 1.5, 2];
    return sizes
      .map((size) => {
        const w = Math.round(width * size);
        return `${src}?w=${w} ${w}w`;
      })
      .join(', ');
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-gray-100',
        className
      )}
      style={{
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : 'auto',
      }}
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        onLoad={handleLoad}
        onError={handleError}
        srcSet={generateSrcSet()}
        sizes={width ? `${width}px` : '100vw'}
        className={cn(
          'transition-opacity duration-300',
          loaded ? 'opacity-100' : 'opacity-0',
          error ? 'hidden' : 'block'
        )}
        {...props}
      />
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <span className="text-sm text-gray-500">Failed to load image</span>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage; 