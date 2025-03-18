'use client'

import { Lock } from 'lucide-react'
import { FieldErrors, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Button, Field } from '@/components/ui'

import { IResetPasswordForm } from '@/types/auth.types'

import { useResetPassword } from '@/hooks/auth/useResetPassword'
import { useFilters } from '@/hooks/useFilters'

import styles from './index.module.scss'
import { resetPasswordFormRulles } from './rules'

export const ResetPasswordForm = () => {
  const { queryParams } = useFilters()
  const token = queryParams.token

  const initialValues = {
    newPassword: '',
    confirmPassword: ''
  }

  const { handleSubmit, register } = useForm<IResetPasswordForm>({
    defaultValues: initialValues
  })

  const { mutate } = useResetPassword()

  const onSubmit = (data: IResetPasswordForm) => {
    if (data.newPassword !== data.confirmPassword) {
      return toast.error('Новый пароль не совпадает с подтверждённым паролем')
    } else if (!token) {
      return toast.error('Отсутствует токен')
    }

    mutate({ token, newPassword: data.newPassword })
  }

  const onError = (errors: FieldErrors<IResetPasswordForm>) => {
    const errorsKeys = Object.keys(errors).reverse() as Array<
      keyof IResetPasswordForm
    >

    errorsKeys.forEach(error => {
      toast.error(`${errors[error]?.message}`)
    })
  }

  return (
    <div className={styles.confirm_password_block}>
      <h3>Введите новый пароль</h3>
      <form
        action='reset-password'
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <Field
          type='password'
          isPassword
          Icon={Lock}
          autoComplete='new-password'
          placeholder='Новый пароль'
          {...register('newPassword', resetPasswordFormRulles.newPassword)}
        />{' '}
        <Field
          type='password'
          isPassword
          Icon={Lock}
          autoComplete='new-password'
          placeholder='Подтверждение нового пароля'
          {...register(
            'confirmPassword',
            resetPasswordFormRulles.confirmPassword
          )}
        />
        <Button type='submit'>Сменить пароль</Button>
      </form>
    </div>
  )
}
