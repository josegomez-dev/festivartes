// pages/onboarding.tsx

import styles from '@/app/assets/styles/Onboarding.module.css'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'

const steps = [
  {
    title: `🎨 Bienvenido a Festivartes`,
    description: "La plataforma oficial para digitalizar los Festivales Estudiantiles de las Artes. Organiza, evalúa y celebra el talento artístico de tu comunidad educativa, todo desde un solo lugar.",
    imageUrl: "/logo2.png"
  },
  {
    title: "🖼️ Registro de Obras",
    description: "Sube y gestiona obras de arte con facilidad. Cada creación se archiva con su información, categoría y participante, lista para ser evaluada o expuesta.",
    imageUrl: "/artworks-icon.png"
  },
  {
    title: "📅 Gestión de Eventos",
    description: `Crea festivales por fecha, circuito, sede y etapa. Administra roles, artistas, jurados y todo lo necesario para el buen desarrollo del evento.`,
    imageUrl: "/events-icon.png"
  },
  {
    title: "⭐ Calificaciones en Tiempo Real",
    description: "Jurados asignados pueden evaluar obras de manera digital, con criterios personalizables y resultados automáticos. ¡Transparencia y eficiencia garantizadas!",
    imageUrl: "/judges-icon.png"
  },
  {
    title: "🚀 ¡Comencemos!",
    description: "Estás listo para transformar tu festival cultural. Haz clic en 'Comenzar' y empieza a organizar con Festivartes.",
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
          <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>{steps[currentStep].description}</p>
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
              ◀ Atras
            </button>
          )}
          <button
            onClick={nextStep}
            className={`${styles['navigation-button']} ${styles['navigation-button-primary']}`}
          >
            {currentStep < steps.length - 1 ? 'Continuar ▶' : 'Comenzar 🚀'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Onboarding
