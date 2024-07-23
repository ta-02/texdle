import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { BsPatchQuestion } from "react-icons/bs";

const Header = () => {
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false);
  const toggleInstructions = () => setIsInstructionsOpen(!isInstructionsOpen);
  return (
    <header>
      <button onClick={toggleInstructions}>
        <BsPatchQuestion />
      </button>

      <h1>texdle</h1>
    </header>
  );
};

export default Header;
