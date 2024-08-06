import { Header } from "./components/Header";
import { WordRows } from "./components/WordRows";
import { Keyboard } from "./components/Keyboard";
import { GUESS_LENGTH, useStore } from "./utils/store";
import { useGuess } from "./hooks/useGuess";
import { usePrevious } from "./hooks/usePrevious";
import { useEffect, useState } from "react";
import { isValidWord, WORD_LENGTH } from "./utils/utils";

function App() {
  const state = useStore();
  const [guess, setGuess, addGuessLetter] = useGuess();
  const addGuess = useStore((s) => s.addGuess);
  const previousGuess = usePrevious(guess);
  const [showInvalidGuess, setInvalidGuess] = useState(false);

  useEffect(() => {
    let id: number | undefined;
    if (showInvalidGuess) {
      id = window.setTimeout(() => setInvalidGuess(false), 2000);
    }
    return () => {
      if (id !== undefined) {
        clearTimeout(id);
      }
    };
  }, [showInvalidGuess]);

  useEffect(() => {
    if (guess.length === 0 && previousGuess?.length === WORD_LENGTH) {
      if (isValidWord(previousGuess)) {
        addGuess(previousGuess);
        setInvalidGuess(false);
      } else {
        setInvalidGuess(true);
        setGuess(previousGuess);
      }
    }
  }, [guess, addGuess, previousGuess, setGuess]);

  let rows = [...state.rows];
  let currRow = 0;

  if (rows.length < GUESS_LENGTH) {
    currRow = rows.push({ guess }) - 1;
  }

  const numGuessRemain = GUESS_LENGTH - rows.length;

  const isGameOver = state.gameState !== "playing";

  return (
    <div className="bg-red-300 flex flex-col items-center justify-center h-screen">
      <Header />
      <main className="grid grid-rows-6 gap-4 mb-4">
        {rows.map(({ guess, result }, index) => (
          <WordRows
            key={index}
            letters={guess}
            result={result}
            className={
              showInvalidGuess && currRow === index ? `animate-bounce` : ``
            }
          />
        ))}
      </main>

      <Keyboard
        onClick={(letter) => {
          addGuessLetter(letter);
        }}
      />

      {isGameOver && (
        <div
          role="modal"
          className="absolute left-0 right-0 grid w-11/12 grid-rows-4 p-6 mx-auto text-center bg-black border border-gray-500 rounded-lg h-1/2 top-1/4"
        >
          {state.gameState === "won" ? (
            <span className="pt-12 text-6xl font-semibold text-white">
              You Won!
            </span>
          ) : (
            <span className="text-4xl font-semibold text-white">
              Game Over!
            </span>
          )}

          {state.gameState === "lost" && (
            <WordRows
              letters={state.answer}
              className="items-center justify-items-center"
            />
          )}

          <button
            className="absolute left-0 right-0 block p-2 mx-auto mt-4 font-bold text-white bg-green-500 border border-green-500 rounded top-56 hover:opacity-90 w-28"
            onClick={() => {
              state.newGame();
              setGuess("");
            }}
          >
            NEW GAME
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
