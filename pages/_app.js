import { ChakraProvider } from "@chakra-ui/react";
function QuinnsAppWeek08({ Component, pageProps }) {
return (
<ChakraProvider>
<Component {...pageProps} />
</ChakraProvider>
);
}
export default QuinnsAppWeek08;