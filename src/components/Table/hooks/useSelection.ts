import { useState, useMemo, useCallback } from 'react';
import type { DataItem, UseSelectionProps, UseSelectionReturn } from '../types';

const useSelection = <T extends DataItem>({
  data,
  mode,
  initialSelection = new Set(),
  selectableRowIds,
}: UseSelectionProps<T>): UseSelectionReturn<T> => {
  const [selectedIds, setSelectedIds] = useState<Set<T['id']>>(initialSelection);

  const selectableIds = useMemo(() => {
    return selectableRowIds || new Set(data.map(item => item.id));
  }, [data, selectableRowIds]);

  const isSelected = useCallback((id: T['id']) => {
    return selectedIds.has(id);
  }, [selectedIds]);

  const selectableData = useMemo(() => {
    return data.filter(item => selectableIds.has(item.id));
  }, [data, selectableIds]);

  const isAllSelected = useMemo(() => {
    if (selectableData.length === 0) return false;
    return selectableData.every(item => selectedIds.has(item.id));
  }, [selectableData, selectedIds]);

  const isSomeSelected = useMemo(() => {
    return selectableData.some(item => selectedIds.has(item.id)) && !isAllSelected;
  }, [selectableData, selectedIds, isAllSelected]);

  const selectItem = useCallback((id: T['id']) => {
    if (!selectableIds.has(id)) return;

    setSelectedIds(prev => {
      const newSelected = new Set(prev);
      if (mode === 'single') {
        newSelected.clear();
      }
      newSelected.add(id);
      return newSelected;
    });
  }, [selectableIds, mode]);

  const deselectItem = useCallback((id: T['id']) => {
    setSelectedIds(prev => {
      const newSelected = new Set(prev);
      newSelected.delete(id);
      return newSelected;
    });
  }, []);

  const toggleItem = useCallback((id: T['id']) => {
    if (selectedIds.has(id)) {
      deselectItem(id);
    } else {
      selectItem(id);
    }
  }, [selectedIds, selectItem, deselectItem]);

  const selectAll = useCallback(() => {
    if (mode === 'multiple') {
      setSelectedIds(new Set(selectableData.map(item => item.id)));
    }
  }, [mode, selectableData]);

  const deselectAll = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  const toggleAll = useCallback(() => {
    if (isAllSelected) {
      deselectAll();
    } else {
      selectAll();
    }
  }, [isAllSelected, selectAll, deselectAll]);

  return {
    selectedIds,
    isSelected,
    isAllSelected,
    isSomeSelected,
    selectItem,
    deselectItem,
    toggleItem,
    selectAll,
    deselectAll,
    toggleAll,
  };
};

export default useSelection;