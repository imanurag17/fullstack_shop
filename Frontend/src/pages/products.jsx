import { useEffect, useState } from 'react';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Product from './product';
import ConfirmationModal from '../components/confirmationModal';
import { productActions } from '../features/products/products';
import {cartActions} from '../features/cart/cart'
import { deleteProduct as deleteProductThunk } from '../features/products/product.actions';
import { addToCart } from '../features/cart/cart.actions';

export default function ProductPage() {
  const [confirmation, setConfirmation] = useState(null)
  const [deleteProduct, setDeleteProduct] = useState(null)

  const dataFromLoader = useLoaderData(); // this comes from productLoader
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const products = useSelector(state => state.prod.products.items)
  const allProducts = useSelector(state => state.prod.products.allProducts)
  const {userId, token} = useSelector(state => state.auth.currentUser)

  useEffect(() => {
    dispatch(productActions.setProducts(dataFromLoader))
    //dispatch(addToCart({prodId: prod._id}))
  }, [dataFromLoader, dispatch])
  console.log(products)

  function startEditProductHandler(prodId) {
    const loadedProduct = products.find(prod => prod._id === prodId)
    navigate('/add-product', { state: { product: loadedProduct } })
  }
  
  function startDeleteProductHandler(prodId) {
    const product = products.find(prod => prod._id === prodId)
    setConfirmation(true)
    setDeleteProduct(product)
  }
  
  async function handleDelete(prodId){
    try {
      const resultAction = await dispatch(deleteProductThunk(prodId)).unwrap()
      setConfirmation(false)
      navigate(`/admin-products/${userId}`)
    }catch(error){
      console.log(error)
    }
  }

  function handleAddToCart(prod){
    dispatch(cartActions.addItemLocaly(prod))
    dispatch(addToCart({prodId: prod._id}))
  }

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {confirmation &&
          <ConfirmationModal
            title="Delete Product"
            message={`Are you sure you want to delete this product ? This action cannot be undone.`}
            onConfirm={() => handleDelete(deleteProduct._id)}
            onCancel={() => setConfirmation(false)}
          />
        }
        {products.map(prod => (
          <li key={prod._id}>
            <Product
              id={prod.id}
              creator={prod.creator.name}
              createdAt={prod.createdAt}
              title={prod.title}
              onStartEdit={() => startEditProductHandler(prod._id)}
              onStartDelete={() => startDeleteProductHandler(prod._id)}
              allProducts={allProducts}
              onAddToCart={() => handleAddToCart(prod)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export const productLoader = async ({ params }) => {
  const userId = params.userId

  const url = userId
    ? `http://localhost:4000/products?user=${userId}`
    : `http://localhost:4000/products`

  const response = await fetch(url)
  if (!response.ok) {
    let errorMessage = 'Could not fetch products.';
    try {
      const errorData = await response.json()
      if (errorData.message) {
        errorMessage = errorData.message
      }
    } catch {

    }
    //throw json({ message: errorMessage }, { status: response.status });
    throw new Response(JSON.stringify({ message: errorMessage }), {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  }
  const products = await response.json()
  return products
}