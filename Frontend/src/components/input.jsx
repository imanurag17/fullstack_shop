import style from './input.module.css'

export default function Input(props) {
  return (
    <div className={style.input}>
      <div>

        {props.label && <label htmlFor={props.id}>{props.label}</label>}
        {props.control === 'input' && (
          <input
            type={props.type}
            id={props.id}
            required={props.required}
            value={props.value}
            placeholder={props.placeholder}
            onChange={(e) => props.onChange(props.id, e.target.value)}
          />
        )}
        {props.control === 'textarea' && (
          <textarea
            id={props.id}
            rows={props.rows}
            required={props.required}
            value={props.value}
            onChange={(e) => props.onChange(props.id, e.target.value)}
          />
        )}
      </div>
    </div>
  )
}