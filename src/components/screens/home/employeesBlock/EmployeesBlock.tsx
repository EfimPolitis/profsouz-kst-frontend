import { employees } from '@/constants/empoyee.constants'

import { Slider } from '../../sliders/employee-slider/Slider'

import styles from './EmployeesBlock.module.scss'

export const EmployeesBlock = () => {
  return (
    <section className={styles.employees}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          В этом тебе поможет наш профсоюзный актив
        </h1>
        <Slider employees={employees} />
      </div>
    </section>
  )
}
