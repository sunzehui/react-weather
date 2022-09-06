import { useEffect, useState } from "react";
import type { DependencyList, EffectCallback } from "react";
import type { DebounceOptions } from "ahooks/es/useDebounce/debounceOptions";
import { useDebounceFn } from "ahooks";
import { useUpdateEffect } from "ahooks";

export function useDebounceEffect(
  effect: EffectCallback,
  deps?: DependencyList,
  options?: DebounceOptions
) {
  const [flag, setFlag] = useState({});

  const { run } = useDebounceFn(() => {
    setFlag({});
  }, options);

  useUpdateEffect(() => {
    return run();
  }, deps);

  useUpdateEffect(effect, [flag]);
}
