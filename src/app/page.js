
import Banner from "@/components/home/Banner";
import CategoriesGrid from "@/components/home/CategoriesGrid";
import GenderCategoryList from "@/components/home/GenderCategoryList";
import ProductSlider from "@/components/home/ProductSlider";
import RatingSlider from "@/components/home/RatingSlider";
import ShopByBrandsSlider from "@/components/home/ShopByBrandsSlider";
import TopBanner from "@/components/home/TopBanner";
import VideoSection from "@/components/home/VideoSection";
import Container from "@/components/shared/Container";
import { getBrands, getCategories, getProductByCategory, getProducts, getReviews, getVideos } from "@/utils/actions";
import FeatureItems from "@/components/home/FeatureItems";
import WelcomeSection from "@/components/home/WelcomeSection";
import AccessoriesSlider from "@/components/home/AccessoriesSlider";
import OutletsSection from "@/components/home/OutletsSection";
const baseUrl = process.env.BASE_URL;


export default async function Home() {
  const products = await getProducts();
  const brands = await getBrands();
  const reviews = await getReviews()
  const categories = await getCategories()
  const featureItems = await getProductByCategory(19)
   const videos = await getVideos();

  // const reviews=await getReviews();
  // console.log("reviews",reviews?.data?.reviews)

  // console.log("featureItems", featureItems)

  return (
    <div className="">

      {/* <TopBanner /> */}
      <Banner/>
      <VideoSection video={videos[0]}/>
      <Container>
        {/* <Banner/> */}
        <WelcomeSection />
        <GenderCategoryList />
        <ProductSlider products={products?.data} />
      </Container>

      <CategoriesGrid categories={categories} />

      <Container>
        <ShopByBrandsSlider brands={brands} />
      {/* featured Items/ best item */}
       <FeatureItems featureItems={featureItems?.data} />
      {/* {
        featureItems?.data?.length > 0  &&
      <FeatureItems featureItems={featureItems?.data} />

      } */}
       
        <AccessoriesSlider />

      </Container>

      <VideoSection video={videos[1]} />


      <Container>
        <OutletsSection/>
        <RatingSlider reviews={reviews?.data} />
      </Container>



    </div>
  );
}
