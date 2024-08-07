import wordBank from "./wordBank.json";

export const WORD_LENGTH = 5;

export const getRandomWord = () => {
  return wordBank.valid[Math.floor(Math.random() * wordBank.valid.length)];
};

export type LetterState = "Miss" | "Present" | "Match";

export const computeGuess = (guess: string, answer: string): LetterState[] => {
  const letterState: LetterState[] = new Array(WORD_LENGTH).fill("Miss");
  const answerCharCount: Record<string, number> = {};

  guess.split("").forEach((char, i) => {
    if (char === answer[i]) {
      letterState[i] = "Match";
    } else {
      answerCharCount[answer[i]] = (answerCharCount[answer[i]] || 0) + 1;
    }
  });

  guess.split("").forEach((char, i) => {
    if (letterState[i] === "Miss" && answerCharCount[char]) {
      letterState[i] = "Present";
      answerCharCount[char]--;
    }
  });

  return letterState;
};

export const isValidWord = (guess: string): boolean => {
  return wordBank.valid.includes(guess.toLowerCase());
};
