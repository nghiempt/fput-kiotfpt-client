import React from "react";
import StarIcon from "@mui/icons-material/Star";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { limitString } from "../utils/helper";
import Link from "next/link";

export default function CardProduct({ item, index, limit, isFavouriteProductCart = false }: { item: any, index: any, limit: any, isFavouriteProductCart?: any }) {

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
      className="border border-gray-200 rounded-md p-2 cursor-pointer hover:border-gray-500"
      style={{ position: 'relative' }}
    >
      {!isFavouriteProductCart
        ?
        <div className="flex justify-center absolute top-2 right-2">
          <div
            className={`${item?.isFavourite
              ? "bg-[rgb(var(--primary-rgb))]"
              : "border border-gray-300"
              } rounded-md p-2`}
          >
            <FavoriteBorderIcon
              className={`${item?.isFavourite ? "text-white" : "text-gray-300"
                }`}
            />
          </div>
        </div>
        :
        (
          <button onClick={(e) => {
            e.preventDefault();
            isFavouriteProductCart(item?.id)
          }} className="absolute top-2 right-2 p-2" style={{ backgroundColor: 'rgb(var(--primary-rgb))', color: '#ffffff', borderRadius: '4px' }}>
            <FavoriteBorderIcon />
          </button>
        )}
      <img src={item?.thumbnail[0]?.link} alt="img" />
      <div className="p-4">
        <div className="flex gap-x-2 items-center">
          <div className="w-full">
            <div className="flex gap-x-2 items-center">
              <h1 className="font-semibold text-[18px]">
                {item?.minPrice === item?.maxPrice
                  ? `$${item?.minPrice}`
                  : `$${item?.minPrice} - $${item?.maxPrice}`}
              </h1>
              <span className="font-semibold text-red-600 text-[12px] bg-red-100 px-2 rounded-full">
                - {item?.discount}%
              </span>
            </div>
            <div className="flex justify-start items-center gap-4 mt-1">
              <div className="flex items-center">
                {renderStar(item?.rate)}
              </div>
              <h1 className="text-xs">{item?.sold} sold</h1>
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
