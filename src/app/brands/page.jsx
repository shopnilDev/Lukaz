
import { getBrands } from "@/utils/actions";
import Brands from "@/components/Brands/Brands";

export default async function BrandsPage() {
 const brands=await getBrands();
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
    <Brands brands={brands}/>
    </div>
  );
}
