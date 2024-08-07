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
    <div className={`${className}`}>
      {paddedLetters.split("").map((c, i) => (
        <CharBox key={i} value={c} state={result ? result[i] : undefined} />
      ))}
    </div>
  );
};

const charStateStyles: { [key in LetterState]: string } = {
  Miss: "bg-gray-800",
  Present: "bg-yellow-500",
  Match: "bg-green-500",
};

const CharBox = ({ value, state }: { value: string; state?: LetterState }) => {
  const style = state === undefined ? "" : charStateStyles[state];
  return <span className={`${style}`}>{value}</span>;
};
