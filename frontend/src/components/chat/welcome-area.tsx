export function WelcomeArea() {
  return (
    <div className="flex flex-col items-center px-4">
      <div className="w-full max-w-2xl">
        <div className="mb-2 flex items-center gap-2">
          <span className="text-2xl">✨</span>
          <span className="text-2xl text-gray-500">嘉裕，你好</span>
        </div>
        <h1 className="font-semibold text-4xl text-gray-800">
          需要我为你做些什么？
        </h1>
      </div>
    </div>
  );
}
