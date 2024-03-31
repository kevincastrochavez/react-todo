import React from 'react';
import { useSetTodos } from '../TodosProvider';

import { Checkbox } from './Checkbox';

/**
 * Custom component for the checkbox
 * @param {Object} row - the row object
 * @returns {JSX} the columns
 */
function CheckboxWrapper({ row }) {
  const { setUncheckedRowId } = useSetTodos();

  function handleUncheck() {
    const { original } = row;
    setUncheckedRowId(original.id);
  }

  return (
    <Checkbox
      defaultChecked
      onCheckedChange={handleUncheck}
      aria-label='Select row'
    />
  );
}

export default CheckboxWrapper;
