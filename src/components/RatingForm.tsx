import React, { useEffect, useState } from "react";
import styles from "./../app/assets/styles/RegisterForm.module.css";
import YesOrNoQuestionForm from "./YesOrNoQuestionForm";
import MultiCheckBoxQuestionForm from "./MultiCheckBoxQuestionForm";
import { db } from "./../../firebaseConfig";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { QUESTION_TYPES } from "@/types/questions.types";

interface RatingFormProps {
  artworkIdentifier?: string;
  userIdentifier?: string;
  closeModal?: () => void;
}

const RatingForm: React.FC<RatingFormProps> = ({ artworkIdentifier, userIdentifier, closeModal }) => {

  const sectionTitle1 = "Desglose de valoración de aspectos formativos de la propuesta artistica";
  const sectionTitle2 = "Desgloce de valoración de aspectos tecnico-artisticos";
  const sectionTitle3 = "Observaciones de la valoración integral de la obra";

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
    question1_Label: "Letra de la canción: ¿Se toma en cuenta el contenido y el mensaje de la letra, de acuerdo con lo que estipula el artículo 3 del Reglamento del Festival Estudiantil de las Artes 2025?",
    question1: false,
    question1_comment: "",
    question2_label: "Entonación y afinación: ¿La voz de la persona participante presenta una afinación y entonación precisa y correcta de acuerdo con los instrumentos musicales que lo acompañan? En caso de ser a capella, ¿mantiene la entonación y afinación, por lo que se tomará en cuenta la tonalidad con la que inicie la canción?",
    question2: false,
    question2_comment: "",
    question3_Label: "Dicción: ¿Se refiere a una pronunciación correcta de las palabras? ¿Las cantantes o los cantantes utilizan una dicción clara y limpia? ¿Utiliza pronunciación correcta?",
    question3: false,
    question3_comment: "",
    question4_Label: "Precisión en la ejecución vocal y estabilidad en el ritmo: ¿El tempo, compás y ritmo son constantes y puntuales a la hora de cantar? ¿Mantienen concordancia con la línea melódica que emite la voz?",
    question4: false,
    question4_comment: "",
    question5_Label: "¿Propongo esta obra artística para ser considerada en la deliberación con posibilidad de ser seleccionada?",
    question5: false,
    question5_comment: "",
    multiCheckbox: multiCheckboxOptions.map(option => ({
      ...option, 
      checked: option.checked // Assuming 'checked' is part of 'option'
    }))
  });

  const howManyChecked = (): number => {
    let checkedCount = 0;
    for (let i = 0; i < formData.multiCheckbox.length; i++) {
      if (formData.multiCheckbox[i].checked) {
        checkedCount++;
      }
    }
    if (formData.question1) checkedCount++;
    if (formData.question2) checkedCount++;
    if (formData.question3) checkedCount++;
    if (formData.question4) checkedCount++;
    if (formData.question5) checkedCount++;

    if (checkedCount > 10) {
      checkedCount = 10;
    }
    return checkedCount;
  }

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
      const updatedCheckboxes = prevData.multiCheckbox.map((item) =>
        item.value === value ? { ...item, checked } : item
      );  
      return {
        ...prevData,
        multiCheckbox: updatedCheckboxes, // Set the updated array back into the formData state
      };
    });
  };
  
  const transformRatingForm = (ratingForm: {
    [x: string]: any;
    question1_Label?: string;
    question1?: boolean;
    question1_comment?: string;
    question2_label?: string;
    question2?: boolean;
    question2_comment?: string;
    question3_Label?: string;
    question3?: boolean;
    question3_comment?: string;
    question4_Label?: string;
    question4?: boolean;
    question4_comment?: string;
    question5_Label: any;
    question5: any;
    question5_comment: any;
    multiCheckbox: any;
  }) => {
    return [
      {
        sectionTitle: sectionTitle1,
        items: ratingForm.multiCheckbox.map((item: QUESTION_TYPES) => ({
          label: item.label,
          checked: !!item.checked,
          comments: '', // No comments field in multiCheckbox
        })),
      },
      {
        sectionTitle: sectionTitle2,
        items: [1, 2, 3, 4].map((i) => ({
          label: ratingForm[`question${i}_Label`] || ratingForm[`question${i}_label`] || '',
          checked: !!ratingForm[`question${i}`],
          comments: ratingForm[`question${i}_comment`] || '',
        })),
      },
      {
        sectionTitle: sectionTitle3,
        items: [
          {
            label: ratingForm.question5_Label || '',
            checked: !!ratingForm.question5,
            comments: ratingForm.question5_comment || '',
          },
        ],
      },
    ];
  }; 
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!artworkIdentifier) {
      console.error("artworkIdentifier is undefined");
      return;
    }

    const docRef = doc(db, 'artworks', artworkIdentifier);

    try {
      const docSnap = await getDoc(docRef); // Get existing data
      const existingData = docSnap.exists() ? docSnap.data() : {};
      const existingRates = existingData.rates || [];

      const newRate = {
        judgeIdentifier: userIdentifier,
        ratingForm: transformRatingForm(formData),
        rateAt: new Date().toISOString(),
        rateValue: howManyChecked(),
      };

      const updatedRates = [...existingRates, newRate];

      await updateDoc(docRef, { rates: updatedRates });

      toast.success("Formulario enviado correctamente");
      window.location.reload();
    } catch (error) {
      console.error("Error updating document: ", error);
      toast.error("Error al enviar el formulario");
    }

    // Reset form and close modal
    setFormData({
      question1_Label: "...",
      question1: false,
      question1_comment: "",
      question2_label: "...",
      question2: false,
      question2_comment: "",
      question3_Label: "...",
      question3: false,
      question3_comment: "",
      question4_Label: "...",
      question4: false,
      question4_comment: "",
      question5_Label: "...",
      question5: false,
      question5_comment: "",
      multiCheckbox: multiCheckboxOptions.map(option => ({
        ...option,
        checked: option.checked,
      })),
    });

    if (closeModal) closeModal();
  };


  return (
    <>
      <div className="modal-title-centered">
        <b>&nbsp;Puntuación Final ({howManyChecked()}-10)&nbsp;</b>
      </div>
      <div className={styles['form-wrapper']}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <p className="bolder-text">
              <b>{sectionTitle1}</b>
            </p>
            <br />
            <MultiCheckBoxQuestionForm
              multiCheckboxOptions={multiCheckboxOptions}
              formData={formData}
              handleChange={handleMultiCheckboxChange}
            />
          </div>

          <hr />
          <br />
          <p className="bolder-text"><b>{sectionTitle2}</b></p>
          <br />
          <YesOrNoQuestionForm
            // title=""
            textContent={formData.question1_Label}
            idQuestion={"question1"}
            checked={formData.question1}
            handleToggleChange={handleToggleChange}
          />

          <YesOrNoQuestionForm
            // title=""
            textContent={formData.question2_label}
            idQuestion={"question2"}
            checked={formData.question2}
            handleToggleChange={handleToggleChange}
          />

          <YesOrNoQuestionForm
            // title=""
            textContent={formData.question3_Label}
            idQuestion={"question3"}
            checked={formData.question3}
            handleToggleChange={handleToggleChange}
          />

          <YesOrNoQuestionForm
            // title=""
            textContent={formData.question4_Label}
            idQuestion={"question4"}
            checked={formData.question4}
            handleToggleChange={handleToggleChange}
          />

          <hr />
          <br />
          <p className="bolder-text">
            <b>{sectionTitle3}</b>
          </p>

          <br />
          <YesOrNoQuestionForm
            // title=""
            textContent={formData.question5_Label}
            idQuestion={"question5"}
            checked={formData.question5}
            handleToggleChange={handleToggleChange}
          />

          <button className={`${styles.submitButton}`}>
            <b>Enviar Formulario</b>
          </button>
        </form>
      </div>
    </>
  );
};

export default RatingForm;
