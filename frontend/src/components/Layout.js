import { Outlet } from 'react-router'
import Navigation from './Navigation'
function Layout() {
   return (
      <div>
         <Navigation />
         <Outlet />
      </div>
   )
}

export default Layout
