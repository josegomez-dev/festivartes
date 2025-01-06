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
            {/* <GiPartyFlags style={{ filter: 'drop-shadow(0 0 0.2rem black)' }} color='orange' /> */}
            <img width={"50px"} style={{ marginLeft: '-12px' }} src="https://cdn-icons-png.flaticon.com/512/3851/3851099.png" alt="" />
          </Link>
          <Link href={`/artworks`}>
            <RiBubbleChartFill style={{ filter: 'drop-shadow(0 0 0.2rem black)' }} color='gold' />
          </Link>
          {<Link href={`/judges`}>
            <FaPersonDotsFromLine style={{ filter: 'drop-shadow(0 0 0.2rem black)' }} color='#32acc0' />
          </Link>}
          {role === 'admin' && <Link href={`/settings`}>
            <IoSettings style={{ filter: 'drop-shadow(0 0 0.2rem black)' }} color='white' />
          </Link>}
        </nav>
      </div>
  )
}

export default SidebarMenu
