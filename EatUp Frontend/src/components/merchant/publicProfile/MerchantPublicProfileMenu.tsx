import React from "react";
import '../../../styles/merchants/publicProfile/merchantMenu.css'

export default function MerchantPublicProfileMenu({ merchant }) {
    return (
        <>
        <div className="merchant-profile-menu-container">

            <div className="merchant-profile-menu-category-sidebar">
                {merchant.menu.categories.map((category)=>{
                    return <div className="category-container">
                        <p>{category.categoryname}</p>
                    </div>
                })}
            </div>

            <div className="merchant-profile-menu">
                {merchant.menu.categories.map((category)=>{
                    return <div className="merchant-profile-menu-section">
                        <h1>
                            {category.categoryname}
                        </h1>
                    </div>
                })
                }
            </div>
        </div>
        </>

    )
}