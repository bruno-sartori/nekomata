import { createContext } from '@lit/context';
import { TimelineContext } from '../@types/contexts';

export const timelineContext = createContext<TimelineContext>('timeline-context');

export const initialTimelineContext: TimelineContext = {
  duration: 0,
  metric: 'hours',
  fill: false,
};
