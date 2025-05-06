import Image from 'next/image';
import Link from 'next/link';
import Preloader from '@/components/Preloader';

export default function UnauthorizedMessage() {
  return (
    <div className="unauthorized-message-wrapper text-align-center">
      <div>
        <Preloader message="Autenticando..." />
        <div>
          <Link href="/login">
            <Image
              src="/logo2.png"
              alt="festivartes-logo"
              width={250}
              height={250}
              priority
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
