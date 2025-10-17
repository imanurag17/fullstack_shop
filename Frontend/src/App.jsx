import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import useHttp from './hooks/useHttp'
import RootLayout from './pages/root'
import HomePage from './pages/home'
import ProductPage from './pages/products'
import Signin from './components/signin'
import Signup from './components/signup'


function App() {
  const router = createBrowserRouter([
    {
      path: '/', //localhost:5137 => navigation bar + homepage
      element: <RootLayout/>,
      children: [
        {index: true, element: <HomePage/>},
        {path: '/products', element: <ProductPage/>},
        {path: '/login', element: <Signin />},
        {path: '/signup', element: <Signup/>}
      ]
    },
  ])
  
  return (
    <>
    <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App