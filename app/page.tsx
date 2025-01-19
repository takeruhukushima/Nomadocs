import { MainContent } from '@/components/main-content';
import { readFileSync } from 'fs';
import path from 'path';
import Markdown from 'react-markdown';

export default function HomePage() {
  const markdownPath = path.join(process.cwd(), 'contents/Overview/thispage.md');
  const rawMarkdownContent = readFileSync(markdownPath, 'utf-8');
  const markdownContent = rawMarkdownContent.split('---').slice(2).join('---');

  return (
    <div className="flex items-start justify-start h-screen overflow-hidden">
      <h1 className="text-6xl font-bold">Nomadocs</h1>
    </div>
  );
}
