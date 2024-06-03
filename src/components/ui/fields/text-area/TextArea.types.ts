import { TextareaHTMLAttributes } from 'react'
import { FieldError } from 'react-hook-form'

export interface ITextAreaProps {
  error?: FieldError
}

export type TypeTextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> &
  ITextAreaProps
