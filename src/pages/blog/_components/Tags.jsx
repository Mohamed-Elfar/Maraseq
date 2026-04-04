import Link from "next/link";

const BlogTags = () => {
  return (
    <div className="ltn__tagcloud-widget col-lg-8">
      <h4>Related Tags</h4>
      <ul>
        <li>
          <Link href="#">Popular</Link>
        </li>
        <li>
          <Link href="#">Business</Link>
        </li>
        <li>
          <Link href="#">ux</Link>
        </li>
      </ul>
    </div>
  );
};

export default BlogTags;
