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
    title: "Público Objetivo",
    description: `
    Organizadores de festivales culturales.

Artistas y colectivos artísticos.

Jurados y evaluadores de eventos.

Instituciones y entidades de promoción cultural.
`,
    imageUrl: "/events-icon.png"
  },
  {
    title: "Sistema de calificaciones en tiempo real.",
    description: "Automatizar la generación de premiaciones y resultados.",
    imageUrl: "/judges-icon.png"
  },
  {
    title: "Transparencia y eficiencia en la evaluación y premiación.",
    description: "Reducción del tiempo y costo en la gestión de festivales.",
    imageUrl: "/artworks-icon.png"
  },
  {
    title: "Vamos!",
    description: "Ya estas preparado para utilizar la plataforma intuitiva para la gestión de eventos.",
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
          {steps[currentStep].title}
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
