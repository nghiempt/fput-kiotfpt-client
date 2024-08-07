import Head from "next/head";
import TabProfile from "../../components/Tab";
import React, { useEffect, useState } from "react";
import { Button, Divider, Icon } from "semantic-ui-react";
import { ProfileService } from "../../service/profile";
import { getDate, getTime } from "../../utils/helper";
import { toast } from "react-semantic-toasts";
import Loading from "../../components/Loading";

const Page = () => {
  const [orders, setOrders] = useState([] as any);
  const [loading, setLoading] = useState(true);
  const [filterOrders, setFilterOrders] = useState([] as any);
  const [tab, setTab] = useState(0);

  const handleChangeTab = (data: any, index: number) => {
    setTab(index);
    let tmp: any = [];
    switch (index) {
      case 0:
        data?.forEach((order: any) => {
          if (order?.status?.value === "pending") {
            tmp.push(order);
          }
        });
        setFilterOrders(tmp);
        break;
      case 1:
        data?.forEach((order: any) => {
          if (order?.status?.value === "delivering") {
            tmp.push(order);
          }
        });
        setFilterOrders(tmp);
        break;
      case 2:
        data?.forEach((order: any) => {
          if (order?.status?.value === "completed") {
            tmp.push(order);
          }
        });
        setFilterOrders(tmp);
        break;
      case 3:
        data?.forEach((order: any) => {
          if (order?.status?.value === "rejected") {
            tmp.push(order);
          }
        });
        setFilterOrders(tmp);
        break;
      case 4:
        data?.forEach((order: any) => {
          if (order?.status?.value === "cancel") {
            tmp.push(order);
          }
        });
        setFilterOrders(tmp);
        break;
      default:
        break;
    }
  };

  const cancelOrder = async (ID: string) => {
    const res = await ProfileService.cancelOrder(ID, "cancel");
    if (res?.result) {
      toast({
        type: "success",
        title: "Success",
        description: res?.message,
        time: 1000,
      });
      init();
    } else {
      toast({
        type: "error",
        title: "Error",
        description: res?.message,
        time: 1000,
      });
      init();
    }
  };

  const sortOrder = (data: any) => {
    if (!Array.isArray(data)) return [];
    let tmp = [...data];
    tmp.sort((a, b) => {
        return b.id - a.id;
    });
    return tmp;
  };

  const init = async () => {
    const prof = await ProfileService.getAllOrders();
    if (prof?.result) {
      setOrders(prof?.data);
      handleChangeTab(prof?.data, 0);
      setLoading(false);
    } else {
      setLoading(false);
      return;
    }
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {}, [orders]);

  return (
    <>
      <Head>
        <title>KIOTFPT - Smart Ecommerce</title>
        <meta name="description" content="" />
        <meta name="keywords" content="" />
      </Head>
      <div className="w-full flex flex-col justify-center items-center">
        <div className="w-full flex flex-col justify-center items-center mb-5">
          <div className="w-2/3 flex gap-x-8">
            <TabProfile />
            <div className="w-4/5">
              <div className="w-full box-border flex flex-col gap-5 pb-40">
                <h1 className="font-semibold text-[20px] pt-4">
                  Order Management
                </h1>
                <div className="w-full grid grid-cols-5 gap-4">
                  <Button
                    color={`${tab === 0 ? "facebook" : "grey"}`}
                    onClick={() => handleChangeTab(orders, 0)}
                  >
                    <Icon name="sun" /> Pending
                  </Button>
                  <Button
                    color={`${tab === 1 ? "facebook" : "grey"}`}
                    onClick={() => handleChangeTab(orders, 1)}
                  >
                    <Icon name="rain" /> Delivering
                  </Button>
                  <Button
                    color={`${tab === 2 ? "facebook" : "grey"}`}
                    onClick={() => handleChangeTab(orders, 2)}
                  >
                    <Icon name="check" /> Completed
                  </Button>
                  <Button
                    color={`${tab === 3 ? "facebook" : "grey"}`}
                    onClick={() => handleChangeTab(orders, 3)}
                  >
                    <Icon name="close" /> Rejected
                  </Button>
                  <Button
                    color={`${tab === 4 ? "facebook" : "grey"}`}
                    onClick={() => handleChangeTab(orders, 4)}
                  >
                    <Icon name="close" /> Canceled
                  </Button>
                </div>
                <div className="w-full flex flex-col gap-10 mt-6">
                  {loading ? (
                    <div className="w-full h-[360px] flex justify-center items-center">
                      <Loading />
                    </div>
                  ) : filterOrders?.length === 0 ? (
                    <div className="w-full h-[360px] flex justify-center items-center">
                      <img
                        src="https://static.vecteezy.com/system/resources/previews/023/914/428/non_2x/no-document-or-data-found-ui-illustration-design-free-vector.jpg"
                        alt="empty"
                        className="w-1/3"
                      />
                    </div>
                  ) : (
                    sortOrder(filterOrders)?.map(
                      (order: any, index: number) => {
                        return (
                          <div key={index} className="flex flex-col">
                            <div className="flex justify-between items-center mb-4">
                              <div className="flex">
                                <img
                                  src={order?.shop?.thumbnail}
                                  alt="Watch"
                                  className="w-24 h-24 object-cover mr-4 rounded-md"
                                />
                                <div className="flex flex-col gap-2">
                                  <h2 className="text-xl font-semibold">
                                    <Icon name="shopping bag"></Icon>
                                    {order?.shop?.name} | #{order?.id}
                                  </h2>
                                  <p>
                                    {getDate(order?.time_init)} |{" "}
                                    {getTime(order?.time_init)}
                                  </p>
                                  <p className="text-lg">
                                    Total: <strong>${order?.total}</strong>
                                  </p>
                                </div>
                              </div>
                              <div className="flex flex-col gap-2">
                                {order?.product?.map(
                                  (pro: any, index: number) => {
                                    return (
                                      <div
                                        key={index}
                                        className="flex justify-center items-center gap-4"
                                      >
                                        <h2 className="text-[14px] font-semibold">
                                          {pro?.name}
                                        </h2>
                                        <img
                                          src={pro?.thumbnail}
                                          alt="Watch"
                                          className="w-8 h-8 object-cover mr-4 rounded-md"
                                        />
                                      </div>
                                    );
                                  }
                                )}
                              </div>
                            </div>
                            {tab === 0 && (
                              <div className="w-full flex justify-end items-center mt-2">
                                <Button
                                  color="red"
                                  onClick={() => cancelOrder(order?.id)}
                                >
                                  Cancel Order
                                </Button>
                              </div>
                            )}
                            <Divider />
                          </div>
                        );
                      }
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
