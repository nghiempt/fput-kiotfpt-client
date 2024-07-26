import React, { useEffect, useState } from "react";
import { ProfileService } from "../../service/profile";
import { Input, Rating } from "semantic-ui-react";

export default function Review() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const prof = await ProfileService.getAllFavourite();
      if (prof?.result) {
        setProducts(prof?.data);
      } else {
        return
      }
    }
    fetch();
  }, []);

  useEffect(() => { }, [products]);

  return (
    <div className="w-full box-border pb-32">
      <h1 className="font-semibold text-[20px] py-4">Need Review</h1>
      <div className="w-full rounded-md grid grid-cols-1 gap-4">
        {products.slice(0, 6)?.map((item: any, index: any) => {
          return (
            <div
              key={index}
              className="border border-gray-200 rounded-md p-2 cursor-pointer flex flex-row justify-start items-center"
              style={{ position: 'relative' }}
            >
              <img src={item?.product?.thumbnail[0]?.link} alt="img" className="w-32 h-32" />
              <div className="w-full px-4 py-2">
                <div className="w-full text-[16px] font-medium">
                  {item?.product?.name}
                </div>
                <Rating icon='star' defaultRating={0} maxRating={5} className="mt-4 mb-6" />
                <div className="w-full">
                  <Input
                    placeholder='Write your review here...'
                    action={{
                      color: 'teal',
                      labelPosition: 'right',
                      icon: 'send',
                      content: 'Send',
                    }}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <h1 className="font-semibold text-[20px] py-4 mt-6">Reviewed</h1>
      <div className="w-full rounded-md grid grid-cols-1 gap-4">
        {products.slice(0, 6)?.map((item: any, index: any) => {
          return (
            <div
              key={index}
              className="border border-gray-200 rounded-md p-2 cursor-pointer flex flex-row justify-start items-center"
              style={{ position: 'relative' }}
            >
              <img src={item?.product?.thumbnail[0]?.link} alt="img" className="w-32 h-32" />
              <div className="w-full px-4 py-2">
                <div className="w-full text-[16px] font-medium">
                  {item?.product?.name}
                </div>
                <Rating icon='star' defaultRating={5} maxRating={5} className="mt-4 mb-6" />
                <div className="w-full">
                  <Input
                    placeholder='Write your review here...'
                    value="This product is very good!"
                    action={{
                      color: 'teal',
                      labelPosition: 'right',
                      icon: 'send',
                      content: 'Update',
                    }}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
