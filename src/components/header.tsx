import React from "react";
import { ModeToggle } from "./ui/themeToggle";

type Props = {};

const Header = () => {
  return (
    <header className="fixed flex h-20 w-full bg-orange-500">
      <div>lol</div>
      <ModeToggle />
    </header>
  );
};

export default Header;
