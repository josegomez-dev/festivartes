import styles from '@/app/assets/styles/RegisterForm.module.css';

interface YesOrNoQuestionProps {
  checked: boolean,
  title?: string,
  idQuestion: string,
  textContent: string,
  handleToggleChange: any,
}

const YesOrNoQuestionForm: React.FC<YesOrNoQuestionProps> = ({ checked, title, idQuestion, textContent, handleToggleChange }) => {
  return (
    <div className={styles.formGroup}>
        <div className={styles['input-wrapper']}>
          <div className={styles['input-container']}>
              <input
              type="checkbox"
              id={idQuestion}
              name={idQuestion}
              checked={checked}
              onChange={handleToggleChange}
              />
              &nbsp;
              {/* <span className={styles.toggleLabel}>
              {checked ? "Si" : "No"}
              </span> */}
          </div> 
          <label className={styles.label} htmlFor={idQuestion}>
              <i><u>{title}</u></i>&nbsp;
              {textContent}
          </label>
        </div>
        <div>
          <label className={`${styles.label}`} htmlFor={`${idQuestion}_comment`}>Observaciones: </label>
          <textarea
              id={`${idQuestion}_comment`}
              name={`${idQuestion}_comment`}
              className={styles.toggle}
              onChange={handleToggleChange}
          />
        </div>
        <br />
    </div>
  )
}

export default YesOrNoQuestionForm
