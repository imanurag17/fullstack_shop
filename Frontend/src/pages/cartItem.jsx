import styles from "./cartItem.module.css";

export default function CartItem({ id, title, quantity, onAdd, onRemove  }) {
  return (
    <div className={styles.cartPageCenter}>
      <ul className={styles.cartList}>
        <li className={styles.cartItem} key={id}>
          <h2 className={styles.cartTitle}>{title}</h2>
          <div className={styles.cartControls}>
            <button
              className={styles.cartBtn}
              onClick={onAdd}
            >
              Add
            </button>
            <h3 className={styles.cartQty}>{quantity}</h3>
            <button
              className={styles.cartBtn}
              onClick={onRemove}
            >
              Remove
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
}
