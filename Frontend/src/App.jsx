import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import Signup from './components/signup'
import Signin from './components/signin'
import RootLayout from './pages/root'
import HomePage from './pages/home'
import ProductPage from './pages/products'
import AddProduct from './pages/addproduct'
import ErrorPage from './pages/errorPage'
import { productLoader } from './pages/products'


function App() {
  const router = createBrowserRouter([
    {
      path: '/', 
      element: <RootLayout/>,
      
      children: [
        {index: true, element: <HomePage/>},
        {path: '/products', element: <ProductPage/>, loader: productLoader},
        {path: '/login', element: <Signin />},
        {path: '/signup', element: <Signup/>},
        {path: '/add-product', element: <AddProduct/>},
        {path: '/admin-products/:userId', element: <ProductPage/>, errorElement: <ErrorPage/>, loader: productLoader}
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