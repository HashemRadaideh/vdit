// App.tsx
import { useState } from "react";
import { Properties, Sidebar, Canvas, Navbar } from "./components";

const App = () => {
	const [ghostElement, setGhostElement] = useState<HTMLElement | null>();

	const handleAppendGhost = (ghost: HTMLElement | null) => {
		setGhostElement(ghost);
	};

	return (
		<>
			<header>
				<Navbar />
			</header>

			<main className="flex grow overflow-auto">
				<Sidebar handleAppendGhost={handleAppendGhost} />

				<Canvas />

				<Properties>
					{ghostElement}
				</Properties>
			</main>

			<footer></footer>
		</>
	);
};

export default App;
