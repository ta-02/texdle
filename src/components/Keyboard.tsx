import { useStore } from "../utils/store";
import { LetterState } from "../utils/utils";
import { BsFillBackspaceFill } from "react-icons/bs";

export function Keyboard({
  onClick: onClickProps,
}: {
  onClick: (key: string) => void;
}) {
  const keyboardLetterState = useStore((s) => s.keyboardLetterState);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { innerText } = e.currentTarget;
    let returnProps = innerText;

    if (innerText === "Backspace") {
      returnProps = "Backspace";
    }

    onClickProps(returnProps);
  };

  return (
    <div>
      {keyboardKeys.map((keyboardRow, rowIndex) => (
        <div key={rowIndex} className="flex">
          {keyboardRow.map((key, index) => {
            let styles = "rounded font-bold uppercase flex-1 py-2";

            const letterState = keyStateStyles[keyboardLetterState[key]];

            if (letterState) {
              styles += ` text-white px-1 ${letterState}`;
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
                  <BsFillBackspaceFill className="w-6 h-6" />
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
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["", "a", "s", "d", "f", "g", "h", "j", "k", "l", ""],
  ["Enter", "z", "x", "c", "v", "b", "n", "m", "Backspace"],
];

const keyStateStyles: { [key in LetterState]?: string } = {
  Miss: "bg-gray-800",
  Present: "bg-yellow-500",
  Match: "bg-green-500",
};
