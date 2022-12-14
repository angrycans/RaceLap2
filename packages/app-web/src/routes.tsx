import { lazy, Suspense, type FC } from 'react';
import { Outlet, type RouteObject } from 'react-router-dom';
import { WebRouteName } from '@race-lap/app-helper';
import { Spin } from '@/components'
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
    <Suspense fallback={<Spin />}>
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
  { path: '/', name: '测试首页', component: () => import('./views/TestEntry'), },
  { path: `/${WebRouteName.NEW_RACETRACK}`, name: '测试首页', component: () => import('./views/NewRacetrack'), },
  { path: `/${WebRouteName.RECORD_DETAIL_BAR_CHART}/:id`, name: '比赛记录详情柱状图', component: () => import('./views/RecordDetailBarChart') },
  { path: `/${WebRouteName.RECORD_DETAIL_REVIEW_ANALYSIS}/:id/:type/:cycleNo`, name: '比赛记录详情回顾分析', component: () => import('./views/RecordDetailReviewAnalysis') },
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
