import glob from 'fast-glob';

import { ActivityBar, BottomBar, TopBar } from '@/components';
import NavigationChange from '@/components/NavigationChange';
import TogglePortfolio from '@/components/TogglePortfolio';
import { Providers } from '@/lib/providers';
import { type Section } from '@/lib/redux/slices/sectionSlice/sectionSlice';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const pages = await glob('**/*.mdx', { cwd: 'src/app' });
  const allSectionsEntries = (await Promise.all(pages.map(async (filename) => ['/' + filename.replace(/(^|\/)page\.mdx$/, ''), (await import(`./${filename}`)).sections]))) as Array<
    [string, Section[]]
  >;
  const allSections = Object.fromEntries(allSectionsEntries);

  return (
    <Providers>
      <html lang="en">
        <body className={`bg-dark_bg min-h-screen max-h-screen flex flex-col`}>
          <TopBar />
          <main className="flex-1 flex overflow-hidden">
            <ActivityBar sections={allSections} />
            {children}
          </main>
          <BottomBar />
          <TogglePortfolio />
          <NavigationChange />
        </body>
      </html>
    </Providers>
  );
}
