import { Provider } from "@/components/ui/provider";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Lox Playground",
  description: "Playground and docs for Lox language",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Provider>
          <Navbar />
          {children}
        </Provider>
      </body>
    </html>
  );
}
