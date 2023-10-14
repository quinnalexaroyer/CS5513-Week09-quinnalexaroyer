import { ChakraProvider } from "@chakra-ui/react";
function QuinnsAppWeek07({ Component, pageProps }) {
return (
<ChakraProvider>
<Component {...pageProps} />
</ChakraProvider>
);
}
export default QuinnsAppWeek07;