import { LayoutOne } from "@/layouts";
import { useSelector } from "react-redux";
import { getProducts, productSlug } from "@/lib/product";
import { Container, Row, Col } from "react-bootstrap";
import BlogSideBar from "@/components/blog/sidebar";
import ShopBreadCrumb from "@/components/breadCrumbs/shop";
import { supabase } from "@/lib/supabase";
import blogData from "@/data/blog";

// Import components
import {
  Content,
  Tags,
  SocialSharing,
  Navigation,
  RelatedPosts,
  Comments
} from "./_components";

function BlogtDetails({ blog }) {
  const { products } = useSelector((state) => state.product);
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { compareItems } = useSelector((state) => state.compare);

  // Calculate sidebar props
  const topRatedProducts = getProducts(products, "buying", "featured", 3);
  const popularProducts = getProducts(products, "buying", "featured", 3);
  const latestdBlogs = blogData ? getProducts(blogData, "buying", "featured", 4) : [];

  return (
    <>
      <LayoutOne topbar={true}>
        {/* <!-- BREADCRUMB AREA START --> */}
        <ShopBreadCrumb
          title="News Details"
          sectionPace=""
          currentSlug="News Details"
        />

        {/* <!-- BREADCRUMB AREA END --> */}

        {/*  <!-- PAGE DETAILS AREA START (blog-details) -->*/}
        <div className="ltn__page-details-area ltn__blog-details-area mb-120">
          <Container>
            <Row>
              <Col className="col-lg-8 col-md-12">
                <div className="ltn__blog-details-wrap">
                  <Content blog={blog} />

                  {/* <!-- blog-tags-social-media --> */}
                  <div className="ltn__blog-tags-social-media mt-80 row">
                    <Tags />
                    <SocialSharing blog={blog} />
                  </div>
                  <hr />

                  <Navigation />
                  <hr />

                  <RelatedPosts blog={blog} />
                  <Comments />
                </div>
              </Col>
              <Col className="col-lg-4 col-md-12">
                <BlogSideBar
                  popularProducts={popularProducts}
                  topRatedProducts={topRatedProducts}
                  latestdBlogs={latestdBlogs}
                />
              </Col>
            </Row>
          </Container>
        </div>
        {/* <!-- PAGE DETAILS AREA END --> */}
      </LayoutOne>
    </>
  );
}

export async function getStaticProps({ params }) {
  // First try to get news data from Supabase
  const { data: blog, error } = await supabase
    .from('news')
    .select('*')
    .eq('slug', params.slug)
    .eq('visible', true)
    .eq('published', true)
    .single();

  // If no news found in Supabase, fallback to hardcoded data
  if (error || !blog) {
    const hardcodedBlog = blogData.find((single) => {
      const slug = productSlug(single.title, { lower: true });
      return slug === params.slug;
    });

    if (!hardcodedBlog) {
      return { notFound: true };
    }

    return { props: { blog: hardcodedBlog } };
  }

  return { props: { blog } };
}

export async function getStaticPaths() {
  // get the paths we want to pre render based on news from Supabase
  const { data: newsData } = await supabase
    .from('news')
    .select('slug')
    .eq('visible', true)
    .eq('published', true);

  // Get paths from Supabase news
  const newsPaths = newsData?.map((singleNews) => ({
    params: {
      slug: singleNews.slug,
    },
  })) || [];

  // Get paths from hardcoded blog data
  const blogPaths = blogData.map((singleBlog) => ({
    params: {
      slug: productSlug(singleBlog.title, { lower: true }),
    },
  }));

  // Combine both paths
  const allPaths = [...newsPaths, ...blogPaths];

  return {
    paths: allPaths,
    fallback: true,
  };
}

export default BlogtDetails;
