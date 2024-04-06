import { ThemeToggle } from "./ThemeToggle";

export const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-between bg-primary-600 text-xl text-secondary">
      <a className="bg-primary-700 p-4" href="/">
        Vdit
      </a>

      <div className="flex justify-between">
        <ul className="flex gap-8 bg-primary-700 p-4">
          <li>
            <ThemeToggle />
          </li>

          <li>
            <a href="/home">Home</a>
          </li>

          <li>
            <a href="/about">About</a>
          </li>

          <li>
            <a href="/chat">chat</a>
          </li>

          <li>
            <a href="/profile">profile</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
