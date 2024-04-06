import { ReactNode, useState } from "react";
import { Properties, Sidebar, Canvas, Navbar } from "./components";

const App = () => {
  const [ghostElement, setGhostElement] = useState<ReactNode>(null);

  const handleAppendGhost = (ghost: ReactNode | null) => {
    setGhostElement(ghost);
  };

  return (
    <>
      <header>
        <Navbar />
      </header>

      <main className="flex grow overflow-auto border-t border-tertiary bg-primary text-secondary">
        <Sidebar handleAppendGhost={handleAppendGhost} />

        <Canvas handleAppendGhost={handleAppendGhost} />

        <Properties>{ghostElement}</Properties>
      </main>

      <footer></footer>
    </>
  );
};

export default App;
