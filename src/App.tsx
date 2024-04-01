import {
	Properties,
	Sidebar,
	Canvas,
	Navbar,
} from "./components";

const App = () => {
	return (
		<>
			<header>
				<Navbar />
			</header>

			<main className="flex">
				<Sidebar />

				<Canvas />

				<Properties />
			</main>

			<footer></footer>
		</>
	);
}

export default App;
