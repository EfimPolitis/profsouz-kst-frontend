import { CSSProperties, Dispatch, SetStateAction } from 'react'

const variants = [
  {
    value: 'link',
    label: 'Да'
  },
  {
    value: 'noLink',
    label: 'Нет'
  }
]

type TypeInputRadio = {
  setTypeEvent: Dispatch<SetStateAction<string>>
  style?: CSSProperties
}

export const InputRadio = ({ setTypeEvent, style }: TypeInputRadio) => {
  return (
    <div style={style}>
      {variants.map(({ value, label }) => (
        <div
          key={value}
          onClick={() => setTypeEvent(value)}
        >
          <input
            type='radio'
            id={value}
            name='type'
          />
          <label htmlFor={value}>{label}</label>
        </div>
      ))}
    </div>
  )
}
