import Home from './components/Home'
import ManageAlbums from './components/ManageAlbums'
import AlbumManage from './components/AlbumManage'

export const routes = [
  {path: '/', name: 'homeLink', component: Home},
  {path: '/albums/manage', name: 'albumsLink', component: ManageAlbums},
  {path: '/albums/manage/:albumKey', name: 'albumLink', component: AlbumManage},
  {path: '*', redirect: '/' }
];
