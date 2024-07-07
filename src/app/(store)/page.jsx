
import CategoryList from "../../components/store/CategoryList";
import CommunityTrainings from "../../components/store/CommunityTrainings";
import SupplierList from "../../components/store/SupplierList"
import Hero from "../../components/store/Hero";
import { getData } from "../../lib/getData";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
export default async function Home() {
  const categoriesData = await getData("categories");
  const categories = categoriesData.filter((category)=>{
    return category.products.length > 0
  })

  return (
    <div className=" font-bold text-black  ">
      <Hero />
      <SupplierList/>
      {categories.map((category, index) => {
        return (
          <div className="py-8" key={index}>
            <CategoryList category={category} />
          </div>
        );
      })}
      <div className="py-8">
        <CommunityTrainings />
      </div> 
    </div>
  );
}
