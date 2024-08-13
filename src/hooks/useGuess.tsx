import { useState, useEffect } from "react";
import { WORD_LENGTH } from "../utils/utils";

export const useGuess = (): [
  string,
  React.Dispatch<React.SetStateAction<string>>,
  (c: string) => void,
] => {
  const [guess, setGuess] = useState("");

  const addGuessLetter = (c: string) => {
    setGuess((currGuess) => {
      if (c === "" || c === "Backspace") {
        return currGuess.slice(0, -1);
      }

      if (
        (c === "ENTER" || c === "Enter") &&
        currGuess.length === WORD_LENGTH
      ) {
        return "";
      }

      if (c.length === 1 && currGuess.length < WORD_LENGTH) {
        return currGuess + c;
      }

      return currGuess;
    });
  };

  const isLetter = (str: string) => {
    return str.length === 1 && str.match(/[a-z]/i);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const letter = isLetter(e.key) ? e.key.toUpperCase() : e.key;
      addGuessLetter(letter);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return [guess, setGuess, addGuessLetter];
};
