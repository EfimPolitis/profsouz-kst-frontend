import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'

import { TanStackQueryKey } from '@/constants/query-key.constants'

import { categoryService } from '@/services/category.service'

export const useDeleteCategory = () => {
  const queryClient = useQueryClient()

  const {
    mutate: deleteCategory,
    isPending: isDeletePanding,
    error: deleteError
  } = useMutation({
    mutationKey: [TanStackQueryKey.deleteCategory],
    mutationFn: (id: string) => categoryService.delete(id),
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

  return { deleteCategory, isDeletePanding, deleteError }
}
