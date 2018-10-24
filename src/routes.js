import Home from './components/Home'
import ManageAlbums from './components/ManageAlbums'
import Album from './components/Album'

export const routes = [
  {path: '/', name: 'homeLink', component: Home},
  {path: '/albums', name: 'albumsLink', component: ManageAlbums},
  {path: '/albums/:albumId', name: 'albumLink', component: Album},
  {path: '*', redirect: '/' }
];
