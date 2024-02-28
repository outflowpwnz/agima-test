import {DEFAULT_TITLE} from '@shared/config';
import {RouteRecordRaw} from 'vue-router';
import {IndexPage} from '@pages/indexPage';
import {PostsPage} from '@pages/postsPage';
import {ErrorNotFound} from 'src/pages/notFoundPage';
import MainLayout from '../layouts/MainLayout.vue';
import {FormPage} from '@pages/formPage';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MainLayout
    ,
    children: [
      {
        path: '', component: IndexPage,
        meta: {title: `${DEFAULT_TITLE}: index page`}
      },
      {
        path: '/posts', component: PostsPage,
        meta: {title: `${DEFAULT_TITLE}: Posts`}
      },
      {
        path: '/form', component: FormPage,
        meta: {title: `${DEFAULT_TITLE}: Form`}
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: ErrorNotFound,
  },
];

export default routes;
