import { type FC } from 'react';
import { useRoutes } from 'react-router-dom';
import { ConfigProvider } from "antd-mobile";
// import enUS from 'antd-mobile/es/locales/en-US'
import zhUS from 'antd-mobile/es/locales/zh-CN'
import routes from './routes';

const App: FC = () => {
  return (
    <ConfigProvider locale={zhUS} >
      {useRoutes(routes)}
    </ConfigProvider>
  );
};

export default App;
