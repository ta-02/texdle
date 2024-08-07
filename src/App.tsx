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

  const rows = [...state.rows];
  let currRow = 0;

  if (rows.length < GUESS_LENGTH) {
    currRow = rows.push({ guess }) - 1;
  }

  // Ensure there are always 6 rows
  while (rows.length < GUESS_LENGTH) {
    rows.push({ guess: "" });
  }

  const isGameOver = state.gameState !== "playing";

  console.log(state.answer);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="flex flex-col items-center space-y-4">
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
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="bg-gray-800 p-4 rounded">
            {state.gameState === "won" ? (
              <span className="text-green-500">You Won!</span>
            ) : (
              <span className="text-red-500">Game Over!</span>
            )}

            {state.gameState === "lost" && <WordRows letters={state.answer} />}

            <button
              className="mt-4 px-4 py-2 bg-blue-500 rounded hover:bg-blue-700"
              onClick={() => {
                state.newGame();
                setGuess("");
              }}
            >
              NEW GAME
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
