import type { CategoryFilter } from '@/lib/types';
import styles from './SelectedWork.module.css';

export type WorkFilterOption = {
  category: CategoryFilter;
  label: string;
};

type WorkFiltersProps = {
  value: CategoryFilter;
  options: WorkFilterOption[];
  label: string;
  onChange: (category: CategoryFilter) => void;
};

export default function WorkFilters({ value, options, label, onChange }: WorkFiltersProps) {
  return (
    <div className={styles.filters} role="group" aria-label={label}>
      {options.map(({ category, label: optionLabel }) => (
        <button
          key={category}
          className={styles.filter}
          type="button"
          aria-pressed={value === category}
          onClick={() => onChange(category)}
        >
          {optionLabel}
        </button>
      ))}
    </div>
  );
}
