import { useMutation, useQueryClient } from '@tanstack/react-query'

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
    }
  })

  return { deleteCategory, isDeletePanding, deleteError }
}
