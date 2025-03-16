'use client'

import { AtSign } from 'lucide-react'
import { useState } from 'react'
import { FieldErrors, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Button, Field } from '@/components/ui'

import { useRequestEmail } from '@/hooks/auth/useRequestEmail'

import styles from './index.module.scss'

export const RequestResetForm = () => {
  const [isSubmit, setIsSubmit] = useState(false)
  const { handleSubmit, register } = useForm<{ email: string }>({
    defaultValues: { email: '' }
  })

  const { mutate } = useRequestEmail()

  const onSubmit = (data: { email: string }) => {
    mutate(data.email)
    setIsSubmit(true)
  }

  const onError = (errors: FieldErrors<{ email: string }>) => {
    const errorsKeys = Object.keys(errors).reverse() as Array<
      keyof { email: string }
    >

    errorsKeys.forEach(error => {
      toast.error(`${errors[error]?.message}`)
    })
  }

  return (
    <div className={styles.request_reset_block}>
      {isSubmit ? (
        <div className={styles.message}>
          <h2>К вам на почту было отправленно письмо</h2>
        </div>
      ) : (
        <>
          <h2>Восстановление пароля</h2>
          <form
            action='request-email'
            onSubmit={handleSubmit(onSubmit, onError)}
          >
            <Field
              type='email'
              placeholder='Email адрес'
              Icon={AtSign}
              {...register('email', {
                required: {
                  value: true,
                  message: '"Email адрес" - обязательное поле'
                }
              })}
            />
            <Button type='submit'>Отправить код</Button>
          </form>
        </>
      )}
    </div>
  )
}
