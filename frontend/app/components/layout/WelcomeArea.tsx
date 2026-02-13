export function WelcomeArea() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">✨</span>
          <span className="text-2xl text-gray-500">嘉裕，你好</span>
        </div>
        <h1 className="text-4xl font-semibold text-gray-800">
          需要我为你做些什么？
        </h1>
      </div>
    </div>
  );
}
