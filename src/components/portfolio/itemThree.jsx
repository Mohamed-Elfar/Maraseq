import Link from "next/link";
import imageSlider from "@/assets/images/home/imageSlider.png";
const PortfolioitemThree = ({ data, baseUrl, slug, imageSrc, variant }) => {
  const isShowcase = variant === "showcase";

  if (isShowcase) {
    return (
      <div className="maraseq-showcase-card">
        <Link href={`${baseUrl}/${slug}`} className="maraseq-showcase-media">
          <img src={imageSrc || imageSlider.src} alt={data.title} />
        </Link>
        <div className="ltn__img-slide-info">
          <div className="ltn__img-slide-info-brief">
            <h1>
              <Link href={`${baseUrl}/${slug}`}>{data.title}</Link>
            </h1>
          </div>
          <p className="maraseq-showcase-subtitle">- {data.designation}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="ltn__img-slide-item-4">
      <Link href={`${baseUrl}/${slug}`}>
        <img src={imageSrc || imageSlider.src} alt={data.title} />
      </Link>
      <div className="ltn__img-slide-info">
        <div className="ltn__img-slide-info-brief">
          <h6>{data.title}</h6>
          <h1>
            <Link href={`${baseUrl}/${slug}`}>{data.designation}</Link>
          </h1>
        </div>
        <div className="btn-wrapper">
          <Link
            href={`${baseUrl}/${slug}`}
            className="btn theme-btn-1 btn-effect-1 text-uppercase"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PortfolioitemThree;
