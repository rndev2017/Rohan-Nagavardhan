import Link from "next/link";

function Preview({ title, date, description, slug }) {
  return (
    <div className="border-b">
      <h2 className="text-lg md:text-xl lg:text-2xl font-semibold pb-px">{title}</h2>
      <time className="md:text-lg text-neutral-500 dark:text-neutral-400">{date}</time>
      <p className="my-2 italic">{description}</p>
      <Link href="/blog/[slug]" as={`/blog/${slug}`}>
        <a className="dark:text-sky-500 dark:hover:text-sky-400 text-sky-600 hover:text-sky-500 my-2 block">Read more</a>
      </Link>
    </div>
  );
}

export default Preview;