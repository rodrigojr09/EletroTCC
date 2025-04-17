import { useRouter } from "next/router";
import { useState } from "react";
import { User } from "../utils/types";
import { useSession } from "next-auth/react";
import { FaBars } from "react-icons/fa";
import { MdClose } from "react-icons/md";

export default function Navbar() {
  const [navbar, setNavbar] = useState(false);
  const { data } = useSession();
  const user = data?.user as User | undefined;
  return (
    <>
      <header className={"navbar-header"}>
        <a href="/" className="Logo">
          Suporte Eletro
        </a>
        <input type="checkbox" id="check" />
        <label htmlFor="check" className="icons">
          <FaBars
            className={navbar ? "bx bx-x" : "bx bx-menu"}
            id="menu-icon"
            onClick={(e) => setNavbar(!navbar)}
          />
          <MdClose
            className={navbar ? "bx bx-menu" : "bx bx-x"}
            id="close-icon"
            onClick={(e) => setNavbar(!navbar)}
          />
        </label>
        <nav className="navbar">
          <a href="/">Home</a>
          <a href="/about">Sobre</a>
          {user && user.permission > 1 && (
            <a style={{ color: "red" }} href="/admin">
              Administração
            </a>
          )}
          <a href={user ? "/aluno" : "/auth/login"}>
            {user
              ? user?.nome
                  .split(" ")[0]
                  .split("")
                  .map((a, i) => (i === 0 ? a : a.toLowerCase()))
              : "Login"}
          </a>
        </nav>
      </header>
    </>
  );
}
