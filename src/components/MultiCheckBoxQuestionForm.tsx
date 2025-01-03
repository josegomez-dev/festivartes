import styles from '@/app/assets/styles/RegisterForm.module.css';

interface MultiCheckBoxQuestionFormProps {
  multiCheckboxOptions: any;
  handleChange: any;
  formData: any;
}

const MultiCheckBoxQuestionForm: React.FC<MultiCheckBoxQuestionFormProps> = ({ multiCheckboxOptions, handleChange, formData }) => {
  return (
    <div className={styles.checkboxGroup}>
      {multiCheckboxOptions.map((option: any, index: number) => (
        <label key={option.label} className={styles.checkboxLabel}>
          <input
            type="checkbox"
            value={option.value}
            onChange={handleChange}
            checked={formData.multiCheckbox[index].checked}
          />
          &nbsp; {option.label}
        </label>
      ))}
    </div>
  )
}

export default MultiCheckBoxQuestionForm
