import "../globals.css";
export default function LoginLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <html lang="en">
        <body className="flex h-[100vh] justify-center items-center bg-gray-100">
          {children}
        </body>
      </html>
    );
  }