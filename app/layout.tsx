import '@/app/ui/global.css';
import { lato } from './ui/font';
import { Providers } from './providers';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${lato.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
