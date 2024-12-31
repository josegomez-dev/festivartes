import { useGlobalContext } from "@/context/GlobalContext";
import React, { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import CustomModal from "./CustomModal";
import ArtworkRegisterForm from "./ArtworkRegisterForm";
import RatingForm from "./RatingForm";
import Image from 'next/image'

const FloatingMenuButton = () => {
  const { role } = useGlobalContext();

  const [isMenuOpen, setIsMenuOpen] = useState(false);  
  const [currentAction, setCurrentAction] = useState('');

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);  
  const openUserModal = () => setIsUserModalOpen(true);
  const closeUserModal = () =>setIsUserModalOpen(false);

  const [isJudgeModalOpen, setIsJudgeModalOpen] = useState(false);
  const openJudgeModal = () => setIsJudgeModalOpen(true);
  const closeJudgeModal = () =>setIsJudgeModalOpen(false);

  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);
  const openRulesModal = () => setIsRulesModalOpen(true);
  const closeRulesModal = () =>setIsRulesModalOpen(false);

  const menuOptions : any = {
    admin: ["Registrar Evento", "Invitar Jurado"],
    judge: ["Calificar Obra", "Consultar Reglamento"],
    user: ["Registrar Nueva Obra"],
  };

  const options = menuOptions[role] || ["No options available"];

  // Handle click function
  const handleOptionClick = (option: string) => {
    setCurrentAction(option);
    if (option === 'Registrar Nueva Obra') {
      openUserModal();
    } else if (option === 'Calificar Obra') {
      openJudgeModal();
    } else if (option === 'Consultar Reglamento') {
      openRulesModal();
    }
    return;
  };

  const menuDropdown = document.querySelector('.menu-dropdown');

  const toggleDropdown = () => {
    setIsMenuOpen(!isMenuOpen);
    if (menuDropdown && menuDropdown instanceof HTMLElement) {
      menuDropdown.style.display = isMenuOpen ? 'none' : 'flex';
    }
  };
  
  return (
    <>
      <div className="floating-menu">
        <div className="menu-dropdown">
          {options.map((option: string, index: number) => (
            <div key={index} className="menu-item" onClick={() => handleOptionClick(option)}>
              {option}
            </div>
          ))}
        </div>
        <br />
        <button className="menu-button" onClick={() => toggleDropdown()}>
          <Image
            src="/3d-rendered-illustration-button-icon-260nw-66130720-removebg-preview.png"
            alt="3d bottom menu"
            width={100}
            height={100}
            priority
          />
        </button>
      </div>
      <CustomModal
        isOpen={isUserModalOpen}
        onClose={closeUserModal}
        height="60%" // Custom height
        bgColor="black" // Custom background color
      >
        <h2>{currentAction}</h2>
        <div>
          <br />
          <ArtworkRegisterForm />
        </div>
      </CustomModal>

      <CustomModal
        isOpen={isJudgeModalOpen}
        onClose={closeJudgeModal}
        height="85%" // Custom height
        bgColor="black" // Custom background color
      >
        <h2>{currentAction}</h2>
        <div>
          <br />
          <RatingForm />
        </div>
      </CustomModal>

      <CustomModal
        isOpen={isRulesModalOpen}
        onClose={closeRulesModal}
        height="90%" // Custom height
        bgColor="black" // Custom background color
      >
        <h2>{currentAction}</h2>
        <div>
          <br />
          <iframe src="https://www.mep.go.cr/sites/default/files/2023-05/reglamento-FEA-23.pdf" width={"100%"} height={"500px"}></iframe>
        </div>
      </CustomModal>
    </>
  );
};

export default FloatingMenuButton;
