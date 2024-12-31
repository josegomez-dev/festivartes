import React, { useState } from "react";
import styles from "./../app/assets/styles/RatingForm.module.css";

const RatingForm = () => {
  const [formData, setFormData] = useState({
    question1: "0",
    question2: "0",
    question3: false, // yes/no toggle
    question4: "0",
    multiCheckbox: [], // for multi-checkbox field
  });

  const multiCheckboxOptions = [
    { label: "Option A", value: "5" }, // 5 points
    { label: "Option B", value: "3" }, // 3 points
    { label: "Option C", value: "2" }, // 2 points
    { label: "Option D", value: "4" }, // 4 points
    { label: "Option E", value: "1" }, // 1 point
  ];

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  // const handleMultiCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { value, checked } = e.target;

  //   setFormData((prevData) => {
  //     const updatedCheckboxes = checked
  //       ? [...prevData.multiCheckbox, value]
  //       : prevData.multiCheckbox.filter((item) => item !== value);

  //     return {
  //       ...prevData,
  //       multiCheckbox: updatedCheckboxes,
  //     };
  //   });
  // };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Calculate total score
    const checkboxScore = formData.multiCheckbox.reduce(
      (total, value) => total + parseInt(value, 10),
      0
    );

    const totalScore =
      parseInt(formData.question1) +
      parseInt(formData.question2) +
      (formData.question3 ? 10 : 0) + // Add points for yes/no
      parseInt(formData.question4) +
      checkboxScore;

    console.log("Form submitted:", formData, "Total Score:", totalScore);
    alert(`Your total score is: ${totalScore}`);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <b>Desglose de valoracion de aspectos formativos de la propuesta artistica.</b> 
        <br />
        <br />
        <label className={styles.label} htmlFor="question1">
          La propuesta artistica esta acorde con el <a href="">articulo 3 del Reglamento para la organizacion y ejecucion del Festival Estudiantil de las Artes</a> 
        </label>
        {/* <select
          id="question1"
          name="question1"
          className={styles.select}
          value={formData.question1}
          onChange={handleSelectChange}
        >
          {[...Array(11).keys()].map((score) => (
            <option key={score} value={score}>
              {score}
            </option>
          ))}
        </select>
        <br />
        <br /> */}
        <label className={styles.label}>Obseravaciones: </label>
        <textarea
          id="question3"
          name="question3"
          className={styles.toggle}
          onChange={() => handleToggleChange}
        />
      </div>

    <hr />
    <br />
    
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="question2">
          Incorpora una reflexion critica en el contenido? 
        </label>
        {/* <select
          id="question2"
          name="question2"
          className={styles.select}
          value={formData.question2}
          onChange={handleSelectChange}
        >
          {[...Array(11).keys()].map((score) => (
            <option key={score} value={score}>
              {score}
            </option>
          ))}
        </select>
        <br />
        <br /> */}
        <label className={styles.label}>Obseravaciones: </label>
        <textarea
          id="question3"
          name="question3"
          className={styles.toggle}
          onChange={() => handleToggleChange}
        />
      </div>

      <hr />
      <br />

      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="question2">
          El contenido de las obras no sugiere frases, expresiones o manifestaciones que pongan en consideracion la dignidad humana, los derechos humanos y la equidad de genero? 
        </label>
        {/* <select
          id="question2"
          name="question2"
          className={styles.select}
          value={formData.question2}
          onChange={handleSelectChange}
        >
          {[...Array(11).keys()].map((score) => (
            <option key={score} value={score}>
              {score}
            </option>
          ))}
        </select>
        <br />
        <br /> */}
        <label className={styles.label}>Obseravaciones: </label>
        <textarea
          id="question3"
          name="question3"
          className={styles.toggle}
          onChange={() => handleToggleChange}
        />
      </div>

      <hr />
      <br />
    
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="question2">
          El contenido de la obra valida y respeta la diversidad humana?
        </label>
        {/* <select
          id="question2"
          name="question2"
          className={styles.select}
          value={formData.question2}
          onChange={handleSelectChange}
        >
          {[...Array(11).keys()].map((score) => (
            <option key={score} value={score}>
              {score}
            </option>
          ))}
        </select>
        <br />
        <br /> */}
        <label className={styles.label}>Obseravaciones: </label>
        <textarea
          id="question3"
          name="question3"
          className={styles.toggle}
          onChange={() => handleToggleChange}
        />
      </div>

      <hr />
      <br />

      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="question2">
          La propuesta artistica no visibiliza algun tipo de discriminacion?
        </label>
        {/* <select
          id="question2"
          name="question2"
          className={styles.select}
          value={formData.question2}
          onChange={handleSelectChange}
        >
          {[...Array(11).keys()].map((score) => (
            <option key={score} value={score}>
              {score}
            </option>
          ))}
        </select>
        <br />
        <br /> */}
        <label className={styles.label}>Obseravaciones: </label>
        <textarea
          id="question3"
          name="question3"
          className={styles.toggle}
          onChange={() => handleToggleChange}
        />
      </div>

      <hr />
      <br />
      
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="question2">
          Incorpora el uso de lenguaje inclusivo en escritos, contenido y titulos de las obras realizadas por la comunidad
        </label>
        {/* <select
          id="question2"
          name="question2"
          className={styles.select}
          value={formData.question2}
          onChange={handleSelectChange}
        >
          {[...Array(11).keys()].map((score) => (
            <option key={score} value={score}>
              {score}
            </option>
          ))}
        </select>
        <br />
        <br /> */}
        <label className={styles.label}>Obseravaciones: </label>
        <textarea
          id="question3"
          name="question3"
          className={styles.toggle}
          onChange={() => handleToggleChange}
        />
      </div>

      <hr />
      <br />

      {/* <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="question3">
          Would you recommend this service to others? (Yes/No)
        </label>
        <input
          type="checkbox"
          id="question3"
          name="question3"
          className={styles.toggle}
          checked={formData.question3}
          onChange={handleToggleChange}
        />
        <span className={styles.toggleLabel}>
          {formData.question3 ? "Yes" : "No"}
        </span>
      </div> */}

      {/* <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="question4">
          Rate the quality of the product (0-10)
        </label>
        <select
          id="question4"
          name="question4"
          className={styles.select}
          value={formData.question4}
          onChange={handleSelectChange}
        >
          {[...Array(11).keys()].map((score) => (
            <option key={score} value={score}>
              {score}
            </option>
          ))}
        </select>
      </div> */}

      {/* <div className={styles.formGroup}>
        <label className={styles.label}>Select relevant options:</label>
        <div className={styles.checkboxGroup}>
          {multiCheckboxOptions.map((option) => (
            <label key={option.label} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                value={option.value}
                onChange={handleMultiCheckboxChange}
                checked={formData.multiCheckbox.includes(option.value)}
              />
              {option.label}
            </label>
          ))}
        </div>
      </div> */}

      <b>Desgloce de valoracion de aspectos tecnico-artisticos.</b>

        <br />
        <br />
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="question2">
          Letra de la cancion: se toma en cuenta el contenido y el mensaje de la letra, de acuerdo con lo que estipula el articulo 3 del Reglamento del Festival Estudiantil de las Artes 2025.
        </label>
        {/* <select
          id="question2"
          name="question2"
          className={styles.select}
          value={formData.question2}
          onChange={handleSelectChange}
        >
          {[...Array(11).keys()].map((score) => (
            <option key={score} value={score}>
              {score}
            </option>
          ))}
        </select>
        <br />
        <br /> */}
        <label className={styles.label}>Obseravaciones: </label>
        <textarea
          id="question3"
          name="question3"
          className={styles.toggle}
          onChange={() => handleToggleChange}
        />
      </div>

      <hr />
      <br />

      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="question2">
          Entonacion y afinacion: la voz de la persona participante presenta una afinacion y entonacion precisa y correcta de acuerdo con los instrumentos musicales que lo acompanan. En caso de ser a capella, mantiene la entonacion y afinacion por lo que se tomara en cuenta la tonalidad con la que inicie la cancion.
        </label>
        {/* <select
          id="question2"
          name="question2"
          className={styles.select}
          value={formData.question2}
          onChange={handleSelectChange}
        >
          {[...Array(11).keys()].map((score) => (
            <option key={score} value={score}>
              {score}
            </option>
          ))}
        </select>
        <br />
        <br /> */}
        <label className={styles.label}>Obseravaciones: </label>
        <textarea
          id="question3"
          name="question3"
          className={styles.toggle}
          onChange={() => handleToggleChange}
        />
      </div>

      <hr />
      <br />

      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="question2">
          Diccion: se refiere a una pronunciacion correcta de las palabras. Las cantantes o los cantantes utilizacn una diccion clara y limpia. Utiliza pronunciacion correcta.
        </label>
        {/* <select
          id="question2"
          name="question2"
          className={styles.select}
          value={formData.question2}
          onChange={handleSelectChange}
        >
          {[...Array(11).keys()].map((score) => (
            <option key={score} value={score}>
              {score}
            </option>
          ))}
        </select>
        <br />
        <br /> */}
        <label className={styles.label}>Obseravaciones: </label>
        <textarea
          id="question3"
          name="question3"
          className={styles.toggle}
          onChange={() => handleToggleChange}
        />
      </div>

      <hr />
      <br />

      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="question2">
          Precision en la ejecucion vocal y estavilidad en el ritmo: el tempo, compas y ritmo son constantes y puntuales a la hora de cantar y mantienen concordancia con la linea melodica que emite la voz.
        </label>
        {/* <select
          id="question2"
          name="question2"
          className={styles.select}
          value={formData.question2}
          onChange={handleSelectChange}
        >
          {[...Array(11).keys()].map((score) => (
            <option key={score} value={score}>
              {score}
            </option>
          ))}
        </select>
        <br />
        <br /> */}
        <label className={styles.label}>Obseravaciones: </label>
        <textarea
          id="question3"
          name="question3"
          className={styles.toggle}
          onChange={() => handleToggleChange}
        />
      </div>

      <b>Observaciones de la valoracion integral de la obra: </b>

        <br />
        <br />
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="question2">
          Propongo esta obra artistica para ser considerada en la deliberacion con posibilidad de ser seleccionada.
        </label>
        {/* <select
          id="question2"
          name="question2"
          className={styles.select}
          value={formData.question2}
          onChange={handleSelectChange}
        >
          {[...Array(11).keys()].map((score) => (
            <option key={score} value={score}>
              {score}
            </option>
          ))}
        </select>
        <br />
        <br /> */}
        <label className={styles.label}>Obseravaciones: </label>
        <textarea
          id="question3"
          name="question3"
          className={styles.toggle}
          onChange={() => handleToggleChange}
        />
      </div>

      <button type="submit" className={styles.submitButton}>
        Submit
      </button>
    </form>
  );
};

export default RatingForm;
