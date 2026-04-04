import Link from "next/link";

const PrevNextNavigation = () => {
  return (
    <div className="ltn__prev-next-btn row mb-50">
      <div className="blog-prev col-lg-6">
        <h6>Prev Post</h6>
        <h3 className="ltn__blog-title">
          <Link href="#">Tips On Minimalist</Link>
        </h3>
      </div>
      <div className="blog-prev blog-next text-end col-lg-6">
        <h6>Next Post</h6>
        <h3 className="ltn__blog-title">
          <Link href="#">Less Is More</Link>
        </h3>
      </div>
    </div>
  );
};

export default PrevNextNavigation;
