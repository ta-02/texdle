import { LetterState, WORD_LENGTH } from "../utils/utils";

export const WordRows = ({
  letters = "",
  result,
  className,
}: {
  letters: string;
  result?: LetterState[];
  className?: string;
}) => {
  const paddedLetters = letters.padEnd(WORD_LENGTH);

  return (
    <div className={`flex flex-row gap-4 bg-green ${className}`}>
      {paddedLetters.split("").map((c, i) => (
        <CharBox key={i} value={c} state={result ? result[i] : undefined} />
      ))}
    </div>
  );
};

const charStateStyles: { [key in LetterState]: string } = {
  Miss: "bg-gray-800 border-gray-800",
  Present: "bg-yellow-500 border-yellow-500",
  Match: "bg-green-500 border-green-500",
};

const CharBox = ({ value, state }: { value: string; state?: LetterState }) => {
  const style = state === undefined ? "" : charStateStyles[state];
  return (
    <span
      className={`flex items-center justify-center w-12 h-12 p-4 text-2xl font-bold text-gray-50 text-center before:inline-block before: uppercase border border-gray-500 ${style}`}
    >
      {value}
    </span>
  );
};
