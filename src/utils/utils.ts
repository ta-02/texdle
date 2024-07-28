import wordBank from "./wordBank.json";

export const WORD_LENGTH = 5;

export const getRandomWord = () => {
  return wordBank.valid[Math.floor(Math.random() * wordBank.valid.length)];
};

export type LetterState = "Miss" | "Present" | "Match";

const computeLetterState = (g: string, a: string): LetterState => {};

export const computeGuess = (guess: string, answer: string): LetterState[] => {
  const result: LetterState[] = [];

  if (guess.length !== answer.length) {
    return result;
  }
  const guessArray = guess.split("");
  const answerArray = answer.split("");

  for (let i = 0; i < guessArray.length; i++) {}
};
