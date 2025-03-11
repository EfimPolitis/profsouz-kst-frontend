'use client'

import { AtSign, Lock, User, UserCog } from 'lucide-react'
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
import { errorList } from '@/types/error.types'
import { ERole } from '@/types/user.types'

import { useAuth } from '@/hooks/user/useAuth'
import { useGetUserById } from '@/hooks/user/useGetUserById'
import { useUpdateUser } from '@/hooks/user/useUpdateUser'

import styles from './index.module.scss'
import { formRules } from './rules'

interface AuthFormProps {
  isLogin?: boolean
  isEditing?: boolean
}

const AuthForm = ({ isLogin, isEditing }: AuthFormProps) => {
  const { userId } = useParams() as { userId: string }

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
    if (isEditing && data?.data) {
      const user = data?.data

      setValues({
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        middleName: user.middleName,
        email: user.email,
        password: '',
        role: user.role
      })
    }
  }, [isEditing && data?.data])

  const [values, setValues] = useState(initialValues)
  const { register, handleSubmit, reset, control } = useForm<IAuthFormData>({
    mode: 'onChange',
    defaultValues: initialValues,
    values
  })

  const { authUser, isPendingAuth } = useAuth(!!isLogin, reset)

  const { updateUser, isPendingUpdate } = useUpdateUser()

  const isPending = isPendingAuth || isPendingUpdate

  const onSubmit: SubmitHandler<IAuthFormData> = useCallback(
    data => {
      isEditing ? updateUser({ data, userId }) : authUser(data)
    },
    [isEditing, userId, updateUser, authUser]
  )

  const onError = (errors: FieldErrors<IAuthFormData>) => {
    const errorsKeys = Object.keys(errors)
    errorsKeys.forEach(error => {
      //@ts-ignore
      toast.error(`${errors[error]?.message}`)
      //@ts-ignore
      toast.error(`${errorList[error?.code]}`)
    })
  }

  return (
    <div className={styles.auth_block}>
      {isLogin && <p>Вход в систему</p>}

      {!isLogin && (
        <h2 style={{ textAlign: 'center' }}>
          Форма {isEditing ? 'редактирования' : 'создания'} пользователя
        </h2>
      )}
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className={styles.form}
      >
        <Field
          placeholder='Логин'
          Icon={User}
          {...register('userName', formRules.userName)}
        />
        {isLogin || (
          <>
            <Field
              placeholder='Фамилия'
              Icon={User}
              {...register('lastName', formRules.lastName)}
            />
            <Field
              placeholder='Имя'
              Icon={User}
              {...register('firstName', formRules.firstName)}
            />
            <Field
              placeholder='Отчество'
              Icon={User}
              {...register('middleName', formRules.middleName)}
            />
            <Field
              placeholder='Email'
              Icon={AtSign}
              {...register('email', formRules.email)}
            />
            <Controller
              control={control}
              name='role'
              render={({ field: { onChange, value } }) => (
                <InputSelect
                  setState={onChange}
                  initialValue={roles[ERole.USER]}
                  Icon={UserCog}
                  data={variantsRoles}
                />
              )}
            />
          </>
        )}
        <Field
          placeholder='Пароль'
          isPassword
          Icon={Lock}
          type='password'
          {...register('password', isEditing ? {} : formRules.password)}
        />
        <Button
          text={isLogin ? 'Войти' : isEditing ? 'Редактировать' : 'Создать'}
          type='submit'
          isLoading={isPending}
          disabled={isPending}
        />
      </form>
    </div>
  )
}

export default AuthForm
