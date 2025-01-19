import fs from 'fs/promises';
import path from 'path';

export interface DirectoryItem {
  name: string;
  path: string;
  children?: DirectoryItem[];
  type: 'file' | 'directory';
}

// Node.js 専用（サーバーサイド）
export async function getContentTree(dir: string = ''): Promise<DirectoryItem[]> {
  const contentPath = path.join(process.cwd(), 'contents', dir);

  try {
    const items = await fs.readdir(contentPath, { withFileTypes: true });

    // Map each item to a DirectoryItem and sort the result
    const tree = await Promise.all(
      items.map(async (item) => {
        const relativePath = path.join(dir, item.name);
        const urlPath = `/contents/${relativePath.replace(/\.md$/, '')}`;

        if (item.isDirectory()) {
          return {
            name: item.name,
            path: urlPath,
            type: 'directory' as const,
            children: await getContentTree(relativePath), // Recursively fetch children
          };
        }

        return {
          name: item.name,
          path: urlPath,
          type: 'file' as const,
        };
      })
    );

    // Sort directories first, then files alphabetically
    return tree.sort((a, b) => {
      if (a.type === b.type) {
        return a.name.localeCompare(b.name);
      }
      return a.type === 'directory' ? -1 : 1;
    });
  } catch (error) {
    console.error(`Error reading directory: ${contentPath}`, error);
    return []; // Return an empty array in case of an error
  }
}
