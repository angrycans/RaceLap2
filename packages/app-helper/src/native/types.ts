import type NSSQLite from 'react-native-sqlite-storage';
export type { WebView } from 'react-native-webview';
import type NSRNFS from 'react-native-fs';

/** SQLite */
export type SQLite = typeof NSSQLite;
/** FS */
export type RNFS = typeof NSRNFS;

/** SQLite Namespace */
export { NSSQLite, NSRNFS }
