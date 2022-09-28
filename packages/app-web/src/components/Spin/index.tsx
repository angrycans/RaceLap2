import { type FC } from 'react';
import { DotLoading } from 'antd-mobile';
import './index.module.less';

const Spin: FC = () => {
  return (
    <div styleName='spin-wrapper'>
      <DotLoading styleName='dot-loading' color='primary' />
    </div>
  )
}

export default Spin
