import { IoCloseCircle } from "react-icons/io5";

export const Instructions = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center bg-neutral-950 bg-opacity-90 p-4">
      <div className="bg-neutral-950 border border-white rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h1 className="text-2xl italic font-serif">Instructions</h1>
          <button onClick={onClose}>
            <IoCloseCircle className="text-3xl" />
          </button>
        </div>
        <div className="space-y-4">
          <p>
            The goal of the game is to guess the word within{" "}
            <strong>six</strong> tries. Each guess should be a{" "}
            <strong>valid five-letter</strong> word. Hit the enter button to
            submit your guess. After each guess the color of the tiles will
            change to indicate how close your guess was to the word.
          </p>
          <p className="flex items-center space-x-4">
            <span className="inline-block p-2 text-2xl font-bold text-center bg-green-500 border border-white mr-4">
              W
            </span>
            <span>
              The letter <strong>W</strong> is <strong>in</strong> the word and
              in the <strong className="text-green-500">correct spot</strong>.
            </span>
          </p>
          <p className="flex items-center space-x-4">
            <span className="inline-block p-2 text-2xl font-bold text-center bg-yellow-500 border border-white mr-4">
              W
            </span>
            <span>
              The letter <strong>W</strong> is <strong>in</strong> the word but
              in the <strong className="text-red-500">wrong spot</strong>.
            </span>
          </p>
          <p className="flex items-center space-x-4">
            <span className="inline-block p-2 text-2xl font-bold text-center bg-gray-800 border border-white mr-4">
              W
            </span>
            <span>
              The letter <strong>W</strong> is{" "}
              <strong className="text-gray-500">not</strong> in the word in any
              spot.
            </span>
          </p>
        </div>
      </div>
    </div>
  ) : null;
};
