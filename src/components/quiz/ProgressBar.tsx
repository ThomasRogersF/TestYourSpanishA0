
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  progress: number;
  className?: string;
}

const ProgressBar = ({ progress, className }: ProgressBarProps) => {
  // Ensure progress is between 0-100
  const safeProgress = Math.max(0, Math.min(100, progress));
  
  return (
    <div className={cn("w-full mb-6", className)}>
      <Progress 
        value={safeProgress} 
        className="h-2 bg-brand-background" 
      />
      <div className="text-xs text-gray-500 mt-1 text-right">
        {safeProgress}% complete
      </div>
    </div>
  );
};

export default ProgressBar;
