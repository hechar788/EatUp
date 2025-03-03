import React from "react";
import { useParams } from "react-router";
import useMediaQuery from "../hooks/useMediaQuery";

import fakeMerchantData from "../lib/fakeMerchantData.json";

import MerchantPublicProfileHeader from "../components/merchant/publicProfile/MerchantPublicProfileHeader";
import MerchantPublicProfileExplore from "../components/merchant/publicProfile/MerchantPublicProfileExplore";
import MerchantPublicProfileMenu from "../components/merchant/publicProfile/MerchantPublicProfileMenu";

import MerchantPublicProfileMobileNav from "../components/merchant/publicProfile/nav/MerchantPublicProfileMobileNav";
import MerchantPublicProfileDesktopNav from "../components/merchant/publicProfile/nav/MerchantPublicProfileDesktopNav";

import '../styles/merchants/publicProfile/merchantProfile.css';

export default function MerchantPublicProfile() {

    const { id, page } = useParams();
    const merchant = fakeMerchantData.find(x => x.id === id);

    if (!merchant) {
        return <div>Merchant not found</div>;
    }

    return (
        <div className="merchant-public-profile">
            {
                useMediaQuery('(max-width: 750px)') ? <MerchantPublicProfileMobileNav /> : <MerchantPublicProfileDesktopNav />
            }

            <div className="merchant-public-profile--content">
                <MerchantPublicProfileHeader merchant={merchant} page={page} />

                {
                    page == 'menu' && <MerchantPublicProfileMenu merchant={merchant} />
                }

                {
                    page == 'reels' && <MerchantPublicProfileExplore merchant={merchant} />
                }
            </div>
        </div>
    );
}