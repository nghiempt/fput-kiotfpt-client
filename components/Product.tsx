import React from "react";
import StarIcon from "@mui/icons-material/Star";
import { limitString } from "../utils/helper";
import Link from "next/link";
import { Icon } from "semantic-ui-react";
import { ProductService } from "../service/product";
import { toast } from "react-semantic-toasts";

export default function CardProduct({ item, index, limit, wishlist = 0, init }: { item: any, index: any, limit: any, wishlist?: number, init?: any }) {

  const handleUnLikeProduct = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    const res = await ProductService.deleteFavourite(wishlist);
    if (res?.result) {
      toast({
        type: 'success',
        title: 'Success',
        description: res?.message,
        time: 1000
      })
      init();
    } else {
      toast({
        type: 'error',
        title: 'Error',
        description: res?.message,
        time: 1000
      })
      init();
    }
  }

  const renderStar = (rate: number) => {
    const stars = [];
    for (let i = 0; i < rate; i++) {
      stars.push(
        <StarIcon
          key={`filled-${i}`}
          className="text-[#FF9017]"
          style={{ width: "14px" }}
        />
      );
    }
    for (let i = rate; i < 5; i++) {
      stars.push(
        <StarIcon
          key={`unfilled-${i}`}
          className="text-[#D4CDC5]"
          style={{ width: "14px" }}
        />
      );
    }
    return stars;
  }

  return (
    <Link
      href={{
        pathname: `/product/${item?.id}`,
      }}
      key={index}
      className="border border-gray-200 rounded-md p-2 cursor-pointer hover:border-gray-500 hover:text-black"
      style={{ position: 'relative' }}
    >
      {
        item?.official && (
          <button className={`bg-orange-600 absolute text-white top-2 right-2 px-2 py-1 rounded-lg font-medium flex`}>
            <Icon name='sellcast' />
            Official
          </button>
        )
      }
      {
        wishlist !== 0 && (
          <button onClick={handleUnLikeProduct} className={`hover:font-bold bg-red-600 absolute text-white top-2 right-2 px-2 py-1 rounded-lg font-medium flex`}>
            <Icon name='trash alternate' />
            Remove
          </button>
        )
      }
      <img src={item?.thumbnail[0]?.link} alt="img" />
      <div className="p-4">
        <div className="flex gap-x-2 items-center">
          <div className="w-full">
            <div className="flex gap-x-2 items-center">
              <div className="font-semibold text-[18px]">
                {item?.minPrice === item?.maxPrice
                  ? `$${item?.minPrice}`
                  : `$${item?.minPrice} - $${item?.maxPrice}`}
              </div>
              <span className="font-semibold text-red-600 text-[12px] bg-red-100 px-2 rounded-full">
                - {item?.discount}%
              </span>
            </div>
            <div className="flex justify-start items-center gap-4 mt-1">
              <div className="flex items-center">
                {renderStar(item?.rate)}
              </div>
              <div className="text-xs">{item?.sold} sold</div>
            </div>
          </div>
        </div>
        <div className="pt-1 text-[16px] font-medium">
          {limitString(item?.name, limit)}
        </div>
      </div>
    </Link>
  );
}
