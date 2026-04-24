import Link from "next/link";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const DEFAULT_IMAGES = [
  "/img/gallery/2.jpg",
  "/img/gallery/3.jpg",
  "/img/gallery/7.jpg",
  "/img/gallery/8.jpg",
  "/img/gallery/9.jpg",
];

const resolveImageSrc = (value, fallbackImage) => {
  const normalizedValue = String(value || "").trim();

  if (!normalizedValue) {
    return fallbackImage;
  }

  // Handle full URLs (including Supabase URLs)
  if (/^(https?:)?\/\//i.test(normalizedValue)) {
    return normalizedValue;
  }

  // Handle absolute paths
  if (normalizedValue.startsWith("/")) {
    return normalizedValue;
  }

  // Support cases where category image is saved as a plain filename.
  return `/uploads/categories/${normalizedValue}`;
};

const normalizeCategoryKey = (value) => String(value || "").trim().toLowerCase();

const getCategoryCounts = (products) => {
  const counts = new Map();

  (products || []).forEach((product) => {
    const categoryValue = product?.category;
    if (!categoryValue) return;

    if (Array.isArray(categoryValue)) {
      categoryValue.forEach((category) => {
        const normalizedKey = normalizeCategoryKey(category);
        if (!normalizedKey) return;
        counts.set(normalizedKey, (counts.get(normalizedKey) || 0) + 1);
      });
      return;
    }

    const normalizedKey = normalizeCategoryKey(categoryValue);
    if (!normalizedKey) return;
    counts.set(normalizedKey, (counts.get(normalizedKey) || 0) + 1);
  });

  return counts;
};

const getDisplayCategories = (products, propertyCategories) => {
  const counts = getCategoryCounts(products);

  if (Array.isArray(propertyCategories) && propertyCategories.length > 0) {
    return propertyCategories
      .map((category) => ({
        name: category.name,
        description: category.description,
        image_url: String(category.image_url || ""),
        count: counts.get(normalizeCategoryKey(category.name)) || 0,
      }))
      .filter((category) => String(category.name || "").trim())
      .slice(0, 7);
  }

  return Array.from(counts.entries())
    .map(([normalizedName, count]) => ({
      name: normalizedName,
      description: "",
      image_url: null,
      count,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
};

const getCategoryDescription = (description) => {
  const normalizedDescription = String(description || "").trim();
  return normalizedDescription || "Explore opportunities in this category";
};

const formatCategoryLabel = (name) =>
  String(name || "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());

const PropertyCategories = ({ propertyCategories = [] }) => {
  const { products } = useSelector((state) => state.product);
  const categories = getDisplayCategories(products, propertyCategories);

  const columnClasses = [
    { xs: 12, md: 6, lg: 8 },
    { xs: 12, md: 6, lg: 4 },
    { xs: 12, md: 6, lg: 4 },
    { xs: 12, md: 6, lg: 4 },
    { xs: 12, md: 6, lg: 4 },
  ];

  return (
    <>
      <Row>
        {categories.map((category, index) => (
          <Col key={category.name} {...columnClasses[index]}>
            <div
              className="ltn__banner-item ltn__banner-style-4 text-color-white bg-image"
              style={{
                backgroundImage: `url("${resolveImageSrc(
                  category.image_url,
                  DEFAULT_IMAGES[index]
                )}")`,
              }}
            >
              <div className="ltn__banner-info">
                <h3>
                  <Link
                    href={{
                      pathname: "/shop/properties",
                      query: { category: category.name },
                    }}
                  >
                    {formatCategoryLabel(category.name)} Path
                  </Link>
                </h3>
                <p>{getCategoryDescription(category.description)}</p>
                <mark>{category.count} Listings</mark>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default PropertyCategories;


