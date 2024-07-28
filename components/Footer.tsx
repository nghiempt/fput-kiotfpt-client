import React from "react";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import Image from 'next/image';
import { Popup } from "semantic-ui-react";

const Footer = () => (
    <footer className="!w-full">
        <div className="w-full flex flex-col justify-center items-center bg-[rgb(var(--secondary-rgb))]">
            <div className="w-2/3 flex gap-x-12 py-10">
                <div className="w-1/4">
                    <div className="flex gap-x-2 items-center mb-2">
                        <div className="text-2xl font-bold text-white">KIOTFPT - Smart Ecommerce</div>
                    </div>
                    <div className="text-xs font-light mb-3 text-white">
                        The best online store for you. We provide the best quality products for you.
                    </div>
                    <div className="flex gap-x-2 text-white">
                        <Popup content='Feature is coming soon!' trigger={<FacebookOutlinedIcon className="cursor-pointer" />} />
                        <Popup content='Feature is coming soon!' trigger={<YouTubeIcon className="cursor-pointer" />} />
                        <Popup content='Feature is coming soon!' trigger={<TwitterIcon className="cursor-pointer" />} />
                        <Popup content='Feature is coming soon!' trigger={<LinkedInIcon className="cursor-pointer" />} />
                        <Popup content='Feature is coming soon!' trigger={<EmailIcon className="cursor-pointer" />} />
                    </div>
                </div>
                <div className="w-3/4 grid grid-cols-5">
                    <div className="flex flex-col gap-2 text-gray-300">
                        <div className="font-bold text-gray-200 text-lg">About Us</div>
                        <Popup content='Feature is coming soon!' trigger={<div className="cursor-pointer">Company History</div>} />
                        <Popup content='Feature is coming soon!' trigger={<div className="cursor-pointer">Our Team</div>} />
                        <Popup content='Feature is coming soon!' trigger={<div className="cursor-pointer">Mission & Vision</div>} />
                        <Popup content='Feature is coming soon!' trigger={<div className="cursor-pointer">Careers</div>} />
                    </div>
                    <div className="flex flex-col gap-2 text-gray-300">
                        <div className="font-bold text-gray-200 text-lg">Partnership</div>
                        <Popup content='Feature is coming soon!' trigger={<div className="cursor-pointer">Business Opportunities</div>} />
                        <Popup content='Feature is coming soon!' trigger={<div className="cursor-pointer">Become a Partner</div>} />
                        <Popup content='Feature is coming soon!' trigger={<div className="cursor-pointer">Partner Benefits</div>} />
                        <Popup content='Feature is coming soon!' trigger={<div className="cursor-pointer">Partnership FAQs</div>} />
                    </div>
                    <div className="flex flex-col gap-2 text-gray-300">
                        <div className="font-bold text-gray-200 text-lg">Information</div>
                        <Popup content='Feature is coming soon!' trigger={<div className="cursor-pointer">Privacy Policy</div>} />
                        <Popup content='Feature is coming soon!' trigger={<div className="cursor-pointer">Terms & Conditions</div>} />
                        <Popup content='Feature is coming soon!' trigger={<div className="cursor-pointer">Cookie Policy</div>} />
                        <Popup content='Feature is coming soon!' trigger={<div className="cursor-pointer">Contact Information</div>} />
                    </div>
                    <div className="flex flex-col gap-2 text-gray-300">
                        <div className="font-bold text-gray-200 text-lg">For users</div>
                        <Popup content='Feature is coming soon!' trigger={<div className="cursor-pointer">User Guide</div>} />
                        <Popup content='Feature is coming soon!' trigger={<div className="cursor-pointer">FAQ</div>} />
                        <Popup content='Feature is coming soon!' trigger={<div className="cursor-pointer">Customer Support</div>} />
                        <Popup content='Feature is coming soon!' trigger={<div className="cursor-pointer">Feedback and Suggestions</div>} />
                    </div>
                    <div className="flex flex-col gap-2 text-gray-300">
                        <div className="font-bold text-gray-200 text-lg">Get App</div>
                        <Popup content='Feature is coming soon!' trigger={<Image src="/playstore.png" width={100} height={30} alt="img" className="bg-gray-300 rounded-md cursor-pointer" />} />
                        <Popup content='Feature is coming soon!' trigger={<Image src="/appstore.png" width={100} height={30} alt="img" className="bg-gray-300 rounded-md cursor-pointer" />} />
                    </div>
                </div>
            </div>
            <div className="w-full">
                <div className="w-full bg-[rgb(var(--primary-rgb))] text-white text-center py-4 flex justify-center items-center">
                    © 2024 KIOTFPT | All Rights Reserved | Designed by KIOTFPT Team
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;