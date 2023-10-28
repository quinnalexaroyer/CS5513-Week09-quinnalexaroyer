import { Link, Text, Box } from "@chakra-ui/react";

const NavBar = () => { return (
  <Box mt={15}>
  <Text>[ <Link href={`/`}>Todo</Link> 
  &nbsp;| <Link href={`/events`}>Events</Link> 
  &nbsp;| <Link href={`/contacts`}>Contacts</Link> 
  &nbsp;]</Text>
  </Box>
);}

export default NavBar;

