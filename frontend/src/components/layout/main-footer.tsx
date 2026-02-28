import { useLocation } from 'react-router';

export function MainFooter() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  if (isHome) {
    return <div className="h-14"></div>;
  }

  return (
    <footer className="py-2 text-center text-gray-400 text-xs">
      内容由 AI 生成，请仔细甄别
    </footer>
  );
}
