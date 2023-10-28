import { Link } from from "@chakra-ui/react";

const NavBar = () => { return (
  [ <Link href="/">Todo</Link> 
  | <Link href="/events">Events</Link> 
  | <Link href="/contacts">Contacts</Link> 
  ]
);}

export default NavBar;

