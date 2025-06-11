export default function CreateTest() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <form action="">
          <div className="flex flex-col gap-4">
            <label htmlFor="topic" className="text-lg font-semibold">Topic</label>
            <input
              type="text"
              id="topic"
              name="topic"
              className="border border-gray-300 rounded p-2 w-full"
              placeholder="Enter topic"
            />
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="no_of_questions" className="text-lg font-semibold">Number of Questions</label>
            <input
              type="number"
              id="no_of_questions"
              name="no_of_questions"
              className="border border-gray-300 rounded p-2 w-full"
              placeholder="Enter number of questions (1-25)"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600 transition-colors"
          >
            Generate Test
          </button>
        </form>
      </main>
    </div>
  );
}