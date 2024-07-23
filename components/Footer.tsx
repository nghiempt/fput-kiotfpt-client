import React from "react";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import Image from 'next/image';

const Footer = () => (
    <footer className="!w-full">
        <div className="w-full flex justify-center items-center bg-[rgb(var(--quaternary-rgb))]">
            <div className="w-2/3 flex gap-x-12 py-10">
                <div className="w-1/4">
                    <div className="flex gap-x-2 items-center mb-2">
                        <div className="text-2xl font-bold text-[rgb(var(--secondary-rgb))]">KIOTFPT</div>
                    </div>
                    <div className="text-xs font-light mb-3 text-white">
                        The best online store for you. We provide the best quality products for you.
                    </div>
                    <div className="flex gap-x-2 text-white">
                        <FacebookOutlinedIcon />
                        <YouTubeIcon />
                        <TwitterIcon />
                        <LinkedInIcon />
                        <EmailIcon />
                    </div>
                </div>
                <div className="w-3/4 grid grid-cols-5">
                    <div className="flex flex-col gap-2 text-gray-300">
                        <div className="font-bold text-gray-200 text-lg">About Us</div>
                        <div>Company History</div>
                        <div>Our Team</div>
                        <div>Mission & Vision</div>
                        <div>Careers</div>
                    </div>
                    <div className="flex flex-col gap-2 text-gray-300">
                        <div className="font-bold text-gray-200 text-lg">Partnership</div>
                        <div>Business Opportunities</div>
                        <div>Become a Partner</div>
                        <div>Partner Benefits</div>
                        <div>Partnership FAQs</div>
                    </div>
                    <div className="flex flex-col gap-2 text-gray-300">
                        <div className="font-bold text-gray-200 text-lg">Information</div>
                        <div>Privacy Policy</div>
                        <div>Terms & Conditions</div>
                        <div>Cookie Policy</div>
                        <div>Contact Information</div>
                    </div>
                    <div className="flex flex-col gap-2 text-gray-300">
                        <div className="font-bold text-gray-200 text-lg">For users</div>
                        <div>User Guide</div>
                        <div>FAQ</div>
                        <div>Customer Support</div>
                        <div>Feedback and Suggestions</div>
                    </div>
                    <div className="flex flex-col gap-2 text-gray-300">
                        <div className="font-bold text-gray-200 text-lg">Get App</div>
                        <Image src="/playstore.png" width={100} height={30} alt="img" className="bg-gray-300 rounded-md" />
                        <Image src="/appstore.png" width={100} height={30} alt="img" className="bg-gray-300 rounded-md" />
                    </div>
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;