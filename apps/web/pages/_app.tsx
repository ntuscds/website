import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from "@chakra-ui/react";
import { Layout } from 'ui'
import { NavBarProps } from "ui/components/navbar/NavBar";

export default function App({ Component, pageProps }: AppProps) {
    const navbarProps: NavBarProps = {
        links: [
            {label: "Home", href: "/"},
            {label: "Academics", href: "/academics"},
            {label: "Events", href: "/events"},
            {label: "Sponsors", href: "/sponsors"},
            {label: "Contact", href: "/contact"},
        ],
        logoProps: {
            src: '/scse-logo.png',
            alt: 'scse logo',
            text: 'NTU School of Computer Science & Engineering Club'
        }
    }

    return (
        <ChakraProvider>
            <Layout navbarProps={navbarProps}>
                <Component {...pageProps} />
            </Layout>
        </ChakraProvider>
    )
}
