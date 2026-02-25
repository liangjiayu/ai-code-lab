export function MainHeader() {
  return (
    <header className="flex items-center justify-between px-4 py-3">
      <div className="flex items-center gap-2">
        <span className="text-xl font-semibold text-gray-700">Gemini</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium">
          嘉
        </div>
      </div>
    </header>
  );
}
