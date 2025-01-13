import Image from 'next/image'

export default function UnauthorizedMessage() {
  return (
    <div className='unauthorized-message-wrapper'>
      <div>
        <Image
          src="/logo2.png"
          alt="Catarsis Musical Logo"
          width={200}
          height={200}
          priority
        />
        <br />
        <b>Lo sentimos...</b>
        <p>Por favor ingresa otra vez.</p>
      </div>
    </div> // Simple message if not authenticated
  )
}
