import React from "react";
import Link from "next/link";

import { ModeToggle } from "./ui/themeToggle";

// type Props = {};

const Header = () => {
	return (
		<header className="fixed z-[1100] flex h-24 w-full justify-between border-[2px] border-b-card bg-background">
			{/* <div>lol</div> */}

			<Link className="flex items-center pl-24" href="/">
				HOME
			</Link>
			<div className="flex items-center  pr-24">
				{/* <ModeToggle /> */}
			</div>
		</header>
	);
};

export default Header;
