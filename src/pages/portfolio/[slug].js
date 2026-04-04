import Link from "next/link";
import { LayoutOne } from "@/layouts";
import { productSlug } from "@/lib/product";
import { Container, Row, Col } from "react-bootstrap";
import ShopBreadCrumb from "@/components/breadCrumbs/shop";
import CallToAction from "@/components/callToAction";
import { getPortfolio } from "@/lib/supabase";
import { useState } from 'react';

// Import portfolio components
import PortfolioLightbox from './_components/PortfolioLightbox';
import PortfolioMainImage from './_components/PortfolioMainImage';
import PortfolioContent from './_components/PortfolioContent';
import PortfolioSidebar from './_components/PortfolioSidebar';
import { getImageSrc, getBannerImageSrc, getAllPortfolioImages } from './_components/PortfolioUtils';

function portfolioDetails({ portfolio }) {
  const firstLetter = portfolio.shortDescription.slice(0, 1);
  const firstToEnd = portfolio.shortDescription.slice(1);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const portfolioImages = getAllPortfolioImages(portfolio, getImageSrc);

  return (
    <>
      <PortfolioLightbox
        lightboxOpen={lightboxOpen}
        setLightboxOpen={setLightboxOpen}
        currentImageIndex={currentImageIndex}
        setCurrentImageIndex={setCurrentImageIndex}
        images={portfolioImages}
      />
      <LayoutOne topbar={true}>
        {/* <!-- BREADCRUMB AREA START --> */}
        <ShopBreadCrumb
          title="Portfolio Details"
          sectionPace=""
          currentSlug="Portfolio Details"
        />

        {/* <!-- BREADCRUMB AREA END --> */}

        {/* <!-- PAGE DETAILS AREA START (service-details) --> */}
        <div className="ltn__page-details-area ltn__portfolio-details-area mb-105">
          <Container>
            <Row>
              <Col xs={12} lg={8}>
                <div className="ltn__page-details-inner ltn__portfolio-details-inner">
                  <PortfolioMainImage
                    portfolio={portfolio}
                    getImageSrc={getImageSrc}
                    setCurrentImageIndex={setCurrentImageIndex}
                    setLightboxOpen={setLightboxOpen}
                  />
                  <PortfolioContent
                    portfolio={portfolio}
                    firstLetter={firstLetter}
                    firstToEnd={firstToEnd}
                    getImageSrc={getImageSrc}
                  />
                </div>
              </Col>
              <PortfolioSidebar
                portfolio={portfolio}
                getBannerImageSrc={getBannerImageSrc}
              />
            </Row>
          </Container>
        </div>
        {/* <!-- PAGE DETAILS AREA END --> */}

        <div className="ltn__call-to-action-area call-to-action-6 before-bg-bottom">
          <Container>
            <Row>
              <Col xs={12}>
                <CallToAction />
              </Col>
            </Row>
          </Container>
        </div>
      </LayoutOne>
    </>
  );
}

export default portfolioDetails;

export async function getStaticProps({ params }) {
  // get portfolio data based on slug from Supabase
  try {
    const portfolioData = await getPortfolio();
    const portfolio = portfolioData.find(
      (single) => productSlug(single.title) === params.slug
    );

    // Check if portfolio exists and is active
    if (!portfolio || portfolio.active === false) {
      return {
        notFound: true // Return 404 for inactive or non-existent portfolios
      };
    }

    // Transform data to match expected format
    const transformedPortfolio = {
      ...portfolio,
      shortDescription: portfolio.short_description || portfolio.description || '',
      fullDescription: portfolio.full_description || portfolio.description || '',
      thumbImage: portfolio.thumb_image || '1.jpg',
      img: portfolio.img || portfolio.thumb_image || '1.jpg',
    };

    return {
      props: {
        portfolio: transformedPortfolio
      }
    };
  } catch (error) {
    console.error('Error fetching portfolio details:', error);
    return {
      notFound: true // Return 404 on error
    };
  }
}

export async function getStaticPaths() {
  try {
    // get the paths we want to pre render based on portfolio from Supabase
    const portfolioData = await getPortfolio();
    // Only generate paths for active portfolios
    const activePortfolios = portfolioData.filter(item => item.active !== false);
    const paths = activePortfolios.map((data) => ({
      params: {
        slug: productSlug(data.title),
      },
    }));

    return {
      paths,
      fallback: true // Enable fallback for new portfolio items
    };
  } catch (error) {
    console.error('Error generating portfolio paths:', error);
    return {
      paths: [],
      fallback: true
    };
  }
}
