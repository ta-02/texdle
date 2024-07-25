import { IoCloseCircle } from "react-icons/io5";

export const Instructions = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <h1>Intructions</h1>{" "}
      <button onClick={onClose}>
        <IoCloseCircle />
      </button>
      <p>
        The goal of the game is to guess the word within <strong>six</strong>{" "}
        tries. Each guess should be a <strong>valid five-letter</strong> word.
        Hit the enter button to submit your guess. After each guess the color of
        the tiles will change to indicate how close your guess was to the
        answer.
      </p>
      <p>
        The letter <strong>W</strong> is <strong>in</strong> the word and in the{" "}
        <strong>correct spot</strong>.
      </p>
      <p>
        The letter <strong>W</strong> is <strong>in</strong> the word but in the{" "}
        <strong>wrong spot</strong>.
      </p>
      <p>
        The letter <strong>W</strong> is <strong>not</strong> in the word in any
        spot.
      </p>
    </div>
  ) : null;
};
