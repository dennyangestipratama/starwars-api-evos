import Home from '@Pages/Home'
import Detail from '@Pages/Detail'

export const Routes = [
   {
      component: Home,
      name: 'Home',
      route: '/',
      exact: true,
   },
   {
      component: Detail,
      name: 'Detail',
      route: '/starship/:name',
      exact: true,
   },
]
