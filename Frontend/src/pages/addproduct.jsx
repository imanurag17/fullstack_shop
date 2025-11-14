import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from "react-router-dom";

import style from './addProduct.module.css'
import Input from "../components/input";
import FilePicker from "../components/filePicker";
import { createProduct, updateProduct } from "../features/products/product.actions";
import { required, length } from '../util/validators'
import { productActions } from "../features/products/products";

const PRODUCT_FORM = {
  title: {
    value: '',
    valid: false,
    touched: false,
    validators: [required, length({ min: 3 })]
  },
  image: {
    value: '',
    valid: true,
    touched: false,
    //validators: [required]
  },
  content: {
    value: '',
    valid: false,
    touched: false,
    validators: [required]
  }
};

export default function AddProduct() {
  const [product, setProduct] = useState({
    productForm: PRODUCT_FORM,
    formIsValid: false,
    imagePreview: null
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const token = useSelector(state => state.auth.currentUser.token)
  const notification = useSelector(state => state.prod.notification)
  const userId = useSelector(state => state.auth.currentUser.userId)

  const productToEdit = location.state?.product
  const isEdit = Boolean(productToEdit)

  useEffect(() => {
    if (notification?.status === 'success') {
      if (isEdit) {
        navigate(`/admin-products/${userId}`)
      } else {
        navigate('/products');
      }
      dispatch(productActions.showNotification(null));
    }
  }, [notification, navigate, isEdit, dispatch]);

  useEffect(() => {
    if (isEdit) {
      setProduct(prev => {
        const populatedForm = {
          ...prev.productForm,
          title: { ...prev.productForm.title, value: productToEdit.title, valid: true, touched: true },
          content: { ...prev.productForm.content, value: productToEdit.description, valid: true, touched: true },
          // image keeps validators intact; store existing image url in value so submit can handle it
          image: { ...prev.productForm.image, value: productToEdit.imageUrl || '', valid: true, touched: true }
        }
        console.log('populatedForm=>', populatedForm)
        return {
          ...prev,
          productForm: populatedForm,
          formIsValid: true,
          imagePreview: productToEdit.imageUrl || null
        }
      })
    }
  }, [isEdit, productToEdit])

  const handleInputChange = (input, value) => {
    setProduct(prevState => {
      let isValid = true;
      for (const validator of prevState.productForm[input].validators) {
        isValid = isValid && validator(value);
      }
      const updatedForm = {
        ...prevState.productForm,
        [input]: {
          ...prevState.productForm[input],
          valid: isValid,
          value: value
        }
      }

      let formIsValid = true;
      for (const inputName in updatedForm) {
        formIsValid = formIsValid && updatedForm[inputName].valid;
      }

      return {
        productForm: updatedForm,
        formIsValid: formIsValid
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (product.formIsValid) {
      if (isEdit) {
        dispatch(updateProduct(product.productForm, token, productToEdit._id))
      } else {
        dispatch(createProduct(product.productForm, token))
      }
    }
  }

  return (
    <>
      <form className={style.form_container} onSubmit={handleSubmit}>
        <div >
          <Input
            id="title"
            label="Title"
            control="input"
            value={product.productForm['title'].value}
            onChange={handleInputChange}
          />
          <FilePicker
            id="image"
            label="Image"
            control="input"
            onChange={handleInputChange}
          />
          {/* <div className="new-post__preview-image">
              {!this.state.imagePreview && <p>Please choose an image.</p>}
              {this.state.imagePreview && (
                <Image imageUrl={this.state.imagePreview} contain left />
              )}
            </div> */}
          <Input
            id="content"
            label="Content"
            control="textarea"
            rows="5"
            value={product.productForm['content'].value}
            onChange={handleInputChange}
          />
          <div className={style.buttons}>
            <button type='submit'>Save</button>
            <button>Cancel</button>
          </div>
        </div>
      </form>

    </>
  )
}