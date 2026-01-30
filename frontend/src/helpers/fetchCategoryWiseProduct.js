import Summaryapi from '../common';

const fetchCategoryWiseProduct=async(category)=>{
    const respone=await fetch(Summaryapi.categoryWiseProduct.url,{
        method:Summaryapi.categoryWiseProduct.method,
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({
            category:category
        })
    })

    const dataResponse=await  respone.json();
    return dataResponse;
}

export default  fetchCategoryWiseProduct;