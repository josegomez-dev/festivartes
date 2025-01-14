import React, { useEffect, useState } from "react";
import styles from "./../app/assets/styles/RegisterForm.module.css";
import YesOrNoQuestionForm from "./YesOrNoQuestionForm";
import MultiCheckBoxQuestionForm from "./MultiCheckBoxQuestionForm";

const RatingForm = () => {
  const multiCheckboxOptions = [
    { 
      label: "¿La propuesta artística está acorde con el artículo 3 del Reglamento para la organización y ejecución del Festival Estudiantil de las Artes?", 
      value: "1",
      checked: false
    },
    { 
      label: "¿Incorpora una reflexión crítica en el contenido?", 
      value: "2",
      checked: false
    },
    { 
      label: "¿El contenido de las obras no sugiere frases, expresiones o manifestaciones que pongan en consideración la dignidad humana, los derechos humanos y la equidad de género?", 
      value: "3",
      checked: false 
    },
    { 
      label: "¿El contenido de la obra valida y respeta la diversidad humana?", 
      value: "4",
      checked: false
    },
    { 
      label: "¿La propuesta artística no visibiliza algún tipo de discriminación?", 
      value: "5",
      checked: false
    },
    { 
      label: "¿Incorpora el uso de lenguaje inclusivo en escritos, contenido y títulos de las obras realizadas por la comunidad?", 
      value: "6",
      checked: false
     },
  ];
  
  const [formData, setFormData] = useState({
    question1: false,
    question1_comment: "",
    question2: false,
    question2_comment: "",
    question3: false,
    question3_comment: "",
    question4: false,
    question4_comment: "",
    question5: false,
    question5_comment: "",
    multiCheckbox: multiCheckboxOptions.map(option => ({
      ...option, 
      checked: option.checked // Assuming 'checked' is part of 'option'
    }))
  });

  useEffect(() => {
    setFormData({
      question1: false,
      question1_comment: "",
      question2: false,
      question2_comment: "",
      question3: false,
      question3_comment: "",
      question4: false,
      question4_comment: "",
      question5: false,
      question5_comment: "",
      multiCheckbox: multiCheckboxOptions.map(option => ({
        ...option, 
        checked: option.checked
      }))
    });
  }, []);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name.includes('_comment') ? value: checked,
    }));
  };

  const handleMultiCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
  
    setFormData((prevData) => {
      // Update the multiCheckboxOptions array by finding the item with the matching value and updating its checked property
      const updatedCheckboxes = prevData.multiCheckbox.map((item) =>
        item.value === value ? { ...item, checked } : item
      );
  
      return {
        ...prevData,
        multiCheckbox: updatedCheckboxes, // Set the updated array back into the formData state
      };
    });
  };
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className={styles['form-wrapper']}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <p className="bolder-text">Desglose de valoracion de aspectos formativos de la propuesta artistica:</p>
          <br />
          <MultiCheckBoxQuestionForm
            multiCheckboxOptions={multiCheckboxOptions}
            formData={formData}
            handleChange={handleMultiCheckboxChange}
          />
        </div>
        
        <hr />
        <br />
        
        <YesOrNoQuestionForm
          title="Letra de la canción: "
          textContent="¿Se toma en cuenta el contenido y el mensaje de la letra, de acuerdo con lo que estipula el artículo 3 del Reglamento del Festival Estudiantil de las Artes 2025?"
          idQuestion={"question1"}
          checked={formData.question1}
          handleToggleChange={handleToggleChange}
        />

        <YesOrNoQuestionForm
          title="Entonación y afinación: "
          textContent="¿La voz de la persona participante presenta una afinación y entonación precisa y correcta de acuerdo con los instrumentos musicales que lo acompañan? En caso de ser a capella, ¿mantiene la entonación y afinación, por lo que se tomará en cuenta la tonalidad con la que inicie la canción?"
          idQuestion={"question2"}
          checked={formData.question2}
          handleToggleChange={handleToggleChange}
        />

        <YesOrNoQuestionForm
          title="Dicción:"
          textContent="¿Se refiere a una pronunciación correcta de las palabras? ¿Las cantantes o los cantantes utilizan una dicción clara y limpia? ¿Utiliza pronunciación correcta?"
          idQuestion={"question3"}
          checked={formData.question3}
          handleToggleChange={handleToggleChange}
        />

        <YesOrNoQuestionForm
          title="Precisión en la ejecución vocal y estabilidad en el ritmo: "
          textContent="¿El tempo, compás y ritmo son constantes y puntuales a la hora de cantar? ¿Mantienen concordancia con la línea melódica que emite la voz?"
          idQuestion={"question4"}
          checked={formData.question4}
          handleToggleChange={handleToggleChange}
        />

        <p className="bolder-text">Desgloce de valoracion de aspectos tecnico-artisticos (Observaciones de la valoracion integral de la obra).</p>

        <YesOrNoQuestionForm
          textContent="¿Propongo esta obra artística para ser considerada en la deliberación con posibilidad de ser seleccionada?"
          idQuestion={"question5"}
          checked={formData.question5}
          handleToggleChange={handleToggleChange}
        />

        <div className={styles.formGroup}>
          <label className={styles['label']}>
           Editar Puntuación Final
          </label>
          <select
            id="question4"
            name="question4"
            className={styles.select}
            onChange={handleSelectChange}
          >
            {Array.from({ length: 11 }, (_, index) => (
              <option key={index} value={index}>
                {index}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className={styles.submitButton}>
          <b>Enviar Formulario</b>
        </button>
      </form>
    </div>
  );
};

export default RatingForm;
