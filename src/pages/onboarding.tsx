// pages/onboarding.tsx

import styles from '@/app/assets/styles/Onboarding.module.css'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'

const steps = [
  {
    title: `Bienvenido a Festivartes`,
    description: "Simplifica, automatiza y digitaliza todo tu festival cultural: registros, calificaciones y premiaciones. ¡Todo en un solo lugar!",
    imageUrl: "/logo2.png"
  },
  {
    title: "Obras de Arte",
    description: "Registros  y resultados.",
    imageUrl: "/artworks-icon.png"
  },
  {
    title: "Festivartes",
    description: `Organización efectiva de eventos culturales.`,
    imageUrl: "/events-icon.png"
  },
  {
    title: "Calificaciones en Tiempo Real",
    description: "Evaluación y premiación automatica.",
    imageUrl: "/judges-icon.png"
  },
  {
    title: "¡Comencemos!",
    description: "¿Estas preparado para utilizar la plataforma?",
    imageUrl: "/logo2.png"
  }
]

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const router = useRouter()

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Navigate to the user's main dashboard or home after the final step
      router.push('/dashboard')
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className={styles['onboarding-container']}>
      <div className={styles['onboarding-card']}>
        <h1 className={styles['onboarding-header']}>
          <b className='font-size-3rem'>{steps[currentStep].title}</b>
        </h1>
        <div className={styles['onboarding-step']}>
          <p>{steps[currentStep].description}</p>
          {steps[currentStep].imageUrl && (
            <Image
              src={steps[currentStep].imageUrl}
              alt={steps[currentStep].title}
              width={350}
              height={350}
            />
          )}
        </div>
        <div className={styles['onboarding-navigation']}>
          {currentStep > 0 && (
            <button
              onClick={prevStep}
              className={`${styles['navigation-button']} ${styles['navigation-button-secondary']}`}
            >
              Back
            </button>
          )}
          <button
            onClick={nextStep}
            className={`${styles['navigation-button']} ${styles['navigation-button-primary']}`}
          >
            {currentStep < steps.length - 1 ? 'Next' : 'Finish'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Onboarding
