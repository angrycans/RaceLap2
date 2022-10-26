interface Release {
  /** ID identifying this unique release. */
  id: number;
  /** The app's name (extracted from the uploaded release). */
  app_name: string;
  /** The app's display name. */
  app_display_name: string;
  /** The release's version. */
  version: string;
  /** The release's size in bytes. */
  size: string;
  /** MD5 checksum of the release binary. */
  fingerprint: string;
  /** The URL that hosts the binary for this release. */
  download_url: string;
}

/**
 * 获取当前最新 release
 * @see https://openapi.appcenter.ms/#/distribute/releases_getLatestByDistributionGroup
 */
export function getLatestRelease(): Promise<Release> {
  return fetch(
    'https://api.appcenter.ms/v0.1/apps/racelap/racelap-web/distribution_groups/Production/releases/latest',
  ).then(res => res.json());
}
