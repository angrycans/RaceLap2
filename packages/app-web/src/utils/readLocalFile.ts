import { fs } from '@race-lap/app-helper/dist/web';

/**
 * 读取本地文件内容
 * @param filePath 文件地址
 */
export async function readLocalFile(filePath: string) {
  const isFileProtocol = location.protocol === 'file:';
  if (isFileProtocol) {
    return fetch(`file://${filePath}`).then(res => res.text());
  } else {
    const { data } = await fs.readFile(filePath);
    return data || ''
  }
}

export default readLocalFile;
