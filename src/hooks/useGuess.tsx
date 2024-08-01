import { useState, useEffect } from "react";
import { WORD_LENGTH } from "../utils/utils";

export const useGuess = (): [
  string,
  React.Dispatch<React.SetStateAction<string>>,
  (c: string) => void
] => {
  const [guess, setGuess] = useState("");

  const addGuessLetter = (c: string) => {
    setGuess((currGuess) => {
      if (c === "Backspace") {
        return currGuess.slice(0, -1);
      }

      if (c === "Enter" && currGuess.length === WORD_LENGTH) {
        return "";
      }

      if (c.length === 1 && currGuess.length < WORD_LENGTH) {
        return currGuess + c;
      }

      return currGuess;
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      addGuessLetter(e.key);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return [guess, setGuess, addGuessLetter];
};
