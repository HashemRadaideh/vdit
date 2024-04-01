import { ThemeToggle } from "./ThemeToggle";

export const Navbar = () => {
	return (
		<nav className="flex justify-between bg-primary text-xl text-secondary">
			<a className="logo p-4" href="/">
				Vdit
			</a>

			<div className="flex justify-between">
				<ul className="flex py-4">
					<li>
						<ThemeToggle />
					</li>

					<li>
						<a className="p-4" href="/home">
							Home
						</a>
					</li>

					<li>
						<a className="p-4" href="/about">
							About
						</a>
					</li>

					<li>
						<a className="p-4" href="/chat">
							chat
						</a>
					</li>
				</ul>
				<div className="p-4">profile</div>
			</div>
		</nav>
	);
};
