import authStyles from '@/app/assets/styles/Auth.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function UnauthorizedMessage() {
  return (
    <div className={`unauthorized-message-wrapper`} style={{ textAlign: 'center' }}>
      <div>
        <div>
          <b>Lo sentimos...</b>
          <p>Por favor ingresa otra vez.</p>
        </div>
        <Image
          src="/logo2.png"
          alt="Catarsis Musical Logo"
          width={250}
          height={250}
          priority
        />
        <Link href="/">
          <button className={`${authStyles['auth-button']}`}>
              <b>Volver a la pagina principal</b>
          </button>
        </Link>
      </div>
    </div> // Simple message if not authenticated
  )
}
