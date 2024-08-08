import { useStore } from "../utils/store";
import { LetterState } from "../utils/utils";
import { BsFillBackspaceFill } from "react-icons/bs";

export function Keyboard({ onClick }: { onClick: (key: string) => void }) {
  const keyboardLetterState = useStore((s) => s.keyboardLetterState);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { innerText } = e.currentTarget;
    let returnProps = innerText;
    if (innerText === "Backspace") {
      returnProps = "Backspace";
    }
    onClick(returnProps);
  };

  return (
    <div className="flex flex-col mt-4">
      {keyboardKeys.map((keyboardRow, rowIndex) => (
        <div
          key={rowIndex}
          className="flex justify-center mb-2 my-2 space-x-1 text-white"
        >
          {keyboardRow.map((key, index) => {
            let styles = "rounded font-bold uppercase flex-1 py-2 px-2";

            const letterState = keyStateStyles[keyboardLetterState[key]];

            if (letterState) {
              styles += ` px-1 ${letterState}`;
            } else if (key !== "") {
              styles += " bg-gray-600";
            }

            if (key === "") {
              styles += " pointer-events-none";
            } else {
              styles += " px-1";
            }

            return (
              <button
                onClick={handleClick}
                key={key + index}
                className={styles}
              >
                {key === "Backspace" ? (
                  <BsFillBackspaceFill className="w-5 h-5" />
                ) : (
                  key
                )}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

const keyboardKeys = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["", "A", "S", "D", "F", "G", "H", "J", "K", "L", ""],
  ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Backspace"],
];

const keyStateStyles: { [key in LetterState]?: string } = {
  Miss: "bg-gray-800",
  Present: "bg-yellow-500",
  Match: "bg-green-500",
};
