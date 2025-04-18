import { getLovableImageUrl, isValidLovableImage } from '@/lib/images';
import OptimizedImage from './optimized-image';
import { cn } from '@/lib/utils';

interface LovableImageProps {
  filename: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  onLoad?: () => void;
}

const LovableImage = ({
  filename,
  alt,
  width,
  height,
  className,
  priority = false,
  onLoad,
}: LovableImageProps) => {
  if (!isValidLovableImage(filename)) {
    console.warn(`Invalid lovable image filename: ${filename}`);
    return null;
  }

  return (
    <OptimizedImage
      src={getLovableImageUrl(filename)}
      alt={alt}
      width={width}
      height={height}
      className={cn('rounded-lg', className)}
      priority={priority}
      onLoad={onLoad}
    />
  );
};

export default LovableImage; 