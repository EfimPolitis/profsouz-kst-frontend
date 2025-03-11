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

import {
  Button,
  DateInput,
  Field,
  InputRadio,
  SelectCategories,
  TextArea,
  Uploader
} from '@/components/ui'

import {
  EStatus,
  type IEventFormData,
  type TypeImage
} from '@/types/event.types'

import { useGetCategories } from '@/hooks/category/useGetCategories'
import { useCreateEvent } from '@/hooks/event/useCreateEvent'
import { useGetEventById } from '@/hooks/event/useGetEventById'
import { useUpdateEvent } from '@/hooks/event/useUpdateEvent'

import styles from './index.module.scss'
import { formRules } from './rules'

interface IEventForm {
  isEditing?: boolean
}

const variants = [
  {
    _value: EStatus.EVERYONE,
    label: 'Публичный'
  },
  {
    _value: EStatus.INTERNAL,
    label: 'Скрытый'
  }
]

export const EventForm = ({ isEditing }: IEventForm) => {
  const { eventId } = useParams() as { eventId: string }

  const initialValues = useMemo(
    () => ({
      title: '',
      description: '',
      organizer: '',
      imagesId: [],
      date: '',
      categoriesId: [],
      link: '',
      places: 0,
      status: EStatus.EVERYONE
    }),
    []
  )

  const { data } = useGetEventById(eventId)

  useEffect(() => {
    if (isEditing && data?.data) {
      const event = data?.data

      const categoriesId = event.categories.map(category => category.id)
      const imagesId = event.images.map(image => image.id)

      const date = new Date(event.date)
      date.setHours(date.getHours() + 3)

      setImages(event.images)
      setValues({
        title: event.title,
        description: event.description,
        organizer: event.organizer,
        imagesId,
        date: date.toISOString().slice(0, 16),
        categoriesId,
        link: event.link,
        places: event.places,
        status: event.status
      })
    }
  }, [isEditing, data?.data])

  const [values, setValues] = useState<IEventFormData>(initialValues)
  const [images, setImages] = useState<TypeImage[]>([])

  const { categories } = useGetCategories()
  const { createEvent, isPendingCreate, isSuccessCreate } = useCreateEvent()
  const { updateEvent, isPendingUpdate, isSuccessUpdate } = useUpdateEvent()

  const isSuccess = isSuccessCreate || isSuccessUpdate
  const isPending = isPendingCreate || isPendingUpdate

  const { register, control, handleSubmit } = useForm<IEventFormData>({
    defaultValues: initialValues,
    values
  })

  const onSubmit: SubmitHandler<IEventFormData> = useCallback(
    data => {
      data.places = Number(data.places)

      isEditing ? eventId && updateEvent({ data, eventId }) : createEvent(data)
    },
    [isEditing, eventId, updateEvent, createEvent]
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
      <h2>Форма {isEditing ? 'редактирования' : 'создания'} мероприятия</h2>
      <Field
        placeholder='Заголовок'
        style={{ width: '450px', paddingLeft: '20px' }}
        {...register('title', formRules.title)}
      />
      <TextArea
        style={{ maxWidth: '800px', minHeight: '400px' }}
        placeholder='Описание'
        {...register('description', formRules.description)}
      />
      <Field
        placeholder='Организатор'
        style={{ width: '450px', paddingLeft: '20px' }}
        {...register('organizer', formRules.organizer)}
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
            entity={'event'}
          />
        )}
      />
      <Controller
        control={control}
        name='categoriesId'
        rules={formRules.categoriesId}
        render={({ field: { value, onChange } }) => (
          <SelectCategories
            onChange={onChange}
            value={value}
            categories={categories}
          />
        )}
      />
      <div>
        <DateInput
          min={new Date().toISOString()}
          {...register('date', formRules.date)}
        />
      </div>
      <div>
        <Field
          placeholder={'Введите ссылку на мероприятие'}
          style={{ width: '500px', paddingLeft: '20px' }}
          {...register('link', formRules.link)}
        />
      </div>
      <div>
        <h3>Количество мест</h3>
        <Field
          style={{ width: '120px', textAlign: 'center', padding: '5px' }}
          type={'number'}
          {...register('places', formRules.places)}
        />
      </div>
      <div>
        <h3>Тип меропрития</h3>
        <Controller
          control={control}
          name='status'
          rules={formRules.status}
          render={({ field: { value, onChange } }) => (
            <InputRadio
              variants={variants}
              checked={value}
              onChange={onChange}
            />
          )}
        />
      </div>
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
