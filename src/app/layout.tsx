import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr">
      <body>
        <main className="container mx-auto px-4">{children}</main>
      </body>
    </html>
  );
}
