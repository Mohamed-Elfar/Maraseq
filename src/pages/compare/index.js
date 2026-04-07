import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { LayoutOne } from "@/layouts";
import { productSlug } from "@/lib/product";
import { deleteFromCompare } from "@/store/slices/compare-slice";

const getResolvedImage = (product) => {
    const defaultImage = "/img/product-3/1.jpg";
    const image = product?.productImg;

    if (!image) return defaultImage;
    if (image.startsWith("http") || image.startsWith("/")) return image;

    return `/img/product-3/${image}`;
};

const ComparePage = () => {
    const dispatch = useDispatch();
    const { compareItems } = useSelector((state) => state.compare);

    const comparedProducts = Array.isArray(compareItems) ? compareItems : [];

    const rows = [
        {
            label: "Title",
            render: (product) => (
                <Link href={`/shop/${productSlug(product.title)}`}>{product.title}</Link>
            ),
        },
        {
            label: "Status",
            render: (product) => product.propertyDetails?.propertyStatus || "N/A",
        },
        {
            label: "Price",
            render: (product) => `$${Number(product.price || 0).toLocaleString()}`,
        },
        {
            label: "Location",
            render: (product) => product.locantion || "N/A",
        },
        {
            label: "Property Type",
            render: (product) => product.propertyTypes?.[0] || "N/A",
        },
        {
            label: "Bedrooms",
            render: (product) => product.propertyDetails?.bedrooms ?? "N/A",
        },
        {
            label: "Bathrooms",
            render: (product) => product.propertyDetails?.baths ?? "N/A",
        },
        {
            label: "Area",
            render: (product) => product.propertyDetails?.area ?? "N/A",
        },
    ];

    return (
        <LayoutOne topbar={true}>
            <div className="ltn__product-area ltn__product-gutter pt-115 pb-90">
                <Container>
                    <Row className="mb-4">
                        <Col xs={12}>
                            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
                                <div>
                                    <p className="text-uppercase mb-1">Property Comparison</p>
                                    <h1 className="mb-0">Compare Listings</h1>
                                </div>
                                <div>
                                    <Button
                                        variant="outline-danger"
                                        disabled={comparedProducts.length === 0}
                                        onClick={() => {
                                            comparedProducts.forEach((product) => {
                                                dispatch(deleteFromCompare(product.id));
                                            });
                                        }}
                                    >
                                        Clear Compare
                                    </Button>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    {comparedProducts.length > 0 ? (
                        <div className="table-responsive">
                            <Table bordered hover className="align-middle bg-white">
                                <thead>
                                    <tr>
                                        <th style={{ minWidth: 180 }}>Feature</th>
                                        {comparedProducts.map((product) => (
                                            <th key={product.id} style={{ minWidth: 260 }}>
                                                <div className="d-flex flex-column gap-3">
                                                    <img
                                                        src={getResolvedImage(product)}
                                                        alt={product.title}
                                                        style={{ width: "100%", height: 180, objectFit: "cover" }}
                                                    />
                                                    <div className="d-flex justify-content-between align-items-start gap-2">
                                                        <strong>{product.title}</strong>
                                                        <Button
                                                            size="sm"
                                                            variant="outline-danger"
                                                            onClick={() => dispatch(deleteFromCompare(product.id))}
                                                        >
                                                            Remove
                                                        </Button>
                                                    </div>
                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows.map((row) => (
                                        <tr key={row.label}>
                                            <td>
                                                <strong>{row.label}</strong>
                                            </td>
                                            {comparedProducts.map((product) => (
                                                <td key={`${row.label}-${product.id}`}>{row.render(product)}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    ) : (
                        <div className="bg-white p-5 text-center border">
                            <h3 className="mb-3">No compared items yet</h3>
                            <p className="mb-4">
                                Add two properties to compare them here.
                            </p>
                            <Link
                                className="theme-btn-1 btn btn-effect-1"
                                href="/shop/properties"
                            >
                                Browse Properties
                            </Link>
                        </div>
                    )}
                </Container>
            </div>
        </LayoutOne>
    );
};

export default ComparePage;