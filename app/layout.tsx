import '@/app/ui/global.css';
import { lato } from './ui/font';
import { Providers } from './providers';
import { Metadata } from 'next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
export const metadata: Metadata = {
  title: {
    template: '%s | TecTalk Community',
    default: 'TecTalk Community',
  },
  description:
    'A Collaborative Hub for Sharing Ideas and Engaging in Technical Discussions.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${lato.className} antialiased`}>
        <Providers>
          {children}

          <SpeedInsights />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
