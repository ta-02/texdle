import create from "zustand";
import { persist } from "zustand/middleware";
import { computeGuess, getRandomWord, LetterState } from "./utils";

export const GUESS_LENGTH = 6;

type GuessRow = {
  guess: string;
  result?: LetterState[];
};

type StoreState = {
  answer: string;
  rows: GuessRow[];
  gameState: "playing" | "won" | "lost";
  keyboardLetterState: { [letter: string]: LetterState };
  addGuess: (guess: string) => void;
  newGame: (initalGuess?: string[]) => void;
};

export const useStore = create<StoreState>();
