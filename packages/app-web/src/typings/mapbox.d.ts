declare module '@mapbox/mapbox-sdk/lib/browser/browser-client' {
  import MapiClient, { SdkConfig } from '@mapbox/mapbox-sdk/lib/classes/mapi-client';
  export default function createBrowserClient(config: SdkConfig): MapiClient;
}
