import { Play, Square, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface ControlsProps {
  isRunning: boolean;
  isSorted: boolean;
  arraySize: number;
  speed: number;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
  onArraySizeChange: (size: number) => void;
  onSpeedChange: (speed: number) => void;
}

export default function Controls({
  isRunning,
  isSorted,
  arraySize,
  speed,
  onStart,
  onStop,
  onReset,
  onArraySizeChange,
  onSpeedChange,
}: ControlsProps) {
  return (
    <div className="flex items-center gap-6 px-6 py-4 bg-card border-t border-border">
      <div className="flex items-center gap-2">
        {!isRunning ? (
          <Button
            onClick={onStart}
            disabled={isSorted}
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-mono gap-2"
          >
            <Play className="w-4 h-4" />
            Start
          </Button>
        ) : (
          <Button
            onClick={onStop}
            size="sm"
            variant="destructive"
            className="font-mono gap-2"
          >
            <Square className="w-4 h-4" />
            Stop
          </Button>
        )}
        <Button
          onClick={onReset}
          size="sm"
          variant="outline"
          className="font-mono gap-2 border-border text-foreground hover:bg-secondary"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </Button>
      </div>

      <div className="flex items-center gap-3 flex-1">
        <label className="text-xs font-mono text-muted-foreground whitespace-nowrap">
          Array: {arraySize}
        </label>
        <Slider
          value={[arraySize]}
          onValueChange={([v]) => onArraySizeChange(v)}
          min={10}
          max={200}
          step={5}
          disabled={isRunning}
          className="w-40"
        />
      </div>

      <div className="flex items-center gap-3">
        <label className="text-xs font-mono text-muted-foreground whitespace-nowrap">
          Speed: {speed}ms
        </label>
        <Slider
          value={[speed]}
          onValueChange={([v]) => onSpeedChange(v)}
          min={1}
          max={200}
          step={1}
          className="w-32"
        />
      </div>
    </div>
  );
}
