import { Link } from 'react-router';

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="font-bold text-6xl text-gray-300">404</h1>
      <p className="mt-4 text-gray-500 text-lg">页面不存在</p>
      <Link to="/" className="mt-6 text-blue-500 hover:underline">
        返回首页
      </Link>
    </div>
  );
}
