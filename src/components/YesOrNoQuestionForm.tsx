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
        <label className={styles.label} htmlFor={idQuestion}>
            <b>{title}</b>
            {textContent}
        </label>
        <div className={styles['input-container-right']}>
            <input
            type="checkbox"
            id={idQuestion}
            name={idQuestion}
            checked={checked}
            onChange={handleToggleChange}
            />
            &nbsp;
            <span className={styles.toggleLabel}>
            {checked ? "Si" : "No"}
            </span>
        </div> 
        <label className={styles.label} htmlFor={`${idQuestion}_comment`}>Observaciones: </label>
        <textarea
            id={`${idQuestion}_comment`}
            name={`${idQuestion}_comment`}
            className={styles.toggle}
            onChange={handleToggleChange}
        />
        </div>
        <hr />
    </div>
  )
}

export default YesOrNoQuestionForm
