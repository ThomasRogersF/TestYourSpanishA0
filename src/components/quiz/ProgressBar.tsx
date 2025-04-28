
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  progress: number;
  className?: string;
}

const ProgressBar = ({ progress, className }: ProgressBarProps) => {
  // Ensure progress is between 0-100
  const safeProgress = Math.max(0, Math.min(100, progress));
  
  return (
    <div className={cn("quiz-progress-bar", className)}>
      <div 
        className="quiz-progress-indicator" 
        style={{ width: `${safeProgress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
