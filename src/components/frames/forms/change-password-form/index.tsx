'use client'

import { Lock } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { FieldErrors, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Button, Field } from '@/components/ui'

import type { IChangePasswordFormData } from '@/types/auth.types'

import { URL_PAGES } from '@/config/url.config'

import { useChangePassword } from '@/hooks/auth/useChangePassword'
import { useProfile } from '@/hooks/user/useProfile'

import styles from './index.module.scss'
import { changePasswordFormRulles } from './rules'

export const ChangePasswordForm = () => {
  const { profile } = useProfile()
  const { register, handleSubmit, reset } = useForm<IChangePasswordFormData>()
  const { changePassword } = useChangePassword(reset)

  const [isPasswordField, setIsPasswordField] = useState(true)

  const onSubmit: SubmitHandler<IChangePasswordFormData> = data => {
    if (data.newPassword !== data.confirmPassword)
      return toast.error('Новый пароль не совпадает с подтвержденным паролем')

    changePassword(data)
  }

  const onError = (errors: FieldErrors<IChangePasswordFormData>) => {
    const errorsKeys = Object.keys(errors).reverse() as Array<
      keyof IChangePasswordFormData
    >
    errorsKeys.forEach(error => {
      toast.error(`${errors[error]?.message}`)
    })
  }

  return (
    <div className={styles.change_password_block}>
      <p style={{ textAlign: 'center' }}>Смена пароля</p>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className={styles.form}
        autoComplete='off'
      >
        <input
          type='text'
          name='username'
          autoComplete='username'
          value={profile?.userName}
          readOnly
          hidden
        />
        <Field
          placeholder='Старый пароль'
          Icon={Lock}
          type='password'
          isPassword
          autoComplete='current-password'
          {...register(
            'currentPassword',
            changePasswordFormRulles.currentPassword
          )}
        />
        <Field
          placeholder='Новый пароль'
          Icon={Lock}
          type={isPasswordField ? 'password' : 'text'}
          isPassword
          onClickBtn={() => setIsPasswordField(!isPasswordField)}
          autoComplete='new-password'
          {...register('newPassword', changePasswordFormRulles.newPassword)}
        />
        <Field
          placeholder='Подтвердите новый пароль'
          Icon={Lock}
          type={isPasswordField ? 'password' : 'text'}
          isPassword
          onClickBtn={() => setIsPasswordField(!isPasswordField)}
          autoComplete='new-password'
          {...register(
            'confirmPassword',
            changePasswordFormRulles.confirmPassword
          )}
        />
        <Link href={URL_PAGES.REQUEST_EMAIL}>Забыли пароль?</Link>
        <Button type='submit'>Сменить</Button>
      </form>
    </div>
  )
}
