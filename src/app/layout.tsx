import { Provider } from "@/components/ui/provider";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "My Next.js 13 App",
  description: "Using Chakra with Providers pattern",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <Navbar />
          {children}
        </Provider>
      </body>
    </html>
  );
}
