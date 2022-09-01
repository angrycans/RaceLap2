import { type FC } from 'react';
import { Button } from 'antd-mobile';
import { useMount } from 'ahooks';
import { apis } from '@race-lap/app-helper/dist/web';
import './index.module.less';


const PageHome: FC = () => {
  useMount(async () => {
    // const res = await apis.racetrack.getList();
    // console.log(res)
  })

  return (
    <div styleName="page-wrapper">
      <h1>test entry</h1>
      <Button onClick={async () => {
        const res = await apis.racetrack.getList();
        console.log(res)
      }}>Button</Button>
    </div>
  );
};

export default PageHome;
