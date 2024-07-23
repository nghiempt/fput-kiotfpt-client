import React, { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { Pagination } from "@mui/material";
import { ProfileService } from "../../service/profile";

export default function Notify() {

  const [notifies, setNotifies] = useState([] as any);

  const handleGetNotify = async () => {
    const fetch = async () => {
      const prof = await ProfileService.getAllNotifications();
      if (prof?.result) {
        setNotifies(prof?.data);
      } else {
        console.log("wrong");
      }
    }
    fetch();
  }

  const handleDeleteNotify = async (ID: string) => {
    const prof = await ProfileService.deleteNotify(ID);
    if (prof?.result) {
      handleGetNotify();
    } else {
      console.log(prof.data);
    }
  }

  useEffect(() => {
    handleGetNotify();
  }, []);

  useEffect(() => { }, [notifies]);

  return (
    <div className="w-full box-border pb-36">
      <h1 className="font-semibold text-[20px] py-4">Notification</h1>
      <div className="w-full flex gap-x-4  rounded-lg mt-2">
        <div className="w-full flex flex-col gap-2">
          {notifies?.length === 0 && <div className="w-full flex justify-center items-center">
            <h1 className="text-[14px] font-semibold">There is NO notification</h1></div>}
          {notifies?.slice(0, 8)?.map((item: any, index: any) => {
            return (
              <div key={index} className="w-full p-2 border rounded-md bg-gray-50">
                <div className="flex justify-between items-center">
                  <div className="flex gap-x-4 items-center">
                    <div>
                      <div className="p-2">
                        <img src="https://cdn-icons-png.flaticon.com/128/4616/4616062.png" alt="avatar" className="w-14 h-14" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h1 className="font-semibold text-[16px]">{item?.title}</h1>
                      <h1 className="text-[12px]">{item?.description}</h1>
                      <h1 className="text-[12px]">11/12/2024 &nbsp; - &nbsp; 12:35:05</h1>
                    </div>
                  </div>
                  <div onClick={() => handleDeleteNotify(item?.id)} className="border rounded-full mr-2 p-2 bg-[rgb(var(--primary-rgb))] cursor-pointer">
                    <DeleteIcon className="text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {
        notifies?.length > 0 && <div className="flex justify-end gap-x-2 mt-8">
          <Pagination count={Math.ceil(notifies?.length / 10)} variant="outlined" shape="rounded" />
        </div>
      }
    </div>
  );
}
