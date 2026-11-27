

export interface IWishlist {
    id: string;
    user_id: string;

    created_at: Date;
    wishlistItems: IWishlistItem[];
}

export interface IWishlistItem {
    id: string;
    wishlist_id: string;
    meal_id: string;
}
