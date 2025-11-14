import style from './input.module.css'

export default function FilePicker(props) {
  return (
    <div className={style.input}>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type="file"
        id={props.id}
        //onChange={e => props.onChange(props.id, e.target.value, e.target.files)}
        //onBlur={props.onBlur}
      />
    </div>
  )
}