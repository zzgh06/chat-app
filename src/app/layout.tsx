import { SocketProvider } from '@/components/providers/SocketProvider';
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr">
      <body>
        <SocketProvider>
          <main className="container mx-auto px-4">
            {children}
          </main>
        </SocketProvider>
      </body>
    </html>
  );
}
