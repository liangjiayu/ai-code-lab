export function WelcomeArea() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-semibold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-3">
        Hello, User
      </h1>
      <p className="text-lg text-gray-400">How can I help you today?</p>
    </div>
  );
}
