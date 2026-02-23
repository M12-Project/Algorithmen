import { AlgorithmName } from '@/lib/sortingAlgorithms';
import { BarChart3 } from 'lucide-react';

const algorithmInfo: Record<AlgorithmName, { complexity: string; description: string }> = {
  'Bubble Sort': {
    complexity: 'O(n²)',
    description: 'Vergleicht benachbarte Elemente und tauscht sie',
  },
  'Selection Sort': {
    complexity: 'O(n²)',
    description: 'Findet das Minimum und tauscht es an die richtige Stelle',
  },
  'Insertion Sort': {
    complexity: 'O(n²)',
    description: 'Fügt jedes Element an der richtigen Stelle ein',
  },
  'Quick Sort': {
    complexity: 'O(n log n)',
    description: 'Teilt das Array rekursiv um ein Pivot-Element',
  },
  'Merge Sort': {
    complexity: 'O(n log n)',
    description: 'Teilt das Array in Hälften und führt sie sortiert wieder zusammen',
  },
};

interface SidebarProps {
  selected: AlgorithmName;
  onSelect: (name: AlgorithmName) => void;
  disabled: boolean;
}

export default function Sidebar({ selected, onSelect, disabled }: SidebarProps) {
  return (
    <aside className="w-64 shrink-0 bg-sidebar border-r border-sidebar-border flex flex-col h-screen sticky top-0">
      <div className="p-5 border-b border-sidebar-border flex items-center gap-3">
        <BarChart3 className="w-6 h-6 text-primary" />
        <h1 className="text-lg font-bold font-mono text-sidebar-accent-foreground glow-text tracking-tight">
          AlgoChart
        </h1>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        <p className="px-3 py-2 text-xs font-mono uppercase tracking-widest text-muted-foreground">
          Algorithmen
        </p>
        {(Object.keys(algorithmInfo) as AlgorithmName[]).map((name) => (
          <button
            key={name}
            onClick={() => onSelect(name)}
            disabled={disabled}
            className={`w-full text-left px-3 py-3 rounded-md transition-all duration-200 group ${
              selected === name
                ? 'bg-primary/15 border border-primary/30'
                : 'hover:bg-sidebar-accent border border-transparent'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <div className="flex items-center justify-between">
              <span className={`text-sm font-medium ${selected === name ? 'text-primary' : 'text-sidebar-foreground'}`}>
                {name}
              </span>
              <span className={`text-xs font-mono ${selected === name ? 'text-primary/80' : 'text-muted-foreground'}`}>
                {algorithmInfo[name].complexity}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              {algorithmInfo[name].description}
            </p>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
          <div className="w-3 h-3 rounded-sm bar-default" />
          <span>Standard</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono mt-1.5">
          <div className="w-3 h-3 rounded-sm bar-comparing" />
          <span>Vergleich</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono mt-1.5">
          <div className="w-3 h-3 rounded-sm bar-sorted" />
          <span>Sortiert</span>
        </div>
      </div>
    </aside>
  );
}