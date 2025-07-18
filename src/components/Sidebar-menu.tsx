import Link from 'next/link';
90897
import { IoSettings } from "react-icons/io5";
import Image from 'next/image';

const SidebarMenu = () => {
  return (
      <div className="sidebar">
        <nav>
           <Link href={`/artworks`}>
            <Image
              src="/artworks-icon.png"
              alt="artworks-icon"
              width={50}
              height={50}
              priority
            />
          </Link>

          <Link href={`/events`}>
            <Image
              src="/events-icon.png"
              alt="events-icon"
              width={50}
              height={50}
              priority
            />
          </Link>

          {<Link href={`/judges`}>
            <Image
              src="/judges-icon.png"
              alt="judges-icon"
              width={50}
              height={50}
              priority
            />
          </Link>}
          {/* <Link href={`/settings`}>
            <IoSettings className="io-settings-icon" color='white' />
          </Link> */}
        </nav>
      </div>
  )
}

export default SidebarMenu
