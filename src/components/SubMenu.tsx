import styles from '@/app/assets/styles/AdminIndex.module.css';
import { useGlobalContext } from '@/context/GlobalContext';
import Link from 'next/link';

const SubMenu = ({ }) => {
  const { role } = useGlobalContext();

  return (
      <>
        <div className={styles['quick-links']}>
            <Link href={`/events`}>
              <img width={"50px"} style={{ marginLeft: '0px', marginTop: '8px' }} src="https://cdn-icons-png.flaticon.com/512/3851/3851099.png" alt="" />
            </Link>
            <Link href={`/artworks`}>
              <img style={{ width: '60px', marginTop: '10px' }} src="https://i.pinimg.com/originals/0a/bd/be/0abdbe1930b79e8a6c1176a64b5910e8.png" alt="" />
            </Link>
            {<Link href={`/judges`}>
              <span style={{ fontSize: '30px' }}>
                <img style={{ width: '50px', marginTop: '8px' }} src="https://cdn1.iconfinder.com/data/icons/cyber-sport/96/jury_judge_arbiter_referee_expert_competition_contest-512.png" alt="" />
              </span>
            </Link>}
        </div>
      </>
  )
}

export default SubMenu
