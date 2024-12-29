import Image from 'next/image'

export default function UnauthorizedMessage() {
  return (
    <div style={{ textAlign: 'center', height: '100vh' }}>
    <br />
    <br />
    <br />
    <Image
        // style={{ filter: 'invert(1) drop-shadow(0 0 0.3rem #ffffff70)' }}
        src="/logo-white.png"
        alt="Catarsis Musical Logo"
        width={250}
        height={80}
        priority
      />
    <br />
    <br />
    <br />
      <div>
        <b>Lo sentimos...</b>
        <p>Por favor ingresa otra vez.</p>
      </div>
    </div> // Simple message if not authenticated
  )
}
