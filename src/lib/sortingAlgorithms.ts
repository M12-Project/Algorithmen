export type BarState = 'default' | 'comparing' | 'sorted' | 'active';

export interface SortStep {
  array: number[];
  states: BarState[];
  comparisons: number;
  swaps: number;
}

export function* bubbleSort(arr: number[]): Generator<SortStep> {
  const a = [...arr];
  const n = a.length;
  const states: BarState[] = new Array(n).fill('default');
  let comparisons = 0;
  let swaps = 0;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      states.fill('default');
      for (let k = n - i; k < n; k++) states[k] = 'sorted';
      states[j] = 'comparing';
      states[j + 1] = 'comparing';
      comparisons++;
      yield { array: [...a], states: [...states], comparisons, swaps };

      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swaps++;
        states[j] = 'active';
        states[j + 1] = 'active';
        yield { array: [...a], states: [...states], comparisons, swaps };
      }
    }
    states[n - i - 1] = 'sorted';
  }
  states.fill('sorted');
  yield { array: [...a], states: [...states], comparisons, swaps };
}

export function* selectionSort(arr: number[]): Generator<SortStep> {
  const a = [...arr];
  const n = a.length;
  const states: BarState[] = new Array(n).fill('default');
  let comparisons = 0;
  let swaps = 0;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    states.fill('default');
    for (let k = 0; k < i; k++) states[k] = 'sorted';
    states[i] = 'active';

    for (let j = i + 1; j < n; j++) {
      states[j] = 'comparing';
      comparisons++;
      yield { array: [...a], states: [...states], comparisons, swaps };
      if (a[j] < a[minIdx]) {
        if (minIdx !== i) states[minIdx] = 'default';
        minIdx = j;
      } else {
        states[j] = 'default';
      }
    }

    if (minIdx !== i) {
      [a[i], a[minIdx]] = [a[minIdx], a[i]];
      swaps++;
    }
    states[i] = 'sorted';
    if (minIdx !== i) states[minIdx] = 'default';
    yield { array: [...a], states: [...states], comparisons, swaps };
  }
  states.fill('sorted');
  yield { array: [...a], states: [...states], comparisons, swaps };
}

export function* insertionSort(arr: number[]): Generator<SortStep> {
  const a = [...arr];
  const n = a.length;
  const states: BarState[] = new Array(n).fill('default');
  let comparisons = 0;
  let swaps = 0;

  states[0] = 'sorted';
  yield { array: [...a], states: [...states], comparisons, swaps };

  for (let i = 1; i < n; i++) {
    const key = a[i];
    let j = i - 1;
    states[i] = 'active';
    yield { array: [...a], states: [...states], comparisons, swaps };

    while (j >= 0 && a[j] > key) {
      comparisons++;
      a[j + 1] = a[j];
      swaps++;
      states[j + 1] = 'comparing';
      states[j] = 'active';
      yield { array: [...a], states: [...states], comparisons, swaps };
      states[j + 1] = 'sorted';
      j--;
    }
    if (j >= 0) comparisons++;
    a[j + 1] = key;

    for (let k = 0; k <= i; k++) states[k] = 'sorted';
    yield { array: [...a], states: [...states], comparisons, swaps };
  }
  states.fill('sorted');
  yield { array: [...a], states: [...states], comparisons, swaps };
}

export function* quickSort(arr: number[]): Generator<SortStep> {
  const a = [...arr];
  const n = a.length;
  const states: BarState[] = new Array(n).fill('default');
  let comparisons = 0;
  let swaps = 0;

  function* partition(low: number, high: number): Generator<SortStep, number> {
    const pivot = a[high];
    states[high] = 'active';
    let i = low - 1;

    for (let j = low; j < high; j++) {
      states[j] = 'comparing';
      comparisons++;
      yield { array: [...a], states: [...states], comparisons, swaps };

      if (a[j] < pivot) {
        i++;
        [a[i], a[j]] = [a[j], a[i]];
        swaps++;
        states[j] = 'default';
        states[i] = 'default';
        yield { array: [...a], states: [...states], comparisons, swaps };
      } else {
        states[j] = 'default';
      }
    }
    [a[i + 1], a[high]] = [a[high], a[i + 1]];
    swaps++;
    states[high] = 'default';
    states[i + 1] = 'sorted';
    yield { array: [...a], states: [...states], comparisons, swaps };
    return i + 1;
  }

  function* sort(low: number, high: number): Generator<SortStep> {
    if (low < high) {
      const pi: number = yield* partition(low, high);
      yield* sort(low, pi - 1);
      yield* sort(pi + 1, high);
    } else if (low === high) {
      states[low] = 'sorted';
      yield { array: [...a], states: [...states], comparisons, swaps };
    }
  }

  yield* sort(0, n - 1);
  states.fill('sorted');
  yield { array: [...a], states: [...states], comparisons, swaps };
}

export function* mergeSort(arr: number[]): Generator<SortStep> {
  const a = [...arr];
  const n = a.length;
  const states: BarState[] = new Array(n).fill('default');
  let comparisons = 0;
  let swaps = 0;

  function* merge(left: number, mid: number, right: number): Generator<SortStep> {
    const leftArr = a.slice(left, mid + 1);
    const rightArr = a.slice(mid + 1, right + 1);

    let i = 0;
    let j = 0;
    let k = left;

    while (i < leftArr.length && j < rightArr.length) {
      states.fill('default');
      states[k] = 'active';
      comparisons++;

      yield { array: [...a], states: [...states], comparisons, swaps };

      if (leftArr[i] <= rightArr[j]) {
        a[k] = leftArr[i];
        i++;
      } else {
        a[k] = rightArr[j];
        j++;
      }
      swaps++;
      k++;

      yield { array: [...a], states: [...states], comparisons, swaps };
    }

    while (i < leftArr.length) {
      states.fill('default');
      states[k] = 'active';
      a[k] = leftArr[i];
      i++;
      k++;
      swaps++;
      yield { array: [...a], states: [...states], comparisons, swaps };
    }

    while (j < rightArr.length) {
      states.fill('default');
      states[k] = 'active';
      a[k] = rightArr[j];
      j++;
      k++;
      swaps++;
      yield { array: [...a], states: [...states], comparisons, swaps };
    }

    for (let x = left; x <= right; x++) {
      states[x] = 'sorted';
    }
    yield { array: [...a], states: [...states], comparisons, swaps };
  }

  function* sort(left: number, right: number): Generator<SortStep> {
    if (left >= right) {
      states[left] = 'sorted';
      yield { array: [...a], states: [...states], comparisons, swaps };
      return;
    }

    const mid = Math.floor((left + right) / 2);

    yield* sort(left, mid);
    yield* sort(mid + 1, right);
    yield* merge(left, mid, right);
  }

  yield* sort(0, n - 1);

  states.fill('sorted');
  yield { array: [...a], states: [...states], comparisons, swaps };
}

export const algorithms = {
  'Bubble Sort': bubbleSort,
  'Selection Sort': selectionSort,
  'Insertion Sort': insertionSort,
  'Quick Sort': quickSort,
  'Merge Sort': mergeSort,
} as const;

export type AlgorithmName = keyof typeof algorithms;

export function generateRandomArray(size: number): number[] {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 95) + 5);
}
