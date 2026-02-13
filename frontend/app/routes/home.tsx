import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "AI Code Lab" },
    { name: "description", content: "AI Code Lab Frontend" },
  ];
}

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">AI Code Lab</h1>
    </main>
  );
}
