'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/buttons/button/Button'
import { DateInput } from '@/components/ui/fields/date-input/DateInput'
import { Field } from '@/components/ui/fields/field/Field'
import { TextArea } from '@/components/ui/fields/text-area/TextArea'
import { Uploader } from '@/components/ui/fields/uploader/Uploader'
import { InputRadio } from '@/components/ui/input-radio/InputRadio'
import { SelectCategories } from '@/components/ui/select-categories/SelectCategories'

import { IEventFormData, TypeImage } from '@/types/event.types'

import { DASHBOARD_PAGES } from '@/config/page-url.config'

import { useGetCategories } from '@/hooks/category/useGetCategories'
import { useCreateEvent } from '@/hooks/event/useCreateEvent'
import { useGetEventById } from '@/hooks/event/useGetEventById'
import { useUpdateEvent } from '@/hooks/event/useUpdateEvent'

import styles from './EventForm.module.scss'

interface IEventForm {
  isEditing?: boolean
}

export const EventForm = ({ isEditing }: IEventForm) => {
  const { eventId } = useParams() as { eventId: string }
  const { data, isFetching } = useGetEventById(eventId)
  const event = data?.data

  const initialTypeEvent = useMemo(
    () => (isEditing ? (event?.link ? 'link' : 'no-link') : 'link'),
    [isEditing, event]
  )
  const [typeEvent, setTypeEvent] = useState(initialTypeEvent)
  const isLink = typeEvent === 'link'

  const initialValues = useMemo(
    () => ({
      title: '',
      description: '',
      organizer: '',
      imagesId: [],
      eventDate: '',
      categoriesId: [],
      link: '',
      totalTickets: 0
    }),
    []
  )

  const [values, setValues] = useState<IEventFormData>(initialValues)
  const [images, setImages] = useState<TypeImage[]>([])

  const { categories } = useGetCategories()
  const { createEvent, isPendingCreate, isSuccessCreate } = useCreateEvent()
  const { updateEvent, isPendingUpdate, isSuccessUpdate } = useUpdateEvent()

  const isSuccess = isSuccessCreate || isSuccessUpdate
  const isPending = isPendingCreate || isPendingUpdate

  useEffect(() => {
    if (isEditing && eventId && event) {
      const categoriesId = event.categories.map(category => category.id)
      const imagesId = event.images.map(image => image.id)

      setImages(event?.images)
      setValues({
        title: event?.title,
        description: event.description,
        organizer: event.organizer,
        imagesId,
        eventDate: event.eventDate,
        categoriesId,
        link: event.link,
        totalTickets: event.totalTickets
      })
    }
  }, [isFetching, isEditing, eventId, event])

  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<IEventFormData>({
    defaultValues: initialValues,
    values
  })

  const onSubmit: SubmitHandler<IEventFormData> = data => {
    data.totalTickets = Number(data.totalTickets)
    isEditing ? updateEvent({ data, eventId }) : createEvent(data)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.event_form}
    >
      <Field
        placeholder='Заголовок'
        style={{ width: '450px', paddingLeft: '20px' }}
        error={errors.title}
        {...register('title', {
          required: {
            value: true,
            message: 'Поле обязательно для заполнения'
          }
        })}
      />
      <TextArea
        style={{ maxWidth: '800px' }}
        placeholder='Описание'
        error={errors.description}
        {...register('description', {
          required: {
            value: true,
            message: 'Поле обязательно для заполнения'
          }
        })}
      />
      <Field
        placeholder='Организатор'
        style={{ width: '450px', paddingLeft: '20px' }}
        error={errors.organizer}
        {...register('organizer', {
          required: {
            value: true,
            message: 'Поле обязательно для заполнения'
          }
        })}
      />
      <Controller
        control={control}
        name='imagesId'
        rules={{
          required: {
            value: true,
            message: 'Нужно загрузить хотя бы одну фотографию'
          }
        }}
        render={({ field: { value: imagesId, onChange: setImagesId } }) => (
          <Uploader
            imagesId={imagesId}
            setImagesId={setImagesId}
            images={images}
            error={errors.imagesId}
          />
        )}
      />
      <Controller
        control={control}
        name='categoriesId'
        rules={{
          required: {
            value: true,
            message: 'Нужно выбрать хотя бы одну категорию'
          }
        }}
        render={({ field: { onChange, value } }) => (
          <SelectCategories
            onChange={onChange}
            value={value}
            categories={categories}
            error={errors.categoriesId}
          />
        )}
      />
      <div>
        <DateInput
          error={errors.eventDate}
          {...register('eventDate', {
            required: {
              value: true,
              message: 'Поле обязательно для заполнения'
            }
          })}
        />
      </div>
      <div>
        <p>Мероприятие с сылкой на google форму?</p>
        <InputRadio
          setTypeEvent={setTypeEvent}
          style={{ marginBottom: '20px' }}
        />
        <Field
          placeholder={
            isLink ? 'Ссылка на форму' : 'Введите количество билетов'
          }
          style={{ width: '500px', paddingLeft: '20px' }}
          error={errors.link || errors.totalTickets}
          {...register(isLink ? 'link' : 'totalTickets', {
            required: {
              value: true,
              message: 'Поле обязательно для заполнения'
            }
          })}
        />
      </div>
      <Button
        text={isEditing ? 'Сохранить' : 'Создать'}
        isPending={isPending}
        isSuccess={isSuccess}
        style={{ width: '400px' }}
        type='submit'
      />
    </form>
  )
}
