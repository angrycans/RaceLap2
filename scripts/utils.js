// @ts-check

const path = require('path');
const execa = require('execa');

/**
 * @typedef MonoInfo 子包 `package.json` 的 `buildInfo` 字段
 * @property { 'module' } type 包类型
 */

/**
 * @typedef PkgInfo 由 `lerna list --json` 返回的包信息
 * @property { string } name 包名称
 * @property { string } version 包版本
 * @property { string } location 包目录
 * @property { string } dirname 包目录名称
 * @property { boolean } private 是否为私有包
 * @property { MonoInfo } [monoInfo] 包目录
 */

/**
 * @typedef GetPkgInfosOpts 由 `lerna list --json` 返回的包信息
 * @property { boolean } [includePrivate=true] 包名称
 */

/**
 * 获取包信息
 * @param { GetPkgInfosOpts } [opts = {}] 配置项
 * @returns { PkgInfo[] }
 */
function getPkgInfos(opts = { includePrivate: true }) {
  const { includePrivate = false } = opts;
  const listCmdReturn = execa.sync(`lerna list ${includePrivate ? '-a' : ''} --json`, { shell: true })

  if (listCmdReturn.failed) {
    throw new Error(listCmdReturn.stderr);
  }

  /** @type { PkgInfo[] } */
  const PkgBaseInfos = JSON.parse(listCmdReturn.stdout)
  return PkgBaseInfos.map(info => ({
    ...info,
    dirname: path.basename(info.location),
    monoInfo: require(path.join(info.location, 'package.json')).monoInfo
  }));
}

/**
 * @typedef NormalizePackageNameOptions 规范化包名称配置项目
 * @property { boolean } [scope] 是否包含 `scope`。默认为 `true`
 */

/**
 * 规范化包名称
 * @param { string } pkgName 包名称
 * @param { NormalizePackageNameOptions } [opts] 包名称
 */
function normalizePackageName(pkgName, opts = {}) {
  const { scope = true } = opts;
  return pkgName.replace(/@?([^/]+)\/?([^/]?)/, (_, $1, $2) => {
    const scopeName = scope && $2 ? $1 : '';
    const pkgPureName = $2 || $1;
    return [scopeName, pkgPureName].filter(Boolean).join('__');
  })
}

module.exports.getPkgInfos = getPkgInfos;
module.exports.normalizePackageName = normalizePackageName;
