import type { BridgeFS } from '../native/createBridgeFS';
import type { Apis } from './apis';
import { createBridge } from './bridge';

export const apis = createBridge<Apis>({});
export const fs = createBridge<BridgeFS>({});
