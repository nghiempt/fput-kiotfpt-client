import React from "react";
import { List, ListItemButton, ListItemText } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from "next/router";

const TabProfile = () => {

    const router = useRouter();
    const pathname = router.pathname;

    const handleListItemClick = (tab: any) => {
        router.push(`/profile/${tab}`);
    };

    return (
        <div className="w-1/5">
            <div className="flex gap-x-2 my-2 items-center justify-start pl-4 text-white font-bold text-[16px] rounded-md py-4 bg-[rgb(var(--secondary-rgb))]">
                <MenuIcon />
                <h1>Menu</h1>
            </div>
            <List component="nav" aria-label="secondary mailbox folder">
                <ListItemButton
                    selected={pathname === '/profile/account'}
                    onClick={(event) => handleListItemClick('account')}
                    sx={{
                        borderRadius: "4px",
                    }}
                >
                    <ListItemText
                        primary="Account Information"
                        sx={{
                            color: pathname === '/profile/account' ? "black" : "gray",
                        }}
                    />
                </ListItemButton>
                <ListItemButton
                    selected={pathname === '/profile/notify'}
                    onClick={(event) => handleListItemClick('notify')}
                    sx={{
                        borderRadius: "4px",
                    }}
                >
                    <ListItemText
                        primary="Notification"
                        sx={{
                            color: pathname === '/profile/notify' ? "black" : "gray",
                        }}
                    />
                </ListItemButton>
                <ListItemButton
                    selected={pathname === '/profile/order'}
                    onClick={(event) => handleListItemClick('order')}
                    sx={{
                        borderRadius: "4px",
                    }}
                >
                    <ListItemText
                        primary="Order Management"
                        sx={{
                            color: pathname === '/profile/order' ? "black" : "gray",
                        }}
                    />
                </ListItemButton>
                <ListItemButton
                    selected={pathname === '/profile/transaction'}
                    onClick={(event) => handleListItemClick('transaction')}
                    sx={{
                        borderRadius: "4px",
                    }}
                >
                    <ListItemText
                        primary="Transaction Management"
                        sx={{
                            color: pathname === '/profile/transaction' ? "black" : "gray",
                        }}
                    />
                </ListItemButton>
                <ListItemButton
                    selected={pathname === '/profile/address'}
                    onClick={(event) => handleListItemClick('address')}
                    sx={{
                        borderRadius: "4px",
                    }}
                >
                    <ListItemText
                        primary="Address Management"
                        sx={{
                            color: pathname === '/profile/address' ? "black" : "gray",
                        }}
                    />
                </ListItemButton>
                <ListItemButton
                    selected={pathname === '/profile/review'}
                    onClick={(event) => handleListItemClick('review')}
                    sx={{
                        borderRadius: "4px",
                    }}
                >
                    <ListItemText
                        primary="Product Reviews"
                        sx={{
                            color: pathname === '/profile/review' ? "black" : "gray",
                        }}
                    />
                </ListItemButton>
                <ListItemButton
                    selected={pathname === '/profile/wishlist'}
                    onClick={(event) => handleListItemClick('wishlist')}
                    sx={{
                        borderRadius: "4px",
                    }}
                >
                    <ListItemText
                        primary="Wishlist Product"
                        sx={{
                            color: pathname === '/profile/wishlist' ? "black" : "gray",
                        }}
                    />
                </ListItemButton>
            </List>
        </div>
    )
}

export default TabProfile;
