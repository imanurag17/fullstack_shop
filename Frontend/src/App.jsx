import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import RootLayout from './pages/root'
import HomePage from './pages/home'
import ProductPage from './pages/products'
import Signin from './components/signin'
import Signup from './components/signup'


function App() {
  const router = createBrowserRouter([
    {
      path: '/', 
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