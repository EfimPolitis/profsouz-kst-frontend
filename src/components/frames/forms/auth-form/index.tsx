'use client'

import cn from 'clsx'
import { AtSign, Lock, LogOut, User, UserCog } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Controller,
  type FieldErrors,
  type SubmitHandler,
  useForm
} from 'react-hook-form'
import toast from 'react-hot-toast'

import { Button } from '@/components/ui'
import { Field } from '@/components/ui'
import { InputSelect } from '@/components/ui/fields/input-select'

import { roles, variantsRoles } from '@/constants/roles.constants'

import type { IAuthFormData } from '@/types/auth.types'
import { ERole } from '@/types/user.types'

import { URL_PAGES } from '@/config/url.config'

import { useAuth } from '@/hooks/auth/useAuth'
import { useLogout } from '@/hooks/auth/useLogout'
import { useGetUserById } from '@/hooks/user/useGetUserById'
import { useProfile } from '@/hooks/user/useProfile'
import { useUpdateUser } from '@/hooks/user/useUpdateUser'

import styles from './index.module.scss'
import { authFormRules } from './rules'

interface AuthFormProps {
  type: 'login' | 'edit' | 'profile' | 'register'
}

const titleList = {
  login: 'Вход в систему',
  profile: 'Профиль',
  register: 'Форма создания пользователя',
  edit: 'Форма редактирования пользователя'
}

export const AuthForm = ({ type }: AuthFormProps) => {
  const { userId } = useParams() as { userId: string | undefined }
  const { data: profile } = useProfile()
  const { mutate: logout } = useLogout()

  const initialValues = useMemo(
    () => ({
      userName: '',
      firstName: '',
      lastName: '',
      middleName: '',
      email: '',
      password: '',
      role: ERole.USER
    }),
    []
  )

  const { data } = useGetUserById(userId)

  useEffect(() => {
    const user =
      type === 'edit' ? data?.data : type === 'profile' ? profile : null
    if (user) {
      if (type === 'edit' || type === 'profile') {
        setValues({
          userName: user.userName,
          firstName: user.firstName,
          lastName: user.lastName,
          middleName: user.middleName || '',
          email: user.email,
          password: '',
          role: user.role
        })
      }
    }
  }, [type, data?.data, profile])

  const [values, setValues] = useState(initialValues)
  const { register, handleSubmit, reset, control } = useForm<IAuthFormData>({
    mode: 'onChange',
    defaultValues: initialValues,
    values
  })

  const { authUser, isPendingAuth } = useAuth(type === 'login', reset)
  const { updateUser, isPendingUpdate } = useUpdateUser()

  const isPending = isPendingAuth || isPendingUpdate

  const onSubmit: SubmitHandler<IAuthFormData> = useCallback(
    data => {
      type === 'edit' || type === 'profile'
        ? updateUser({ data, userId: userId || profile?.userId })
        : authUser(data)
    },
    [type, userId, updateUser, authUser]
  )

  const onError = (errors: FieldErrors<IAuthFormData>) => {
    const errorsKeys = Object.keys(errors) as Array<keyof IAuthFormData>
    errorsKeys.forEach(error => {
      toast.error(`${errors[error]?.message}`)
    })
  }

  const title = titleList[type]

  return (
    <div className={styles.auth_block}>
      <p style={{ textAlign: 'center' }}>{title}</p>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className={styles.form}
      >
        <Field
          placeholder='Логин'
          Icon={User}
          autoComplete='username'
          {...register('userName', authFormRules.userName)}
        />
        {type !== 'login' && (
          <>
            <Field
              placeholder='Фамилия'
              Icon={User}
              {...register('lastName', authFormRules.lastName)}
            />
            <Field
              placeholder='Имя'
              Icon={User}
              {...register('firstName', authFormRules.firstName)}
            />
            <Field
              placeholder='Отчество'
              Icon={User}
              {...register('middleName', authFormRules.middleName)}
            />
            <Field
              placeholder='Email'
              Icon={AtSign}
              {...register('email', authFormRules.email)}
            />
            {type !== 'profile' && (
              <Controller
                control={control}
                name='role'
                render={({ field: { onChange, value } }) => (
                  <InputSelect
                    setState={onChange}
                    initialValue={roles[values.role]}
                    Icon={UserCog}
                    data={variantsRoles}
                  />
                )}
              />
            )}
          </>
        )}
        {type !== 'profile' && (
          <Field
            placeholder='Пароль'
            isPassword
            Icon={Lock}
            type='password'
            autoComplete='current-password'
            {...register(
              'password',
              type === 'edit' ? {} : authFormRules.password
            )}
          />
        )}
        {type === 'profile' && (
          <div className={styles.btn_block}>
            <button
              className={cn(styles.logout, styles.btn)}
              onClick={() => logout()}
            >
              Выйти <LogOut className={styles.logout_icon} />
            </button>
            <Link
              href={URL_PAGES.CHANGE_PASSWORD}
              className={cn(styles.btn)}
            >
              Сменить пароль
              <Lock />
            </Link>
          </div>
        )}
        {type === 'login' && (
          <div>
            <Link href={URL_PAGES.REQUEST_EMAIL}>Забыли пароль?</Link>
          </div>
        )}
        <Button
          type='submit'
          isLoading={isPending}
          disabled={isPending}
        >
          {type === 'login'
            ? 'Войти'
            : type === 'edit' || type === 'profile'
              ? 'Редактировать'
              : 'Создать'}
        </Button>
      </form>
    </div>
  )
}
