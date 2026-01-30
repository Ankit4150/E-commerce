
 import CategoryList from "../components/categoryList";
import BannerProduct from '../components/BannerProduct';
import HorizontalCardProduct from "../components/HorizontalCardProduct"
import VeticalCardProduct from "../components/verticalCardProduct";



export default function Home() {
 

  return (
    <div>
      <CategoryList/>
     <BannerProduct/>
     <HorizontalCardProduct category={"airpodes"} heading={"top's Airpodes"}/>
     <HorizontalCardProduct category={"watches"} heading={"popular's Watches"}/>
     <VeticalCardProduct  category={"mobiles"} heading={" Mobiles"}/>
      <VeticalCardProduct  category={"mouse"} heading={" Mouse"}/>
        <VeticalCardProduct  category={"televisions"} heading={" Televisions"}/>
           <VeticalCardProduct  category={"camera"} heading={" Camera"}/>
              <VeticalCardProduct  category={"refrigerator"} heading={" Refrigerator"}/>
               <VeticalCardProduct  category={"processor"} heading={" Processor"}/>
               <VeticalCardProduct  category={"speakers"} heading={" Speakers"}/>
                <VeticalCardProduct  category={"earphones"} heading={" Earphones"}/>
                 <VeticalCardProduct  category={"trimmers"} heading={" Trimmers"}/>
                          <VeticalCardProduct  category={"Printers"} heading={" Printers"}/>

    </div>
  )
}
