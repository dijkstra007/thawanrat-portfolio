import type { ProjectVisual } from '@/lib/types';
import styles from './visuals.module.css';

const visualClasses: Record<ProjectVisual, string> = {
  fruit: styles.fruit,
  blue: styles.blue,
  water: styles.water,
  ink: styles.ink,
  peach: styles.peach,
  electric: styles.electric,
  paper: styles.paper,
  violet: styles.violet,
  sun: styles.sun,
  red: styles.red,
  lime: styles.lime,
  slate: styles.slate,
};

export function visualClass(visual: ProjectVisual) {
  return visualClasses[visual];
}
