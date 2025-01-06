import { useGlobalContext } from "@/context/GlobalContext";
import React, { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import CustomModal from "./CustomModal";
import ArtworkRegisterForm from "./ArtworkRegisterForm";
import RatingForm from "./RatingForm";
import Image from 'next/image'
import Link from "next/link";
import { GiPartyFlags } from "react-icons/gi";
import { FaCirclePlus, FaPersonDotsFromLine, FaPlus } from "react-icons/fa6";
import { RiBubbleChartFill } from "react-icons/ri";

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

  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const openEventModal = () => setIsEventModalOpen(true);
  const closeEventModal = () =>setIsEventModalOpen(false);

  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const openInviteModal = () => setIsInviteModalOpen(true);
  const closeInviteModal = () =>setIsInviteModalOpen(false);

  const menuOptions : any = {
    admin: ["Registrar Evento", "Invitar Jurado"],
    judge: ["Calificar Obra", "Consultar Reglamento"],
    user: ["Registrar Nueva Obra"],
  };

  const options = menuOptions[role] || ["No options available"];

  // Handle click function
  const handleOptionClick = (option: string) => {
    setCurrentAction(option);
    if (option === 'Registrar Nueva Obra') { // user
      openUserModal();
    } else if (option === 'Calificar Obra') { // judge
      openJudgeModal();
    } else if (option === 'Consultar Reglamento') { // judge
      openRulesModal();
    } else if (option === 'Registrar Evento') { // admin
      openEventModal();
    } else if (option === 'Invitar Jurado') { // admin
      openInviteModal();
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
              {option === 'Registrar Evento' && <GiPartyFlags style={{ filter: 'drop-shadow(0 0 0.2rem black)' }} color="orange" />}
              {option === 'Invitar Jurado' && <FaPersonDotsFromLine style={{ filter: 'drop-shadow(0 0 0.2rem black)' }} color="#32acc0" />}
              {option === 'Calificar Obra' && <RiBubbleChartFill style={{ filter: 'drop-shadow(0 0 0.2rem black)' }} color="gold" />}
              {option === 'Consultar Reglamento' && <FaPersonDotsFromLine style={{ filter: 'drop-shadow(0 0 0.2rem black)' }} color="#32acc0" />}
              {option === 'Registrar Nueva Obra' && <RiBubbleChartFill style={{ filter: 'drop-shadow(0 0 0.2rem black)' }} color="gold" />}
              &nbsp;
              {option}
            </div>
          ))}
        </div>
        <br />
        <button className="menu-button" onClick={() => toggleDropdown()}>
          <FaCirclePlus style={{ fontSize: '50px', marginBottom: '-4px' }} />
        </button>
      </div>

      <CustomModal
        isOpen={isUserModalOpen}
        onClose={closeUserModal}
        height="90%" // Custom height
        // bgColor="black" // Custom background color
      >
        {/* <b>{currentAction}</b> */}
        <p style={{ textAlign: 'center' }}>
          <span>Anímate a descubrir tu </span><b>Artista Interior</b>
        </p>
        <div>
          <br />
          <ArtworkRegisterForm />
        </div>
      </CustomModal>

      <CustomModal
        isOpen={isJudgeModalOpen}
        onClose={closeJudgeModal}
        height="90%" // Custom height
        // bgColor="black" // Custom background color
      >
        {/* <b>{currentAction}</b> */}
        <div style={{ textAlign: 'center' }}>
          <b style={{ fontSize: '30px' }}>
            &nbsp;Puntuación Final (0-10)&nbsp;
          </b>
        </div>
        <div className="form-wrapper">
          <RatingForm />
        </div>
      </CustomModal>

      <CustomModal
        isOpen={isRulesModalOpen}
        onClose={closeRulesModal}
        height="90%" // Custom height
        // bgColor="black" // Custom background color
      >
        <b>{currentAction}</b>
        <div>
          <br />
          <iframe src="https://www.mep.go.cr/sites/default/files/2023-05/reglamento-FEA-23.pdf" width={"100%"} height={"500px"}></iframe>
        </div>
      </CustomModal>

      <CustomModal
        isOpen={isEventModalOpen}
        onClose={closeEventModal}
        height="90%" // Custom height
        // bgColor="black" // Custom background color
      >
        <b>{currentAction}</b>
        <div>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi repellat quia qui vitae? Illo eveniet ut fugit! Cupiditate facere magni aut architecto eaque dolores quibusdam dolor sint voluptate. Laboriosam, aliquam.
          </p>
        </div>
      </CustomModal>
   
      <CustomModal
        isOpen={isInviteModalOpen}
        onClose={closeInviteModal}
        height="90%" // Custom height
        // bgColor="black" // Custom background color
      >
        <b>{currentAction}</b>
        <div>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi repellat quia qui vitae? Illo eveniet ut fugit! Cupiditate facere magni aut architecto eaque dolores quibusdam dolor sint voluptate. Laboriosam, aliquam.
          </p>
        </div>
      </CustomModal>
    </>
  );
};

export default FloatingMenuButton;
