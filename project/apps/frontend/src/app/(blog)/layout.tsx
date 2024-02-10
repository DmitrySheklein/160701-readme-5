import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';

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
    </>
  );
}
