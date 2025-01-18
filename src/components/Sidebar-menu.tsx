import Link from 'next/link';
import { IoSettings } from "react-icons/io5";
import { useGlobalContext } from '../context/GlobalContext'
import { FaPersonDotsFromLine } from 'react-icons/fa6';
import { GiPartyFlags } from 'react-icons/gi';
import { RiBubbleChartFill } from 'react-icons/ri';
import Image from 'next/image';
import { MdDashboardCustomize } from "react-icons/md";

const SidebarMenu = () => {
  const { role } = useGlobalContext()

  return (
      <div className="sidebar">
        <nav>
          <Link href={`/events`}>
            <Image
              src="/events-icon.png"
              alt="Catarsis Musical Logo"
              width={50}
              height={50}
              priority
            />
          </Link>
          <Link href={`/artworks`}>
            <Image
              src="/artworks-icon.png"
              alt="Catarsis Musical Logo"
              width={50}
              height={50}
              priority
            />
          </Link>
          {<Link href={`/judges`}>
            <Image
              src="/judges-icon.png"
              alt="Catarsis Musical Logo"
              width={50}
              height={50}
              priority
            />
          </Link>}
          <Link href={`/settings`}>
            <IoSettings style={{ marginLeft: '10px', marginTop: '-5px' }} color='white' />
          </Link>
        </nav>
      </div>
  )
}

export default SidebarMenu
