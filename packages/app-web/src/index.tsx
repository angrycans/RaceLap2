import './mapbox-config';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import App from './App';
import './index.module.less';
dayjs.extend(customParseFormat);

const reactDOMRoot = createRoot(
  document.querySelector('#root')!,
);

reactDOMRoot.render(
  <HashRouter>
    <App />
  </HashRouter>
);
