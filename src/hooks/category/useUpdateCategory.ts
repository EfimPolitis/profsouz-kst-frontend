import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'

import { TanStackQueryKey } from '@/constants/query-key.constants'

import type { ICategory } from '@/types/category.types'

import { categoryService } from '@/services/category.service'

export const useUpdateCategory = () => {
  const queryClient = useQueryClient()

  const {
    mutate: updateCategory,
    isPending: isUpdatePending,
    error: updateError
  } = useMutation({
    mutationKey: [TanStackQueryKey.updateCategory],
    mutationFn: ({ id, data }: { data: ICategory; id: string }) =>
      categoryService.update(data, id),
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

  return { updateCategory, isUpdatePending, updateError }
}
