'use client'

import { Download, File, Plus, Trash2, X } from 'lucide-react'
import Image from 'next/image'
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState
} from 'react'
import { FieldError, Merge } from 'react-hook-form'

import { TypeImage } from '@/types/event.types'

import { axiosWithAuth } from '@/api/interseptors'

import styles from './Uploader.module.scss'

interface IUploader {
  imagesId: string[]
  setImagesId: Dispatch<SetStateAction<string[]>>
  images: TypeImage[]
  error?: Merge<FieldError, (FieldError | undefined)[]>
}

export const Uploader = ({
  imagesId,
  setImagesId,
  images,
  error
}: IUploader) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [fileNames, setFileNames] = useState<string[]>([])
  const [imagesUrl, setImagesUrl] = useState<string[]>([])

  const handleChangeImage = async ({
    target: { files }
  }: ChangeEvent<HTMLInputElement>) => {
    try {
      if (!files) return

      const formData = new FormData()
      const file = files[0]

      formData.append('image', file)

      const { data } = await axiosWithAuth.post<{ url: string; id: string }>(
        '/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )

      setFileNames(prev => [...prev, files[0]?.name])
      setImagesUrl([...imagesUrl, data.url])
      setImagesId([...imagesId, data.id])
    } catch (error) {
      alert(`Произошла ошибка ${error}`)
      console.log(error)
    }
  }

  useEffect(() => {
    const imagesName = images.map(image => image.name)
    const imagesUrl = images.map(image => image.url)
    setFileNames(imagesName)
    setImagesUrl(imagesUrl)
  }, [images])

  console.log(imagesUrl, imagesId, fileNames)

  return (
    <div className={styles.uploader}>
      <div
        className={styles.uploader_input}
        onClick={() => {
          if (inputRef.current) inputRef.current.click()
        }}
      >
        <input
          type='file'
          accept='image/*'
          hidden
          ref={inputRef}
          onChange={handleChangeImage}
        />
        {imagesUrl.length > 0 ? (
          <div className={styles.img}>
            <Image
              src={imagesUrl[0]}
              alt={fileNames[0]}
              layout='responsive'
              width={700}
              height={475}
            />
          </div>
        ) : (
          <>
            <Download size={50} />
            <p>Выберите файл для загрузки</p>
          </>
        )}
      </div>
      <div className={styles.images}>
        {imagesUrl.slice(1, imagesUrl.length).map((url, i) => (
          <Image
            width={200}
            height={120}
            key={i}
            src={url}
            alt={fileNames[i]}
          />
        ))}
      </div>
      <section className={styles.selected}>
        {fileNames.length ? (
          fileNames.map((fileName, i) => (
            <span key={i}>
              <File /> {fileName}{' '}
              <X
                className={styles.X}
                onClick={() => {
                  setFileNames(fileNames.filter((_, ind) => ind !== i))
                  setImagesUrl(imagesUrl.filter((_, ind) => ind !== i))
                  setImagesId(imagesId.filter((_, ind) => ind !== i))
                }}
              />
            </span>
          ))
        ) : (
          <span>
            <File /> файл не выбран
          </span>
        )}
        {imagesId.length > 0 && (
          <div className={styles.buttons}>
            <div
              className={styles.input}
              onClick={() => {
                if (inputRef.current) inputRef.current.click()
              }}
            >
              Добавить ещё фотографию <Plus size={24} />
              <input
                type='file'
                accept='image/*'
                hidden
                ref={inputRef}
                onChange={handleChangeImage}
              />
            </div>
            <button
              className={styles.trash}
              title='удалить файл'
              onClick={() => {
                setFileNames([])
                setImagesUrl([])
                setImagesId([])
              }}
            >
              Удалить всё <Trash2 />
            </button>
          </div>
        )}
        {error && <div className={styles.error}>{error.message}</div>}
      </section>
    </div>
  )
}
