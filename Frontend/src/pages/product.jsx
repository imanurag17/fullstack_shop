import style from './product.module.css'

export default function Product(props) {
  const fromatedDate = new Date(props.createdAt).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
  return (
    <article className={style.product}>
      <header className={style.product__header}>
        <h3 className={style.product__meta}>
          Posted by {props.creator} on {fromatedDate}
        </h3>
        <h1 className={style.product__title}>{props.title}</h1>
      </header>
      {/* <div className="post__image">
      <Image imageUrl={props.image} contain />
    </div>
    <div className="post__content">{props.content}</div> */}
      <div className={style.product__actions}>
        <button mode="flat" >
          View
        </button>
        {!props.allProducts && (
          <>
            <button mode="flat" onClick={props.onStartEdit} >
              Edit
            </button>
            <button mode="flat" design="danger" onClick={props.onStartDelete} >
              Delete
            </button>
          </>
        )}
      </div>
    </article>
  )
}