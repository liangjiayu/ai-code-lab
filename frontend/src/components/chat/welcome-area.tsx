export function WelcomeArea() {
  return (
    <div className="flex flex-col items-center px-4">
      <div className="mx-auto w-full max-w-3xl px-6 pb-3">
        <div className="mb-1 flex items-center gap-2">
          <span>✨</span>
          <span className="text-2xl text-gray-500">嘉裕，你好</span>
        </div>
        <div className="text-4xl text-gray-800">需要我为你做些什么？</div>
      </div>
    </div>
  );
}
