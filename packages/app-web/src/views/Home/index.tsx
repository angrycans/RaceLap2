import { type FC } from 'react';
import { Button } from 'antd-mobile'
import './index.module.less';


const PageHome: FC = () => {
  return (
    <div styleName="page-wrapper">
      <h1>home</h1>
      <Button>Button</Button>
    </div>
  );
};

export default PageHome;
