import Link from "next/link";
const PortfolioitemThree = ({ data, baseUrl, slug, imageSrc, variant }) => {
  const isShowcase = variant === "showcase";

  return (
    <div
      className={`ltn__img-slide-item-4 ${
        isShowcase ? "maraseq-showcase-card" : ""
      }`}
    >
      <Link
        href={`${baseUrl}/${slug}`}
        className={isShowcase ? "maraseq-showcase-media" : undefined}
      >
        <img src={imageSrc || `/img/img-slide/${data.img}`} alt="Image" />
      </Link>
      {isShowcase ? (
        <div className="maraseq-showcase-badge">{data.filter}</div>
      ) : null}
      <div className="ltn__img-slide-info">
        <div className="ltn__img-slide-info-brief">
          <h6>{isShowcase ? data.filter : data.title}</h6>
          <h1>
            <Link href={`${baseUrl}/${slug}`}>
              {isShowcase ? data.title : data.designation}
            </Link>
          </h1>
        </div>
        {isShowcase ? null : (
          <div className="btn-wrapper">
            <Link
              href={`${baseUrl}/${slug}`}
              className="btn theme-btn-1 btn-effect-1 text-uppercase"
            >
              Details
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioitemThree;
