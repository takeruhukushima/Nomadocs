import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'

interface PageProps {
  params: {
    slug: string[]
  }
}

async function getMarkdownContent(slug: string[]) {
  try {
    const filePath = path.join(process.cwd(), 'contents', ...slug) + '.md'
    const fileContent = await fs.readFile(filePath, 'utf8')
    const { data, content } = matter(fileContent)
    return { frontmatter: data, content }
  } catch (error) {
    return null
  }
}

export default async function Page({ params }: PageProps) {
  const content = await getMarkdownContent(params.slug)
  
  if (!content) {
    notFound()
  }

  const { frontmatter, content: markdownContent } = content

  return (
    <article className="prose prose-slate dark:prose-invert max-w-none">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold">{frontmatter.title}</h1>
        <div className="flex gap-4 text-sm text-muted-foreground">
          {/* <div>作成者: {frontmatter.creator}</div> */}
          {/* <div>年: {frontmatter.year}</div> */}
          <div>日付: {new Date(frontmatter.created_at).toLocaleDateString()}</div>
        </div>
        {frontmatter.imageUrl && (
          <img 
            src={frontmatter.imageUrl || "/placeholder.svg"} 
            alt={frontmatter.title}
            className="my-4 rounded-lg"
          />
        )}
        {frontmatter.tags && (
          <div className="flex gap-2 mt-4">
            {frontmatter.tags.map((tag: string) => (
              <span 
                key={tag}
                className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <MDXRemote source={markdownContent} />
    </article>
  )
}

