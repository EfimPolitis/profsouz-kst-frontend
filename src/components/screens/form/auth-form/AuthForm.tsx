'use client'

import { AtSign, Lock, User, UserCog } from 'lucide-react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/buttons/button/Button'
import { Field } from '@/components/ui/fields/field/Field'

import type { IFormData } from '@/types/auth.types'
import { errorList } from '@/types/error.types'
import { ERole } from '@/types/user.types'

import { DASHBOARD_PAGES } from '@/config/page-url.config'

import { useAuth } from '@/hooks/user/useAuth'
import { useGetUser } from '@/hooks/user/useGetUser'
import { useUpdateUser } from '@/hooks/user/useUpdateUser'

import styles from './AuthFom.module.scss'

interface AuthFormProps {
  isLogin?: boolean
  isEditing?: boolean
}

export const AuthForm = ({ isLogin, isEditing }: AuthFormProps) => {
  const { push } = useRouter()
  const { userId } = useParams() as { userId: string }

  const { data, isFetching } = useGetUser(userId)
  const user = data?.data

  const initialValues = useMemo(
    () => ({
      userName: '',
      firstName: '',
      lastName: '',
      middleName: '',
      email: '',
      password: '',
      role: 'USER'
    }),
    []
  )

  useEffect(() => {
    if (isEditing && userId && user) {
      setValues({
        userName: user?.userName,
        firstName: user?.firstName,
        lastName: user?.lastName,
        middleName: user?.middleName,
        email: user?.email,
        password: user?.password,
        role: ERole[user?.role]
      })
    }
  }, [isFetching, isEditing, userId, user])

  const [values, setValues] = useState(initialValues)
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: initialValues,
    values
  })

  const { mutate, isPendingAuth, isSuccessAuth, error } = useAuth(
    !!isLogin,
    reset
  )
  const { updateUser, isPendingUpdate, isSuccessUpdate } = useUpdateUser()

  const isPending = isPendingAuth || isPendingUpdate
  const isSuccess = isSuccessAuth || isSuccessUpdate

  if (isSuccess) {
    push('/')
  }

  const onSubmit: SubmitHandler<IFormData> = data => {
    isEditing ? updateUser({ data, userId }) : mutate(data)
  }

  return (
    <div className={styles.auth_form}>
      <p>
        {isLogin ? 'Авторизация' : isEditing ? 'Редактирование' : 'Регистрация'}
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.form}
      >
        <Field
          placeholder='Имя пользователя'
          error={errors.userName}
          Icon={User}
          {...register('userName', {
            required: {
              value: true,
              message: 'Имя пользователя - обязательное поле!'
            }
          })}
        />
        {isLogin || (
          <>
            <Field
              placeholder='Имя'
              error={errors.firstName}
              Icon={User}
              {...register('firstName', {
                required: {
                  value: true,
                  message: 'Имя пользователя - обязательное поле!'
                }
              })}
            />
            <Field
              placeholder='Фамилия'
              error={errors.lastName}
              Icon={User}
              {...register('lastName', {
                required: {
                  value: true,
                  message: 'Имя пользователя - обязательное поле!'
                }
              })}
            />
            <Field
              placeholder='Отчество'
              error={errors.middleName}
              Icon={User}
              {...register('middleName')}
            />
            <Field
              placeholder='Почта'
              error={errors.email}
              Icon={AtSign}
              {...register('email', {
                required: {
                  value: true,
                  message: 'Email - обязательное поле!'
                },
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Введите корректную почту!'
                }
              })}
            />
            <Field
              placeholder='Роль'
              error={errors.role}
              Icon={UserCog}
              {...register('role')}
            />
          </>
        )}
        <Field
          placeholder='Пароль'
          isPassword
          error={errors.password}
          Icon={Lock}
          type='password'
          {...register('password', {
            required: {
              value: true,
              message: 'Пароль - обязательное поле!'
            }
          })}
        />
        {/* @ts-ignore */}
        {error && <div className={styles.error}>{errorList[error?.code]}</div>}
        <Button
          text={isLogin ? 'Войти' : isEditing ? 'Редактировать' : 'Создать'}
          type='submit'
          isLoading={isPending}
          // isSuccess={isLogin || isSuccess}
          disabled={isPending}
        />
      </form>
      {isLogin && <Link href={'/'}>Вернуться на главную</Link>}
    </div>
  )
}
