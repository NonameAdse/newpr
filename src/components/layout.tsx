// import AsideBar from "./aside-bar";
import Header from './header'
import { ThemeProvider } from './theme-provider'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
        <Header />
        <main>{children}</main>
      </ThemeProvider>
    </>
  )
}
