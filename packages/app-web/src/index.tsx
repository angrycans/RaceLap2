import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import './index.module.less';

const reactDOMRoot = createRoot(
  document.querySelector('#root')!,
);

reactDOMRoot.render(
  <HashRouter>
    <App />
  </HashRouter>
);
