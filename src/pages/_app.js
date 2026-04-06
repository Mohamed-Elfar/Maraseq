import { Fragment, useEffect } from "react";
import Head from "next/head";
import { Nunito_Sans, Poppins } from "next/font/google";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { wrapper } from "@/store";
import { setProducts } from "@/store/slices/product-slice";
import { getProperties } from "@/lib/supabase";
import Preloader from "@/components/preloader";
import "animate.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-modal-video/scss/modal-video.scss";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";
import "@/assets/sass/style.scss";
import "@/assets/responsive.css";
import { EditModeProvider } from "@/context/EditModeContext";
import EditModeToolbar from "@/components/cms/EditModeToolbar";

const nunito = Nunito_Sans({
  weight: ["200", "300", "400", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});
const Poppin = Poppins({
  weight: ["200", "300", "400", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

const MyApp = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  useEffect(() => {
    // Fetch properties from Supabase database
    const loadProperties = async () => {
      const properties = await getProperties();

      // Transform database format to match website format
      const transformedProperties = properties.map(property => ({
        id: property.id,
        title: property.title,
        description: property.description,
        price: parseFloat(property.price),
        discount: 0, // Add discount if needed
        location: property.location,
        propertyType: property.property_type,
        propertyDetails: {
          bedrooms: property.bedrooms,
          baths: property.bathrooms,
          area: property.area
        },
        featured: property.featured,
        status: property.status,
        images: property.images || [],
        metaTitle: property.meta_title,
        metaDescription: property.meta_description,
        visible: property.visible,
        orderIndex: property.order_index,
        createdAt: property.created_at,
        updatedAt: property.updated_at
      }));

      store.dispatch(setProducts(transformedProperties));
    };

    loadProperties();
  }, [store]);

  return (
    <Fragment>
      <Head>
        <title>Maraseq Group</title>
        <meta name="description" content="Maraseq Group" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/img/logo.svg" type="image/svg+xml" />
      </Head>
      <style jsx global>{`
        html,body {
          font-family: ${nunito.style.fontFamily};
        }

        h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6 {
         
          font-family: ${Poppin.style.fontFamily};
      }


      `}</style>
      <Provider store={store}>
        <PersistGate persistor={store.__persistor} loading={<Preloader />}>
          <EditModeProvider>
            <Component {...props.pageProps} />
            <EditModeToolbar />
          </EditModeProvider>
        </PersistGate>
      </Provider>
    </Fragment>
  );
};

export default MyApp;
