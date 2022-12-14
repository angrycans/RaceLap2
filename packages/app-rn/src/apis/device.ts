const host = 'http://172.19.9.90';

interface RecordInfo {
  /** 远程文件路径 */
  remotePath: string;
  /** 文件大小 */
  fileSize: number;
  /** 文件名称 */
  filename: string;
}

/**
 * 获取记录列表
 */
export async function getRecordInfoList() {
  const dataText = await fetch(`${host}/listsdjson`).then(res => res.text());
  // 文件名规则：/子目录/文件名.格式_文件大小 如：/xlapdata/20220907113903.xld_4028,/xlapdata/20220907121141.xld_5018
  return dataText
    .split(',')
    .map(filePathChunk => {
      const matches = filePathChunk.trim().match(/([\s\S]+)_(\d+)$/);
      if (matches) {
        const [, remotePath, fileSize] = matches;

        if (!remotePath.endsWith('.xld')) {
          return null;
        }

        return {
          // /down?file=/XLAPDATA/xlap20221129095719.txt
          remotePath: `${host}/down?file=${encodeURIComponent(remotePath)}`,
          fileSize: +fileSize,
          filename: remotePath.split('/').pop(),
        };
      } else {
        return null;
      }
    })
    .filter(Boolean) as any as RecordInfo[];
}
