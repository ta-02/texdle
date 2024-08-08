import { Header } from "./components/Header";
import { WordRows } from "./components/WordRows";
import { Keyboard } from "./components/Keyboard";
import { GUESS_LENGTH, useStore } from "./utils/store";
import { useGuess } from "./hooks/useGuess";
import { usePrevious } from "./hooks/usePrevious";
import { useEffect, useState } from "react";
import { isValidWord, WORD_LENGTH } from "./utils/utils";
import { IoCloseCircle } from "react-icons/io5"; // Ensure you import the icon if needed

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

  while (rows.length < GUESS_LENGTH) {
    rows.push({ guess: "" });
  }

  const isGameOver = state.gameState !== "playing";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-950 text-white p-4">
      <Header />
      <main className="flex flex-col items-center w-full max-w-md space-y-4">
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
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 flex items-center justify-center bg-neutral-950 bg-opacity-90 p-4"
        >
          <div className="bg-neutral-950 border border-white rounded-lg shadow-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <h2 className="text-2xl italic font-serif">
                {state.gameState === "won" ? "You Won!" : "Game Over!"}
              </h2>
              <button onClick={() => state.newGame()}>
                <IoCloseCircle className="text-3xl text-white" />
              </button>
            </div>
            {state.gameState === "lost" && (
              <div className="font-serif text-center">
                <p className="mb-4 text-lg">The correct word was:</p>
                <div className="flex justify-center">
                  <WordRows letters={state.answer} />
                </div>
              </div>
            )}
            <button
              className="mt-4 w-full px-4 py-2 bg-blue-500 rounded hover:bg-blue-700 text-white"
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
