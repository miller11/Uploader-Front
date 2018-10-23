import Home from './components/Home'

export const routes = [
  {path: '/', name: 'homeLink', component: Home},
  {path: '*', redirect: '/' }
];
