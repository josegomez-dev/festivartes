import styles from '@/app/assets/styles/AdminIndex.module.css';
import UnauthorizedMessage from '@/components/UnauthorizedMessage';
import { useGlobalContext } from '@/context/GlobalContext';
import { useState } from 'react';

export default function Proile() {
  const { role, authenticated } = useGlobalContext()

  if (!authenticated) {
    // Redirect to login if not admin or not authenticated
    return <UnauthorizedMessage />
  }

  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    setIsActive((prev) => !prev);
  };

  return (
    <div className={styles['full-view']}>
        <div className={`pCard_card ${isActive ? 'pCard_on' : ''}`}> 
            <div className="pCard_up">
                <div className="pCard_text">
                    <h2>Jose Alejandro Gomez Castro</h2>
                    <p>Musician & Software Engineer</p>
                </div>
                <div className="pCard_add" onClick={handleToggle}>
                    <i className={`fa ${isActive ? "fa-minus" : "fa-plus"}`}></i>
                </div>
            </div>
            <div className="pCard_down">
                <div>
                    <p>Projects</p>
                    <p>126</p>
                </div>
                <div>
                    <p>Views</p>
                    <p>21,579</p>
                </div>
                <div>
                    <p>Likes</p>
                    <p>1,976</p>
                </div>
            </div>
            <div className="pCard_back">
                <p>See My Latest Work Here</p>
                <a href="#"><i className="fa fa-facebook fa-2x fa-fw"></i></a>
                <a href="#"><i className="fa fa-linkedin fa-2x fa-fw"></i></a>
                <a href="#"><i className="fa fa-behance fa-2x fa-fw"></i></a> <br />
                <a href="#"><i className="fa fa-codepen fa-2x fa-fw"></i></a>
                <a href="#"><i className="fa fa-dribbble fa-2x fa-fw"></i></a>
                <a href="#"><i className="fa fa-instagram fa-2x fa-fw"></i></a>
                <p>Follow Me!</p>
            </div>
            </div>
    </div>
  )
}
