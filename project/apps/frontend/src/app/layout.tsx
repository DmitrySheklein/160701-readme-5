import '@/styles/global.css';
import { rubik } from './fonts';

export const metadata = {
  title: 'Readme - Блог, каким он должен быть',
  description: 'Cайт по созданию микроблога',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={rubik.className}>
      <body className="page">{children}</body>
    </html>
  );
}
