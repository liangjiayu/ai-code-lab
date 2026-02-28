export function MainHeader() {
  return (
    <header className="flex items-center justify-between px-4 py-3">
      <div className="flex items-center gap-2">
        <span className="font-semibold text-gray-700 text-xl">Gemini</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 font-medium text-sm text-white">
          嘉
        </div>
      </div>
    </header>
  );
}
