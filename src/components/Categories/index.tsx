interface CategoryInfo {
  name: string;
  link: string;
}

interface WPPost {
  id: number;
  title: { rendered: string };
  categories: number[];
  categories_names: Record<string, CategoryInfo>;
}

export default function PostCard({ post }: { post: WPPost }) {
  return (
    <article className="border rounded-lg p-4 shadow">
      <h2
        className="text-lg font-bold"
        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
      />

      <div className="flex flex-wrap gap-2 mt-2">
        {post.categories.map((catId) => {
          const category = post.categories_names[catId.toString()];
          return category ? (
            <a
              key={catId}
              href={category.link}
              className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded"
            >
              {category.name}
            </a>
          ) : null;
        })}
      </div>
    </article>
  );
}
