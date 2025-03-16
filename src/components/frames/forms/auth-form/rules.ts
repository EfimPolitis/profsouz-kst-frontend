import type { RegisterOptions } from 'react-hook-form'

import { regularEmail } from '@/constants/regulars'

import type { IAuthFormData } from '@/types/auth.types'

type TAuthFormRules = {
  userName: RegisterOptions<IAuthFormData, 'userName'>
  firstName: RegisterOptions<IAuthFormData, 'firstName'>
  lastName: RegisterOptions<IAuthFormData, 'lastName'>
  middleName: RegisterOptions<IAuthFormData, 'middleName'>
  email: RegisterOptions<IAuthFormData, 'email'>
  password: RegisterOptions<IAuthFormData, 'password'>
}

export const authFormRules: TAuthFormRules = {
  userName: {
    required: {
      value: true,
      message: '"Логин" - обязательное поле!'
    }
  },
  firstName: {
    required: {
      value: true,
      message: '"Имя" - обязательное поле!'
    }
  },
  lastName: {
    required: {
      value: true,
      message: '"Фамилия" - обязательное поле!'
    }
  },
  middleName: {
    required: false
  },
  email: {
    required: {
      value: true,
      message: '"Email" - обязательное поле!'
    },
    pattern: {
      value: regularEmail,
      message: 'Введите корректную почту!'
    }
  },
  password: {
    required: {
      value: true,
      message: '"Пароль" - обязательное поле!'
    }
  }
}
