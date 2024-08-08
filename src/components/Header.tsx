import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { BsPatchQuestion } from "react-icons/bs";
import { Instructions } from "./Instructions";

export const Header = () => {
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false);
  const toggleInstructions = () => setIsInstructionsOpen(!isInstructionsOpen);
  return (
    <header className="flex justify-between items-center text-center mt-4">
      <button
        className="text-2xl p-4 transition-opacity duration-300 hover:opacity-80"
        onClick={toggleInstructions}
      >
        <BsPatchQuestion />
      </button>
      <Instructions isOpen={isInstructionsOpen} onClose={toggleInstructions} />
      <h1 className="text-4xl font-serif p-4">texdle</h1>
      <a
        className="text-2xl p-4 transition-opacity duration-300 hover:opacity-80"
        href="https://github.com/ta-02/texdle"
        target="_blank"
      >
        <FaGithub />
      </a>
    </header>
  );
};
