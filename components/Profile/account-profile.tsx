import React from "react";
import LockIcon from '@mui/icons-material/Lock';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Alert from '@mui/material/Alert';

export default function AccountProfile() {
  return (
    <div className="w-full box-border pb-40">
      <div style={{
        position: 'fixed',
        top: '150px',
        right: '20px',
        zIndex: 10,
        width: '300px',
      }}>
        <Alert variant="filled" severity="success" className='w-full' id="alertSuccess" style={{ display: 'none', alignItems: 'center' }}>
          Update profile successfully!
        </Alert>
        <Alert variant="filled" severity="warning" className='w-full' id="alertAtleast" style={{ display: 'none', alignItems: 'center' }}>
          Full name must be at least 6 characters!
        </Alert>
        <Alert variant="filled" severity="warning" className='w-full' id="alertTooLong" style={{ display: 'none', alignItems: 'center' }}>
          Full name is too long, must shorter than 256 characters!
        </Alert>
        <Alert variant="filled" severity="warning" className='w-full' id="alertPhone" style={{ display: 'none', alignItems: 'center' }}>
          Phone number must be ten characters!
        </Alert>
        <Alert variant="filled" severity="warning" className='w-full' id="alertEmail" style={{ display: 'none', alignItems: 'center' }}>
          Email is invalid!
        </Alert>
      </div>
      <h1 className="font-semibold text-[20px] py-4">Account Information</h1>
      <div className="w-full flex border rounded-lg shadow-md">
        <div className="w-3/5 flex flex-col gap-6 p-4">
          <div className="w-full bg-[rgb(var(--quaternary-rgb))] py-2 pl-4 box-border rounded-md text-white">
            <h1 className="text-[16px] font-semibold">Personal Information</h1>
          </div>
          <div className="flex w-full gap-x-2 justify-between items-center">
            <div className="w-full cursor-pointer flex justify-start items-center gap-8">
              <img src="https://cdn-icons-png.flaticon.com/128/4322/4322991.png" alt="avatar" className="rounded-full w-20 h-20" />
            </div>
          </div>
          <div className="w-full box-border flex font-medium items-center">
            <h1 className="w-1/5">Fullname</h1>
            <TextField
              className="w-4/5"
              label="Full name"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              }}
            />
          </div>
          <div className="w-full flex font-medium items-center">
            <h1 className="w-1/5">Birthday</h1>
            <LocalizationProvider dateAdapter={AdapterDayjs} >
              <DatePicker format="YYYY/MM/DD" />
            </LocalizationProvider>
          </div>
          <div className="w-full flex font-medium items-center">
            <h1 className="w-1/5">Email</h1>
            <TextField
              className="w-4/5"
              label="Email"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              }}
            />
          </div>
          <div className="w-full flex font-medium items-center">
            <h1 className="w-1/5">Phone</h1>
            <TextField
              className="w-4/5"
              label="Phone number"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              }}
            />
          </div>
          <div className="w-full flex font-medium items-center">
            <div className="w-1/5"></div>
            <div className="w-4/5">
              <button className="bg-[rgb(var(--primary-rgb))] font-semibold py-2 px-16 rounded-md text-white">
                SAVE
              </button>
            </div>
          </div>
        </div>
        <div className="w-2/5 flex flex-col gap-6 p-4">
          <div>
            <div className="w-full bg-[rgb(var(--quaternary-rgb))] py-2 pl-4 box-border rounded-md text-white">
              <h1 className="text-[16px] font-semibold">Security</h1>
            </div>
            <div className="flex justify-between pt-5">
              <div className="flex gap-x-2 items-center">
                <LockIcon />
                <div>
                  <h1 className="font-medium">Change password</h1>
                </div>
              </div>
              <div>
                <button className="text-[rgb(var(--quaternary-rgb))] border border-[rgb(var(--quaternary-rgb))] rounded-md py-1 px-4 font-medium">
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
