import { EmployeeSlider } from '@/components/ui'

import { employees } from '@/constants/empoyee.constants'

import styles from './EmployeesBlock.module.scss'

export const EmployeesBlock = () => {
  return (
    <section className={styles.employees}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          В этом тебе поможет наш профсоюзный актив
        </h1>
        <EmployeeSlider employees={employees} />
      </div>
    </section>
  )
}
