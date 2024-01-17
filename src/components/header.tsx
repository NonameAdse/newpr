import React from "react";
import { ModeToggle } from "./ui/themeToggle";
import Link from "next/link";

type Props = {};

const Header = () => {
  return (
    <header className="fixed z-999 justify-between flex h-24 w-full border-[2px] border-b-card bg-background">
      {/* <div>lol</div> */}

      <Link className="pl-24 flex items-center" href="/">
        HOME
      </Link>
      <div className="pr-24 flex  items-center">

      <ModeToggle  />
      </div>
    </header>
  );
};

export default Header;
