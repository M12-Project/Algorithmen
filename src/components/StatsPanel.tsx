import { ArrowUpDown, GitCompare, Timer } from 'lucide-react';

interface StatsPanelProps {
  comparisons: number;
  swaps: number;
  elapsed: number;
}

export default function StatsPanel({ comparisons, swaps, elapsed }: StatsPanelProps) {
  return (
    <div className="flex items-center gap-6 px-6 py-3 bg-card/50 border-b border-border">
      <div className="flex items-center gap-2">
        <GitCompare className="w-4 h-4 text-accent" />
        <span className="text-xs font-mono text-muted-foreground">Vergleiche</span>
        <span className="text-sm font-mono font-bold text-foreground">{comparisons}</span>
      </div>
      <div className="flex items-center gap-2">
        <ArrowUpDown className="w-4 h-4 text-primary" />
        <span className="text-xs font-mono text-muted-foreground">Swaps</span>
        <span className="text-sm font-mono font-bold text-foreground">{swaps}</span>
      </div>
      <div className="flex items-center gap-2">
        <Timer className="w-4 h-4 text-success" />
        <span className="text-xs font-mono text-muted-foreground">Laufzeit</span>
        <span className="text-sm font-mono font-bold text-foreground">{elapsed.toFixed(0)}ms</span>
      </div>
    </div>
  );
}
