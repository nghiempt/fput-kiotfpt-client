import Head from 'next/head';
import React from "react";
import { List, ListItemButton, ListItemText } from "@mui/material";
import AccountProfile from "../components/Profile/account-profile";
import Address from "../components/Profile/address";
import Review from "../components/Profile/review";
import Order from "../components/Profile/order";
import Wishlist from "../components/Profile/wishlist";
import Notify from "../components/Profile/notify";
import Transaction from "../components/Profile/transaction";
import MenuIcon from '@mui/icons-material/Menu';

const Page = () => {

    const [selectedIndex, setSelectedIndex] = React.useState(2);

    const handleListItemClick = (event: any, index: any) => {
        setSelectedIndex(index);
    };

    const renderContent = () => {
        switch (selectedIndex) {
            case 2:
                return <AccountProfile />
            case 3:
                return <Notify />
            case 4:
                return <Order />
            case 5:
                return <Transaction />;
            case 6:
                return <Address />
            case 7:
                return <Review />
            case 8:
                return <Wishlist />
            default:
                return <AccountProfile />
        }
    }

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
                        <div className="w-1/5">
                            <div className="flex gap-x-2 my-2 items-center justify-start pl-4 text-white font-bold text-[16px] rounded-md py-4 bg-[rgb(var(--quaternary-rgb))]">
                                <MenuIcon />
                                <h1>Menu</h1>
                            </div>
                            <List component="nav" aria-label="secondary mailbox folder">
                                <ListItemButton
                                    selected={selectedIndex === 2}
                                    onClick={(event) => handleListItemClick(event, 2)}
                                    sx={{
                                        borderRadius: "4px",
                                    }}
                                >
                                    <ListItemText
                                        primary="Account Information"
                                        sx={{
                                            color: selectedIndex === 2 ? "black" : "gray",
                                        }}
                                    />
                                </ListItemButton>
                                <ListItemButton
                                    selected={selectedIndex === 3}
                                    onClick={(event) => handleListItemClick(event, 3)}
                                    sx={{
                                        borderRadius: "4px",
                                    }}
                                >
                                    <ListItemText
                                        primary="Notification"
                                        sx={{
                                            color: selectedIndex === 3 ? "black" : "gray",
                                        }}
                                    />
                                </ListItemButton>
                                <ListItemButton
                                    selected={selectedIndex === 4}
                                    onClick={(event) => handleListItemClick(event, 4)}
                                    sx={{
                                        borderRadius: "4px",
                                    }}
                                >
                                    <ListItemText
                                        primary="Order Management"
                                        sx={{
                                            color: selectedIndex === 4 ? "black" : "gray",
                                        }}
                                    />
                                </ListItemButton>
                                <ListItemButton
                                    selected={selectedIndex === 5}
                                    onClick={(event) => handleListItemClick(event, 5)}
                                    sx={{
                                        borderRadius: "4px",
                                    }}
                                >
                                    <ListItemText
                                        primary="Transaction Management"
                                        sx={{
                                            color: selectedIndex === 5 ? "black" : "gray",
                                        }}
                                    />
                                </ListItemButton>
                                <ListItemButton
                                    selected={selectedIndex === 6}
                                    onClick={(event) => handleListItemClick(event, 6)}
                                    sx={{
                                        borderRadius: "4px",
                                    }}
                                >
                                    <ListItemText
                                        primary="Address Management"
                                        sx={{
                                            color: selectedIndex === 6 ? "black" : "gray",
                                        }}
                                    />
                                </ListItemButton>
                                <ListItemButton
                                    selected={selectedIndex === 7}
                                    onClick={(event) => handleListItemClick(event, 7)}
                                    sx={{
                                        borderRadius: "4px",
                                    }}
                                >
                                    <ListItemText
                                        primary="Product Reviews"
                                        sx={{
                                            color: selectedIndex === 7 ? "black" : "gray",
                                        }}
                                    />
                                </ListItemButton>
                                <ListItemButton
                                    selected={selectedIndex === 8}
                                    onClick={(event) => handleListItemClick(event, 8)}
                                    sx={{
                                        borderRadius: "4px",
                                    }}
                                >
                                    <ListItemText
                                        primary="Wishlist Product"
                                        sx={{
                                            color: selectedIndex === 8 ? "black" : "gray",
                                        }}
                                    />
                                </ListItemButton>
                            </List>
                        </div>
                        <div className="w-4/5">
                            {renderContent()}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page;
