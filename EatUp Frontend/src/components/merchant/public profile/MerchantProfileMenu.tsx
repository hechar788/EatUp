import React from "react";
import '../../../styles/merchants/publicProfile/merchantMenu.css'

export default function MerchantProfileMenu({ merchant }) {
    return (
        <div className="merchant-profile-menu-container">
            <div className="merchant-profile-menu-category-sidebar">
                {merchant.menu.categories.map((category)=>{
                    return <div className="category-container">
                        <p>{category.categoryname}</p>
                    </div>
                })}
            </div>

            <div className="merchant-profile-menu"></div>
        </div>

    )
}