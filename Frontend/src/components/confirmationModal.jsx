import style from './modal.module.css'

export default function ConfirmationModal({title, message, onConfirm, onCancel}) {
  return (
    <dialog className={style.modal}>
      <div className={style.modal_content}>
        <h3>{title || "Confirm Action"}</h3>
        <p>{message}</p>
        <div className="modal-actions">
          <button onClick={onConfirm} className="confirm-btn">
            Yes, Confirm
          </button>
          <button onClick={onCancel} className="cancel-btn">
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  )
}