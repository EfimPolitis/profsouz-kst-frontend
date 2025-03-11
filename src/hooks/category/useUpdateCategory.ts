import { useMutation, useQueryClient } from '@tanstack/react-query'

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
    }
  })

  return { updateCategory, isUpdatePending, updateError }
}
