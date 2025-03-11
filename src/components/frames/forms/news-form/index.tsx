'use client'

import { useParams } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Controller,
  type FieldErrors,
  type SubmitHandler,
  useForm
} from 'react-hook-form'
import toast from 'react-hot-toast'

import { Button, Field, TextArea, Uploader } from '@/components/ui'

import type { IEventFormData, TypeImage } from '@/types/event.types'
import type { INewsFormData } from '@/types/news.types'

import { useCreateNews } from '@/hooks/news/useCreateNews'
import { useGetNewsById } from '@/hooks/news/useGetNewsById'
import { useUpdateNews } from '@/hooks/news/useUpdateNews'

import styles from './index.module.scss'
import { formRules } from './rules'

interface INewsForm {
  isEditing?: boolean
}

export const NewsForm = ({ isEditing }: INewsForm) => {
  const { newsId } = useParams() as { newsId: string }

  const initialValues = useMemo(
    () => ({
      title: '',
      description: '',
      content: '',
      imagesId: []
    }),
    []
  )

  const { data } = useGetNewsById(isEditing ? newsId : '')

  const [values, setValues] = useState<INewsFormData>(initialValues)
  const [images, setImages] = useState<TypeImage[]>([])

  useEffect(() => {
    if (isEditing && data?.data) {
      const news = data?.data
      const imagesId = news.images.map(image => image.id)

      setImages(news.images)
      setValues({
        title: news.title,
        description: news.description,
        content: news.content,
        imagesId
      })
    }
  }, [isEditing, data])

  const { createNews, isPendingCreate, isSuccessCreate } = useCreateNews()
  const { updateNews, isPendingUpdate, isSuccessUpdate } = useUpdateNews()

  const isSuccess = isSuccessCreate || isSuccessUpdate
  const isPending = isPendingCreate || isPendingUpdate

  const { register, control, handleSubmit } = useForm<INewsFormData>({
    defaultValues: initialValues,
    values
  })

  const onSubmit: SubmitHandler<INewsFormData> = useCallback(
    data => {
      isEditing ? newsId && updateNews({ data, newsId }) : createNews(data)
    },
    [isEditing, newsId, updateNews, createNews]
  )

  const onError = useCallback((errors: FieldErrors<IEventFormData>) => {
    const errorsKeys = Object.keys(errors).reverse()
    errorsKeys.forEach(error => {
      //@ts-ignore
      toast.error(`${errors[error]?.message}`)
    })
  }, [])

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className={styles.event_form}
    >
      <h2>Форма {isEditing ? 'редактирования' : 'создания'} новости</h2>
      <Field
        placeholder='Заголовок'
        style={{ width: '450px', paddingLeft: '20px' }}
        {...register('title', formRules.title)}
      />
      <Controller
        control={control}
        name='imagesId'
        rules={formRules.imagesId}
        render={({ field: { value: imagesId, onChange: setImagesId } }) => (
          <Uploader
            imagesId={imagesId}
            setImagesId={setImagesId}
            images={images}
            entity='news'
          />
        )}
      />
      <TextArea
        style={{ maxWidth: '800px', minHeight: '250px' }}
        placeholder='Описание для карточки'
        {...register('description', formRules.description)}
      />
      <TextArea
        style={{ maxWidth: '800px', minHeight: '400px' }}
        placeholder='Основной контент'
        {...register('content', formRules.content)}
      />
      <Button
        text={isEditing ? 'Сохранить изменения' : 'Создать'}
        isPending={isPending}
        isSuccess={isSuccess}
        style={{ width: '400px' }}
        type='submit'
      />
    </form>
  )
}
