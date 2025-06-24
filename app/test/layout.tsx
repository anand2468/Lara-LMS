import "../globals.css";


export function metadata() {
  return {
    title: 'Lara-LMS',
    description: 'Create a new test on LARA-LMS',
  }
}

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