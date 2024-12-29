import styles from '@/app/assets/styles/UserIndex.module.css';
import UnauthorizedMessage from '@/components/UnauthorizedMessage';
import { useGlobalContext } from '@/context/GlobalContext';

const UserHome = () => {
  const { role, authenticated } = useGlobalContext()

  if (role !== 'user' || !authenticated) {
    return <UnauthorizedMessage />
  }

  return (
    <>
      <div className={styles['user-index']}>
        <div className={styles['welcome-message']}>
            <p>
              Hola, <b>Jose Alejandro!</b>
            </p>
            Animate a descubrir tu artista interior.
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum molestiae libero sunt provident sed! Vitae expedita odio repellendus debitis reiciendis nihil assumenda molestiae ut, architecto nesciunt tempore, deleniti dicta eveniet!
        </p>

      </div>
    </>
  )
}

export default UserHome
