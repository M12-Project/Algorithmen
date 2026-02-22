import { useState, useRef, useCallback, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import BarChart from '@/components/BarChart';
import Controls from '@/components/Controls';
import StatsPanel from '@/components/StatsPanel';
import {
  AlgorithmName,
  BarState,
  SortStep,
  algorithms,
  generateRandomArray,
} from '@/lib/sortingAlgorithms';

const Index = () => {
  const [algorithm, setAlgorithm] = useState<AlgorithmName>('Bubble Sort');
  const [arraySize, setArraySize] = useState(50);
  const [speed, setSpeed] = useState(30);
  const [array, setArray] = useState<number[]>(() => generateRandomArray(50));
  const [states, setStates] = useState<BarState[]>(() => new Array(50).fill('default'));
  const [isRunning, setIsRunning] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  const runningRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  const reset = useCallback((newSize?: number) => {
    runningRef.current = false;
    setIsRunning(false);
    setIsSorted(false);
    setComparisons(0);
    setSwaps(0);
    setElapsed(0);
    if (timerRef.current) clearInterval(timerRef.current);
    const size = newSize ?? arraySize;
    const newArr = generateRandomArray(size);
    setArray(newArr);
    setStates(new Array(size).fill('default'));
  }, [arraySize]);

  const handleArraySizeChange = useCallback((size: number) => {
    setArraySize(size);
    reset(size);
  }, [reset]);

  const handleAlgorithmChange = useCallback((name: AlgorithmName) => {
    setAlgorithm(name);
    reset();
  }, [reset]);

  const start = useCallback(async () => {
    if (isRunning || isSorted) return;
    setIsRunning(true);
    runningRef.current = true;
    setComparisons(0);
    setSwaps(0);
    setElapsed(0);

    const startTime = performance.now();
    timerRef.current = setInterval(() => {
      setElapsed(performance.now() - startTime);
    }, 50);

    const gen = algorithms[algorithm](array);

    const step = () => {
      if (!runningRef.current) {
        clearInterval(timerRef.current);
        return;
      }
      const next = gen.next();
      if (next.done) {
        runningRef.current = false;
        setIsRunning(false);
        setIsSorted(true);
        clearInterval(timerRef.current);
        setElapsed(performance.now() - startTime);
        return;
      }
      const s = next.value as SortStep;
      setArray(s.array);
      setStates(s.states);
      setComparisons(s.comparisons);
      setSwaps(s.swaps);
      setTimeout(step, speed);
    };

    step();
  }, [algorithm, array, isRunning, isSorted, speed]);

  const stop = useCallback(() => {
    runningRef.current = false;
    setIsRunning(false);
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    return () => {
      runningRef.current = false;
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar selected={algorithm} onSelect={handleAlgorithmChange} disabled={isRunning} />
      <main className="flex-1 flex flex-col min-h-screen">
        <header className="px-6 py-4 border-b border-border">
          <h2 className="text-xl font-bold font-mono text-foreground">
            {algorithm}
          </h2>
        </header>
        <StatsPanel comparisons={comparisons} swaps={swaps} elapsed={elapsed} />
        <div className="flex-1 flex flex-col min-h-0">
          <BarChart array={array} states={states} />
        </div>
        <Controls
          isRunning={isRunning}
          isSorted={isSorted}
          arraySize={arraySize}
          speed={speed}
          onStart={start}
          onStop={stop}
          onReset={() => reset()}
          onArraySizeChange={handleArraySizeChange}
          onSpeedChange={setSpeed}
        />
      </main>
    </div>
  );
};

export default Index;
