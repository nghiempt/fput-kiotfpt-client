import React, { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { ProfileService } from "../../service/profile";
import ModalCreateAddress from "../Modal/modal.create-address";

const Address = () => {

  const [addresses, setAddresses] = useState([] as any);
  const [openModalCreate, setOpenModalCreate] = useState(false)

  const handleOpenModalCreate = () => {
    setOpenModalCreate(true);
  }

  const handleGetAddress = async () => {
    const fetch = async () => {
      const prof = await ProfileService.getAllAddress();
      if (prof?.result) {
        setAddresses(prof?.data);
      } else {
        return
      }
    }
    fetch();
  }

  useEffect(() => {
    handleGetAddress();
  }, []);

  useEffect(() => { }, [addresses]);

  return (
    <div className="w-full box-border flex flex-col gap-4 pb-48">
      <ModalCreateAddress open={openModalCreate} setOpen={setOpenModalCreate} initialData={{}} />
      <h1 className="font-semibold text-[20px] py-4">Address Management</h1>
      <div className='flex justify-center items-center mb-6'>
        <button
          onClick={handleOpenModalCreate}
          className="w-1/6 flex gap-x-2 bg-[rgb(var(--quaternary-rgb))] rounded-md p-4 justify-center items-center"
        >
          <AddIcon style={{ color: '#fff' }} />
          <h1 className="text-white font-medium">Add Address</h1>
        </button>
      </div>
      {addresses?.map((item: any, index: any) => {
        return (
          <div key={index} className="w-full flex flex-col bg-gray-50 rounded-lg p-5 border">
            <div className="flex justify-between items-center">
              <div className="flex gap-x-4">
                <h1 className="font-semibold text-[14px]">Nhà Riêng</h1>
                {item?.isdefault && <div className="flex gap-x-1 items-center bg-[rgb(var(--quaternary-rgb))] text-white px-2 rounded-md">
                  <CheckCircleOutlineIcon style={{ fontSize: "12px" }} />
                  <h1 className="text-[12px]">Default</h1>
                </div>}

              </div>
              <button className="font-medium text-[rgb(var(--quaternary-rgb))] box-border border border-[rgb(var(--quaternary-rgb))] py-1 px-8 rounded-md">
                Edit
              </button>
            </div>
            <div className="flex gap-x-2 pt-2">
              <h1>Address:</h1>
              <h1 className="font-medium">{item?.address_value} - {item?.district?.district_value} - {item?.province?.province_value}</h1>
            </div>
            <div className="flex gap-x-2">
              <h1>Phone:</h1>
              <h1 className="font-medium">09xxxxxxxx</h1>
            </div>
          </div>
        )
      })}
    </div>
  );
};

export default Address;
