import React, { useEffect, useState } from "react";
import CardProduct from "../Product";
import { ProfileService } from "../../service/profile";

export default function Wishlist() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const prof = await ProfileService.getAllFavourite();
      if (prof?.result) {
        setProducts(prof?.data);
      } else {
        console.log(prof.data);
      }
    }
    fetch();
  }, []);

  useEffect(() => { }, [products]);

  return (
    <div className="w-full box-border pb-32">
      <h1 className="font-semibold text-[20px] py-4">Wishlist Product ({products?.length})</h1>
      <div className="w-full rounded-md grid grid-cols-4 gap-4">
        {products.slice(0, 6)?.map((item: any, index: any) => {
          return (
            <CardProduct key={index} item={item?.product} index={index} limit={20} />
          );
        })}
      </div>
    </div>
  );
}
