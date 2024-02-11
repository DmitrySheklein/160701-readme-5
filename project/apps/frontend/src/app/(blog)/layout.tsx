import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import { Icons } from '../../components/Icons/Icons';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="page__main">
        <div className="container">{children}</div>
      </main>
      <Footer />
      <Icons />
    </>
  );
}
