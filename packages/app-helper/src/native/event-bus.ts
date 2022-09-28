import mitt from 'mitt';
import { EventBusEventMap } from '../types';

// @ts-ignore
export const eventBus = mitt<EventBusEventMap>();
export default eventBus;
