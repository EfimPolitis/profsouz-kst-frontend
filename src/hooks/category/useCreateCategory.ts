import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'

import { TanStackQueryKey } from '@/constants/query-key.constants'

import type { ICategory } from '@/types/category.types'

import { categoryService } from '@/services/category.service'

export const useCreateCategory = () => {
  const queryClient = useQueryClient()

  const {
    mutate: createCategory,
    isPending: isCreatePending,
    isSuccess,
    error
  } = useMutation({
    mutationKey: [TanStackQueryKey.createCategory],
    mutationFn: (data: ICategory) => categoryService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TanStackQueryKey.getCategories]
      })
    },
    onError: (error: unknown) => {
      toast.dismiss()

      let message = 'Произошла неизвестная ошибка'

      if (error instanceof AxiosError) {
        const serverMessage = error.response?.data?.message
        if (typeof serverMessage === 'string') {
          message = serverMessage
        }
      }

      toast.error(message)
    }
  })

  return { createCategory, isCreatePending, isSuccess, error }
}
