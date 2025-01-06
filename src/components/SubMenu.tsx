import styles from '@/app/assets/styles/AdminIndex.module.css';
import { useGlobalContext } from '@/context/GlobalContext';
import Link from 'next/link';
import { FaPersonDotsFromLine } from 'react-icons/fa6';
import { GiPartyFlags } from 'react-icons/gi';
import { IoSettings } from 'react-icons/io5';
import { RiBubbleChartFill } from 'react-icons/ri';

const SubMenu = ({ }) => {
  const { role } = useGlobalContext();

  return (
      <>
        <div className={styles['quick-links']} style={{ marginTop: '-50px'}}>
            <Link href={`/events`}>
              {/* <GiPartyFlags style={{ filter: 'drop-shadow(0 0 0.2rem black)' }} color="orange" /> */}
              <img width={"50px"} style={{ marginLeft: '0px' }} src="https://cdn-icons-png.flaticon.com/512/3851/3851099.png" alt="" />
            </Link>
            <Link href={`/artworks`}>
              {/* <RiBubbleChartFill style={{ filter: 'drop-shadow(0 0 0.2rem black)' }} color="gold" /> */}
              <img style={{ width: '70px' }} src="https://i.pinimg.com/originals/0a/bd/be/0abdbe1930b79e8a6c1176a64b5910e8.png" alt="" />
            </Link>
            {<Link href={`/judges`}>
              {/* <FaPersonDotsFromLine style={{ filter: 'drop-shadow(0 0 0.2rem black)' }} color="#32acc0" /> */}
              <span style={{ fontSize: '30px' }}>
                <img style={{ width: '100px' }} src="https://png.pngtree.com/png-vector/20220718/ourmid/pngtree-jury-judges-competition-score-scorecard-png-image_5920893.png" alt="" />
              </span>
            </Link>}
            {role === 'admin' && <Link href={`/settings`}>
            <IoSettings style={{ filter: 'drop-shadow(0 0 0.2rem black)' }} color="white" />
            </Link>}
        </div>
      </>
  )
}

export default SubMenu
