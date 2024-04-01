import { Properties, Sidebar, Canvas, Navbar } from "./components";

const App = () => {
	return (
		<>
			<header>
				<Navbar />
			</header>

			<main className="flex grow">
				<Sidebar />

				<Canvas />

				<Properties />
			</main>

			<footer></footer>
		</>
	);
};

export default App;
