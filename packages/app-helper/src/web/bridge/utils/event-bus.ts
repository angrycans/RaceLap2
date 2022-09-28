import mitt from 'mitt';
import { BRIDGE_CALLBACK_NAME } from '../../../constants';


const eventBus = mitt();

declare global {
  interface Window {
    [BRIDGE_CALLBACK_NAME](msg: string): void
  }
}

window[BRIDGE_CALLBACK_NAME] = function (msg) {
  eventBus.emit(BRIDGE_CALLBACK_NAME, msg);
}

export { eventBus }
export default eventBus;
