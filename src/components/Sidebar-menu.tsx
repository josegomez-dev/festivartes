import Link from 'next/link';
import { IoSettings } from "react-icons/io5";
import { useGlobalContext } from '../context/GlobalContext'
import { FaPersonDotsFromLine } from 'react-icons/fa6';
import { GiPartyFlags } from 'react-icons/gi';
import { RiBubbleChartFill } from 'react-icons/ri';

const SidebarMenu = () => {
  const { role } = useGlobalContext()

  return (
      <div className="sidebar">
        <nav>
          <Link href={`/events`}>
            <GiPartyFlags style={{ filter: 'drop-shadow(0 0 0.2rem black)' }} color='orange' />
          </Link>
          <Link href={`/artworks`}>
            <RiBubbleChartFill style={{ filter: 'drop-shadow(0 0 0.2rem black)' }} color='gold' />
          </Link>
          {<Link href={`/judges`}>
            <FaPersonDotsFromLine style={{ filter: 'drop-shadow(0 0 0.2rem black)' }} color='lightgreen' />
          </Link>}
          {role === 'admin' && <Link href={`/settings`}>
            <IoSettings style={{ filter: 'drop-shadow(0 0 0.2rem black)' }} color='#32acc0' />
          </Link>}
        </nav>
      </div>
  )
}

export default SidebarMenu
