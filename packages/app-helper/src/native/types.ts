import type NSRNFS from 'react-native-fs';
import type { NSSQLite } from '../types';
export type { WebView } from 'react-native-webview';

/** SQLite */
export type SQLite = typeof NSSQLite;
/** FS */
export type RNFS = typeof NSRNFS;

/** SQLite Namespace */
export { NSSQLite, NSRNFS }
