import { Header } from "./components/Header";
import { WordRows } from "./components/WordRows";
import { Keyboard } from "./components/Keyboard";

function App() {
  return (
    <div className="flex flex-col items-center justify- h-screen">
      <Header />
      <WordRows />
      <Keyboard />
    </div>
  );
}

export default App;
