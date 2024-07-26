import React, { useEffect, useState } from "react";
import { ProfileService } from "../../service/profile";
import { Input, Rating } from "semantic-ui-react";

export default function Review() {

  const [productsNeedReview, setProductsNeedReview] = useState([]);
  const [productsReviewed, setProductsReviewed] = useState([]);

  const [review, setReview] = useState('');
  const [rate, setRate] = useState(0);

  const handleSelectedRate = (data: any) => {
    setRate(data?.rating);
  }

  const handleSendReview = async (productID: any, e: any) => {
    const payload = {
      account_id: 103,
      product_id: productID,
      rate: rate,
      content: review,
    }
    const res = await ProfileService.createReview(payload);
    if (res?.result) {
      window.location.reload();
    } else {
      return
    }
  }

  useEffect(() => {
    const fetch = async () => {
      const prof = await ProfileService.getProductNeedReview(103);
      if (prof?.result) {
        setProductsNeedReview(prof?.data);
      } else {
        return
      }
      const res = await ProfileService.getProductReviewed(103);
      if (prof?.result) {
        setProductsReviewed(res?.data);
      } else {
        return
      }
    }
    fetch();
  }, []);

  return (
    <div className="w-full box-border pb-32">
      <h1 className="font-semibold text-[20px] py-4">Need Review</h1>
      <div className="w-full rounded-md grid grid-cols-1 gap-4">
        {productsNeedReview?.map((item: any, index: any) => {
          return (
            <div
              key={index}
              className="border border-gray-200 rounded-md p-2 cursor-pointer flex flex-row justify-start items-center"
              style={{ position: 'relative' }}
            >
              <img src={item?.thumbnail[0]?.link} alt="img" className="w-32 h-32" />
              <div className="w-full px-4 py-2">
                <div className="w-full text-[16px] font-medium">
                  {item?.name}
                </div>
                <Rating icon='star' defaultRating={0} maxRating={5} className="mt-4 mb-6" onRate={(e, data) => handleSelectedRate(data)} />
                <div className="w-full">
                  <div className="w-full flex">
                    <input
                      type="text"
                      placeholder='Write your review here...'
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      className="w-5/6 px-4 py-2 box-border rounded-l-md border border-gray-300 focus:outline-none focus:border-[rgb(var(--quaternary-rgb))]"
                    />
                    <div className="w-1/6 box-border flex justify-center items-center">
                      <button
                        onClick={(e) => handleSendReview(item?.id, e)}
                        className="w-full px-4 py-2 box-border text-center border font-semibold border-[rgb(var(--quaternary-rgb))] bg-[rgb(var(--quaternary-rgb))] text-white rounded-r-md hover:opacity-80 hover:text-white focus:outline-none">
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <h1 className="font-semibold text-[20px] py-4 mt-6">Reviewed</h1>
      <div className="w-full rounded-md grid grid-cols-1 gap-4">
        {productsReviewed?.map((item: any, index: any) => {
          return (
            <div
              key={index}
              className="border border-gray-200 rounded-md p-2 cursor-pointer flex flex-row justify-start items-center"
              style={{ position: 'relative' }}
            >
              <img src={item?.productMiniResponse
                ?.thumbnail[0]?.link} alt="img" className="w-32 h-32" />
              <div className="w-full px-4 py-2">
                <div className="w-full text-[16px] font-medium">
                  {item?.productMiniResponse
                    ?.name}
                </div>
                <Rating
                  icon='star'
                  defaultRating={item?.rate}
                  maxRating={5}
                  className="mt-4 mb-6"
                />
                <div className="w-full">
                  <Input
                    placeholder='Write your review here...'
                    value={item?.content}
                    readOnly
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
