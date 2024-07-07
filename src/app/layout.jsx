import { Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "../providers/ToastProvider";
import ThemeProvider from "../providers/ThemeProvider";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "../app/api/uploadthing/core";
import AuthProvider from "../providers/SessionProvider";
import ReduxProvider from "../providers/ReduxProivder"
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TypoType",
  description:
    " This is an introduction to TypoType technology shop, we always bring and help customers with model technology items!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
            <ToastProvider />
            <ReduxProvider>
              {children}
            </ReduxProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
