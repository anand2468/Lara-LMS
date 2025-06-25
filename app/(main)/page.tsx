
export default async function Home() {

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">

        <h1 className="text-3xl font-bold">Welcome to the LARA-LMS</h1>
        <p className="text-lg">Generate and manage your tests easily.</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a href="/test" className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">Go to Tests</a>
        </div>
      </main>
    </div>
  );
}
