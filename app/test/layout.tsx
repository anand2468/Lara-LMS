import "../globals.css";
export default function LoginLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <html lang="en">
        <body className="flex h-[100vh]">
          {children}
        </body>
      </html>
    );
  }