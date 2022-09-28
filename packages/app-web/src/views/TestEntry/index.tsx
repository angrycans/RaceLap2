import { type FC } from 'react';
import { Button } from 'antd-mobile';
import { apis, fs } from '@race-lap/app-helper/dist/web';
import './index.module.less';


const PageHome: FC = () => {
  return (
    <div styleName="page-wrapper">
      <h1>test entry</h1>
      <Button onClick={async () => {
        const res = await apis.racetrack.getList();
        console.log(res)
      }}>Button</Button>
      <Button onClick={async () => {
        const res = await fs.readFile('/var/mobile/Containers/Data/Application/9BC3C8D1-A147-45D1-A04F-5272B6D4EC22/Documents/test.txt');
        console.log(res)
      }}>Test FS</Button>
    </div>
  );
};

export default PageHome;
