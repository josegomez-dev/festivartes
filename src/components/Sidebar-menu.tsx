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
            <img style={{ width: '60px', marginLeft: '-18px', marginTop: '10px', filter: 'drop-shadow(0 0 0.2rem black)' }} src="https://i.pinimg.com/originals/0a/bd/be/0abdbe1930b79e8a6c1176a64b5910e8.png" alt="" />
          </Link>
          {<Link href={`/judges`}>
            <img style={{ width: '50px', marginLeft: '-13px', marginTop: '8px' }} src="https://cdn1.iconfinder.com/data/icons/cyber-sport/96/jury_judge_arbiter_referee_expert_competition_contest-512.png" alt="" />
          </Link>}
          {role === 'admin' && <Link href={`/settings`}>
            <IoSettings style={{ marginLeft: '-3px', marginTop: '15px', filter: 'drop-shadow(0 0 0.2rem black)' }} color='white' />
          </Link>}
        </nav>
      </div>
  )
}

export default SidebarMenu
