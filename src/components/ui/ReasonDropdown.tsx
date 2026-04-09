import React from 'react';
import { CHURN_REASONS } from '../../lib/constants';

interface ReasonDropdownProps {
  value: string | null;
  onChange: (reason: string | null) => void;
}

export function ReasonDropdown({ value, onChange }: ReasonDropdownProps) {
  return (
    <select
      className="min-w-[120px] px-4 py-2 rounded border-2 bg-gray-900 text-gray-100 border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-center"
      value={value ?? ''}
      onChange={e => onChange(e.target.value === '' ? null : e.target.value)}
      aria-label="Churn reason filter"
    >
      <option value="" className="text-center">All Reasons</option>
      {CHURN_REASONS.map(r => (
        <option key={r} value={r} className="text-center">{r}</option>
      ))}
    </select>
  );
}
