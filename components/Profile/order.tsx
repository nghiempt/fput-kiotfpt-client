import React, { useEffect, useState } from "react";
import { Button, Divider, Icon } from 'semantic-ui-react';
import { ProfileService } from "../../service/profile";

export default function Order() {

  const [orders, setOrders] = useState([] as any);
  const [filterOrders, setFilterOrders] = useState([] as any);
  const [tab, setTab] = useState(0);

  const handleChangeTab = (data: any, index: number) => {
    setTab(index);
    let tmp: any = []
    switch (index) {
      case 0:
        data?.forEach((order: any) => {
          if (order?.status?.value === 'pending') {
            tmp.push(order);
          }
        });
        setFilterOrders(tmp);
        break;
      case 1:
        data?.forEach((order: any) => {
          if (order?.status?.value === 'delivering') {
            tmp.push(order);
          }
        });
        setFilterOrders(tmp);
        break;
      case 2:
        data?.forEach((order: any) => {
          if (order?.status?.value === 'completed') {
            tmp.push(order);
          }
        });
        setFilterOrders(tmp);
        break;
      case 3:
        data?.forEach((order: any) => {
          if (order?.status?.value === 'rejected') {
            tmp.push(order);
          }
        });
        setFilterOrders(tmp);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const fetch = async () => {
      const prof = await ProfileService.getAllOrders();
      if (prof?.result) {
        setOrders(prof?.data);
        handleChangeTab(prof?.data, 0);
      } else {
        return
      }
    }
    fetch();
  }, []);

  useEffect(() => { }, [orders]);

  return (
    <div className="w-full box-border flex flex-col gap-5 pb-40">
      <h1 className="font-semibold text-[20px] pt-4">Order Management</h1>
      <div className="w-full grid grid-cols-4 gap-4">
        <Button color={`${tab === 0 ? 'facebook' : 'grey'}`} onClick={() => handleChangeTab(orders, 0)}>
          <Icon name='sun' /> Pending
        </Button>
        <Button color={`${tab === 1 ? 'facebook' : 'grey'}`} onClick={() => handleChangeTab(orders, 1)}>
          <Icon name='rain' /> Delivering
        </Button>
        <Button color={`${tab === 2 ? 'facebook' : 'grey'}`} onClick={() => handleChangeTab(orders, 2)}>
          <Icon name='check' /> Completed
        </Button>
        <Button color={`${tab === 3 ? 'facebook' : 'grey'}`} onClick={() => handleChangeTab(orders, 3)}>
          <Icon name='close' /> Rejected
        </Button>
      </div>
      <div className="w-full flex flex-col gap-10 mt-6">
        {
          filterOrders?.map((order: any, index: number) => {
            return (
              <div key={index} className="flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex">
                    <img src={order?.shop?.thumbnail} alt="Watch" className="w-24 h-24 object-cover mr-4 rounded-md" />
                    <div className="flex flex-col gap-2">
                      <h2 className="text-xl font-semibold"><Icon name="shopping bag"></Icon>{order?.shop?.name}</h2>
                      <p>{order?.time_init}</p>
                      <p className="text-lg">Total: <strong>${order?.total}</strong></p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    {
                      order?.product?.map((pro: any, index: number) => {
                        return (
                          <div key={index} className="flex justify-center items-center gap-4">
                            <h2 className="text-[14px] font-semibold">{pro?.name}</h2>
                            <img src={pro?.thumbnail} alt="Watch" className="w-8 h-8 object-cover mr-4 rounded-md" />
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
                <div className="w-full flex justify-end items-center mt-2">
                  <Button primary>View Details</Button>
                  <Button secondary>Refund</Button>
                </div>
                <Divider />
              </div>
            )
          })
        }
      </div>
    </div>
  );
}
