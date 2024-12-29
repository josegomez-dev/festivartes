import { useGlobalContext } from "@/context/GlobalContext";
import React from "react";
import { FiPlusCircle } from "react-icons/fi";

const FloatingMenuButton = () => {
  const { role } = useGlobalContext();
  
  const menuOptions : any = {
    admin: ["Evento Calificado", "Evento Regular", "Invitar Jurado"],
    user: ["Crear Nueva Obra"],
    // judge: ["Sign Up", "Login", "Explore"],
  };

  const options = menuOptions[role] || ["No options available"];

  return (
    <div className="floating-menu">
      <button className="menu-button">
        <FiPlusCircle />
      </button>
      <div className="menu-dropdown">
        {options.map((option: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined, index: React.Key | null | undefined) => (
          <div key={index} className="menu-item">
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FloatingMenuButton;
