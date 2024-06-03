'use client'

import cn from 'clsx'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { CSSProperties, useState } from 'react'

import styles from './Slider.module.scss'

interface IEmployee {
  imageUrl: string
  fullName: string
  position: string
  description: string
}

interface ISlider {
  employees: IEmployee[]
  style?: CSSProperties
  isCard?: boolean
}

export const Slider = ({ employees, isCard, style }: ISlider) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const prevSlide = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? employees.length - 1 : prevIndex - 1
    )
  }

  const nextSlide = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === employees.length - 1 ? 0 : prevIndex + 1
    )
  }

  return (
    <div
      className={cn(
        styles.slider_container,
        isCard ? styles.card : styles.standart
      )}
      style={style}
    >
      <div className={'slider'}>
        {employees?.map((employee, index) => (
          <div
            key={index}
            className={cn(
              styles.slide,
              index === currentIndex ? styles.active : ''
            )}
          >
            <div
              className={styles.image}
              style={{ backgroundImage: `url(${employee.imageUrl})` }}
            ></div>
            <div className={styles.info_block}>
              <h2 className={styles.full_name}>{employee.fullName}</h2>
              <h4 className={styles.position}>{employee.position}</h4>
              <p className={styles.description}>{employee.description}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        className={cn(styles.arrow, styles.prev)}
        onClick={prevSlide}
      >
        <ChevronLeft size={24} />
      </button>
      <button
        className={cn(styles.arrow, styles.next)}
        onClick={nextSlide}
      >
        <ChevronRight size={24} />
      </button>
      <div className={styles.indicator}>
        {currentIndex + 1}/{employees.length}
      </div>
      <style jsx>{`
        .slider {
          display: flex;
          transition: transform 0.5s ease-in-out;
          transform: translateX(-${currentIndex * 100}%);
        }
      `}</style>
    </div>
  )
}
