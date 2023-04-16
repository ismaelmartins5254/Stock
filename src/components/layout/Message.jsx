import Style from './Message.module.css'

function Message({ text, type }) {
  return (
    <div className={Style.container}>
      <p className={`${Style[type]} ${Style.msg}`}>{text}</p>
    </div>
  )
}

export default Message