import { BarState } from '@/lib/sortingAlgorithms';

interface BarChartProps {
  array: number[];
  states: BarState[];
}

const stateClass: Record<BarState, string> = {
  default: 'bar-default',
  comparing: 'bar-comparing',
  sorted: 'bar-sorted',
  active: 'bar-active',
};

export default function BarChart({ array, states }: BarChartProps) {
  const max = Math.max(...array, 1);

  return (
    <div className="flex-1 flex items-end gap-[2px] px-6 pb-6 pt-4 min-h-0">
      {array.map((value, i) => (
        <div
          key={i}
          className={`flex-1 rounded-t-sm transition-all duration-100 ease-out ${stateClass[states[i] || 'default']}`}
          style={{ height: `${(value / max) * 100}%` }}
        />
      ))}
    </div>
  );
}
