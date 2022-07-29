import { lazy, Suspense, type FC } from 'react';
import { Navigate, Outlet, type RouteObject } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import PageNotFound from './views/NotFound';

const Layout: FC = () => (
  <AppLayout>
    <Outlet />
  </AppLayout>
);

const AsyncComponent: FC<{ component: React.ComponentType }> = (props) => {
  const { component: Component } = props;
  return (
    <Suspense fallback={<div>loading ...</div>}>
      <Component />
    </Suspense>
  );
};

type MyRouteConfig = Omit<RouteObject, 'children'> & {
  name?: string;
  component?: any; // FIXME: type, 参考 lazy
  children?: MyRouteConfig[];
};

// 格式转换 react-route-config -> useRoutes
const convertRoutes = (routes: MyRouteConfig[]): RouteObject[] => {
  return routes.map((route) => {
    return {
      path: route.path,
      element: route.element || <AsyncComponent component={lazy(route.component)} />,
      children: route.children ? convertRoutes(route.children) : [],
    };
  });
};

const routeConfig: MyRouteConfig[] = [
  // 登录相关无需Layout 特殊处理
  { path: '/', element: <Navigate to="/home" replace /> },
  {
    element: <Layout />,
    children: [
      {
        name: '首页',
        path: '/home',
        component: () => import('./views/Home'),
      },
    ],
  },
  /** 404 */
  {
    name: '404',
    path: '*',
    element: <PageNotFound />,
  },
];

export default convertRoutes(routeConfig);
