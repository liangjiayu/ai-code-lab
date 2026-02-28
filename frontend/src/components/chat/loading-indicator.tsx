export function LoadingIndicator() {
  return (
    <div>
      <div className="flex items-center gap-1.5 pt-3">
        <span className="h-2 w-2 animate-bounce rounded-full bg-purple-400 [animation-delay:0ms]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-purple-400 [animation-delay:150ms]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-purple-400 [animation-delay:300ms]" />
      </div>
    </div>
  );
}
