import { Fragment, useEffect } from "react";
import Head from "next/head";
import { Nunito_Sans, Poppins } from "next/font/google";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { wrapper } from "@/store";
import { setProducts } from "@/store/slices/product-slice";
import { getProperties, supabase } from "@/lib/supabase";
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
import "@/components/presentation/presentation.css";
import { EditModeProvider } from "@/context/EditModeContext";
import EditModeToolbar from "@/components/cms/EditModeToolbar";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";



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
    // Fetch properties from Supabase database on every mount
    const loadProperties = async () => {
      // Test Supabase connection first
      try {
        const { data: testConnection, error: connectionError } = await supabase
          .from('properties')
          .select('count')
          .eq('visible', true);

        if (connectionError) {
          return;
        }
      } catch (error) {
        return;
      }

      const properties = await getProperties();


      // Transform database format to match website JSON format
      const transformedProperties = properties.map(property => ({
        id: property.id,
        carousel: property.carousel || [],
        title: property.title,
        productImg: property.product_img || property.images?.[0] || '',
        price: parseFloat(property.price) || 0,
        currency: property.currency || 'USD',
        priceRange: property.price_range || [],
        discount: property.discount || 0,
        country: property.country || false,
        district: property.district || '',
        properties: property.properties_count || 0,
        featured: property.featured || false,
        new: property.new || false,
        rent: property.rent || false,
        photo: property.photo || [],
        video: property.video || [],
        bedBath: property.bed_bath || [],
        ratingCount: property.rating_count || 0,
        rating: property.rating || 0,
        saleCount: property.sale_count || 0,
        category: property.category || [],
        tag: property.tags || [],
        date: property.date || property.created_at,
        comments: property.comments || 0,
        locantion: property.location || '',
        pathDescription: property.path_description || '',
        idealFor: property.ideal_for || '',
        recommendedLabel: property.recommended_label || '',
        opportunityType: property.opportunity_type || '',
        opportunityStage: property.opportunity_stage || '',
        objective: property.objective || '',
        description: {
          title: 'Description',
          fullDescription: property.full_description || property.description || '',
          shortDescription: property.short_description || property.meta_description || ''
        },
        propertyDetails: {
          propertyId: property.id,
          area: property.area,
          propertyStatus: property.status,
          rooms: property.rooms || 0,
          bedrooms: property.bedrooms,
          baths: property.bathrooms,
          createdYear: property.year_built || new Date(property.created_at).getFullYear(),
          ...(property.property_details || {})
        },
        factsAndFeatures: property.facts_and_features || {},
        amenities1: property.amenities1 || [],
        amenities2: property.amenities2 || [],
        amenities3: property.amenities3 || [],
        AmenitiesList: property.amenities_list || [],
        agent: property.agent || {},
        gallery: property.gallery || {},
        propertyTypes: property.property_types || [],
        mapEmbedUrl: property.map_embed_url || null,
        videoUrl: property.video_url || null,
        videoPoster: property.video_poster || null,
        galleryImages: property.gallery_images || []
      }));



      if (transformedProperties.length === 0) {

        const testProperties = [
          {
            id: 'test-1',
            title: 'Test Property 1',
            featured: true,
            objective: 'investment',
            price: 500000,
            productImg: '/img/product-3/1.jpg',
            category: ['residential'],
            propertyDetails: {
              bedrooms: 3,
              baths: 2,
              area: '2000'
            }
          },
          {
            id: 'test-2',
            title: 'Test Property 2',
            featured: true,
            objective: 'living',
            price: 300000,
            productImg: '/img/product-3/2.jpg',
            category: ['residential'],
            propertyDetails: {
              bedrooms: 2,
              baths: 2,
              area: '1500'
            }
          }
        ];
        store.dispatch(setProducts(testProperties));
      } else {

        store.dispatch(setProducts(transformedProperties));
      }
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
            <SpeedInsights />
            <Analytics />
          </EditModeProvider>
        </PersistGate>
      </Provider>
    </Fragment>
  );
};

export default MyApp;
