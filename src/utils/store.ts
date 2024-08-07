import { create } from "zustand";
import { persist } from "zustand/middleware";
import { computeGuess, getRandomWord, LetterState } from "./utils";

export const GUESS_LENGTH = 6;

interface GuessRow {
  guess: string;
  result?: LetterState[];
}

interface StoreState {
  answer: string;
  rows: GuessRow[];
  gameState: "playing" | "won" | "lost";
  keyboardLetterState: { [letter: string]: LetterState };
  addGuess: (guess: string) => void;
  newGame: (initialGuesses?: string[]) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      answer: getRandomWord(),
      rows: [],
      keyboardLetterState: {},
      gameState: "playing",
      addGuess: (guess: string) => {
        const result = computeGuess(guess.toLowerCase(), get().answer);
        const didWin = result.every((l) => l === "Match");

        const rows = [...get().rows, { guess, result }];
        const keyboardLetterState = { ...get().keyboardLetterState };

        result.forEach((r, index) => {
          const resultGuessLetter = guess[index];
          const currentLetterState = keyboardLetterState[resultGuessLetter];

          if (
            currentLetterState !== "Match" &&
            !(currentLetterState === "Present" && r === "Miss")
          ) {
            keyboardLetterState[resultGuessLetter] = r;
          }
        });

        set({
          rows,
          keyboardLetterState,
          gameState: didWin
            ? "won"
            : rows.length === GUESS_LENGTH
              ? "lost"
              : "playing",
        });
      },
      newGame: (initialGuesses = []) => {
        set({
          answer: getRandomWord(),
          rows: [],
          keyboardLetterState: {},
          gameState: "playing",
        });
        initialGuesses.forEach((guess) => get().addGuess(guess));
      },
    }),
    {
      name: "texdle",
    },
  ),
);
