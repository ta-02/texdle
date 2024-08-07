import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { BsPatchQuestion } from "react-icons/bs";
import { Instructions } from "./Instructions";

export const Header = () => {
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false);
  const toggleInstructions = () => setIsInstructionsOpen(!isInstructionsOpen);
  return (
    <header className="flex justify-between items-center text-center mt-4">
      <button className="p-4 text-gray-300" onClick={toggleInstructions}>
        <BsPatchQuestion />
      </button>
      <Instructions isOpen={isInstructionsOpen} onClose={toggleInstructions} />
      <h1 className="text-lg text-gray-300 p-4">texdle</h1>
      <a
        className="p-4 text-gray-300"
        href="https://github.com/ta-02/texdle"
        target="_blank"
      >
        <FaGithub />
      </a>
    </header>
  );
};
