import Home from './components/Home'
import AlbumMosaic from './components/AlbumMosaic'
import ManageAlbums from './components/ManageAlbums'
import AlbumManage from './components/AlbumManage'
import SpotlightManage from './components/SpotlightManage'

export const routes = [
  {path: '/', name: 'homeLink', component: Home},
  {path: '/albums/:albumKey/view', name: 'albumsViewLink', component: AlbumMosaic, props: true},
  {path: '/albums/manage', name: 'albumsLink', component: ManageAlbums},
  {path: '/albums/new', name: 'albumLinkNew', component: AlbumManage},
  {path: '/albums/manage/:albumKey', name: 'albumLinkEdit', component: AlbumManage, props: true},
  {path: '/front-page/manage', name: 'spotlightManage', component: SpotlightManage},
  {path: '*', redirect: '/' }
];
