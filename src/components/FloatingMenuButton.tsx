import { useAuth } from "@/context/AuthContext";
import React, { useState } from "react";
import CustomModal from "./CustomModal";
import ArtworkRegisterForm from "./ArtworkRegisterForm";
import Image from 'next/image'
import { FaCirclePlus } from "react-icons/fa6";
import EventRegisterForm from "./EventRegisterForm";
import InviteRegisterForm from "./InviteRegisterForm";
import { RiBubbleChartFill } from "react-icons/ri";

const FloatingMenuButton = () => {
  const { role } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);  
  const [currentAction, setCurrentAction] = useState('');

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);  
  const openUserModal = () => setIsUserModalOpen(true);
  const closeUserModal = () =>setIsUserModalOpen(false);

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
    admin: ["Registrar Evento", "Registrar Nueva Obra", "Consultar Reglamento", "Invitar Jurado"],
    judge: ["Registrar Nueva Obra", "Consultar Reglamento"],
    user: ["Registrar Nueva Obra", "Consultar Reglamento"],
  };

  const options = menuOptions[role] || ["No options available"];

  // Handle click function
  const handleOptionClick = (option: string) => {
    setCurrentAction(option);
    if (option === 'Registrar Nueva Obra') { // admin, judge, user
      openUserModal();
    } else if (option === 'Consultar Reglamento') { // admin, judge, user
      openRulesModal();
    } else if (option === 'Registrar Evento') { // admin INTERNAL PANEL FEATURE
      openEventModal();
    } else if (option === 'Invitar Jurado') { // admin
      openInviteModal();
    }
    return;
  };


  const openDropdown = () => {
    if (isMenuOpen) {
      closeDropdown();
    } else {
      const menuDropdown = document.querySelector('.menu-dropdown') as HTMLElement;
      setIsMenuOpen(true);
      menuDropdown.style.display = 'block';  
    }
  };

  const closeDropdown = () => {
    const menuDropdown = document.querySelector('.menu-dropdown') as HTMLElement;
    setIsMenuOpen(false);
    menuDropdown.style.display = 'none';
  };
  
  return (
    <>
      <div className="floating-menu">
        <div className="menu-dropdown">
          {options.map((option: string, index: number) => (
            <div key={index} className="menu-item" onClick={() => handleOptionClick(option)}>
             <RiBubbleChartFill color='orange'/>
              &nbsp;
              &nbsp;
              {option}
            </div>
          ))}
        </div>
        <br />
        <button className="menu-button" onClick={() => openDropdown()}>
          <FaCirclePlus className="floating-menu-button" />
        </button>
      </div>

      <CustomModal
        isOpen={isUserModalOpen}
        onClose={closeUserModal}
        height="85%" // Custom height
      >
        <div className="modal-title-centered">
            <b>Anímate a descubrir tu Artista Interior</b>
        </div>
        <div className="form-wrapper">
          <ArtworkRegisterForm />
        </div>
      </CustomModal>

      <CustomModal
        isOpen={isRulesModalOpen}
        onClose={closeRulesModal}
        height="90%" // Custom height
      >
        <b>{currentAction}</b>
        <div className="form-wrapper">
          <br />
          <iframe src="https://www.mep.go.cr/sites/default/files/2023-05/reglamento-FEA-23.pdf" width={"100%"} height={"500px"}></iframe>
        </div>
      </CustomModal>

      <CustomModal
        isOpen={isInviteModalOpen}
        onClose={closeInviteModal}
        height="70%" // Custom height
        // bgColor="black" // Custom background color
      >
        <div className="modal-title-centered">
          <b>
            <b>Invitar Jurado</b>
          </b>
        </div>
        <div className="form-wrapper">
          <InviteRegisterForm closeModal={closeInviteModal} />
        </div>
      </CustomModal>

      <CustomModal
        isOpen={isEventModalOpen}
        onClose={closeEventModal}
        height="80%" // Custom height
      >
        <div className="modal-title-centered">
          <b>
            <b>{currentAction}</b>
          </b>
        </div>
        <div className="form-wrapper">
          <EventRegisterForm />
        </div>
      </CustomModal>

    </>
  );
};

export default FloatingMenuButton;
