import type { ComponentType, JSX } from 'react';

import { IndexPage } from '@/pages/IndexPage/IndexPage';
import { InitDataPage } from '@/pages/InitDataPage/InitDataPage';
import { LaunchParamsPage } from '@/pages/LaunchParamsPage/LaunchParamsPage.tsx';
import { ThemeParamsPage } from '@/pages/ThemeParamsPage/ThemeParamsPage.tsx';
import { TONConnectPage } from '@/pages/TONConnectPage/TONConnectPage';

interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
}

export const routes: Route[] = [
  { path: '/', Component: IndexPage },
];
