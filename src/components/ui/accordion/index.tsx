'use client'

import { AnimatePresence, m } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import React, { useState } from 'react'

import styles from './index.module.scss'

interface AccordionProps {
  title: string
  children: React.ReactNode
}

export const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleAccordion = () => setIsOpen(prev => !prev)

  return (
    <div className={styles.accordion}>
      <button
        onClick={toggleAccordion}
        className={styles.header}
      >
        <p className={styles.title}>{title}</p>
        <m.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown size={20} />
        </m.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <m.div
            key='content'
            initial='collapsed'
            animate='open'
            exit='collapsed'
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 }
            }}
            transition={{ duration: 0.3, ease: 'linear' }}
            className={styles.contentWrapper}
          >
            <div className={styles.content}>{children}</div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}
