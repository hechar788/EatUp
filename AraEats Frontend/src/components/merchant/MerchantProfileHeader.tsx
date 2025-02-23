import React, { useState, useEffect} from "react";
import DownArrowSVG from "../../assets/svg/down-arrow-svg";
import StarSVG from "../../assets/svg/star-svg";

export default function MerchantProfileHeader({ merchant, merchantMenuView, setMerchantMenuView }){
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [currentDay, setCurrentDay] = useState<string>("");
    const [currentStatus, setCurrentStatus] = useState<string>("Closed");

    useEffect(() => {
        // Set current day on component mount
        const today = new Date().toLocaleDateString('en-NZ', {
            timeZone: 'Pacific/Auckland',
            weekday: 'long'
        });
        setCurrentDay(today);
    }, []);

    useEffect(() => {
        // Update status whenever currentDay changes
        if (currentDay && merchant) {
            setCurrentStatus(checkIfOpen());
        }
    }, [currentDay]);

    const checkIfOpen = (): string => {
        if (!merchant || !currentDay || !merchant.openinghours[currentDay]) {
            return 'Closed';
        }

        try {
            const now = new Date().toLocaleTimeString('en-NZ', {
                timeZone: 'Pacific/Auckland',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });

            const todayHours = merchant.openinghours[currentDay];

            if (!todayHours.isOpen) {
                return 'Closed';
            }

            return (now >= todayHours.open && now <= todayHours.close)
                ? 'Open'
                : 'Closed';
        } catch (error) {
            console.error('Error checking opening hours:', error);
            return 'Closed';
        }
    };

    const reorderedDays = (): string[] => {
        if (!currentDay) return [];

        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const currentIndex = days.indexOf(currentDay);
        return [...days.slice(currentIndex), ...days.slice(0, currentIndex)];
    };

    const formatTime = (time: string): string => {
        // Convert 24h time to 12h time format
        const [hours, minutes] = time.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'pm' : 'am';
        const formattedHour = hour % 12 || 12;
        return `${formattedHour}${minutes === '00' ? '' : `:${minutes}`}${ampm}`;
    };

    return (
    <div className="merchant-profile-header-container">
            {merchant.filename && (
                <img
                    className="merchant-profile-header-img"
                    src={`/src/assets/merchantPhotos/${merchant.filename}`}
                    alt={merchant.name}
                />
            )}

            <div className="merchant-profile-header-info">
                <div>
                    <h1>{merchant.name}</h1>
                    <p>{merchant.address}</p>

                    <div className="merchant-rating">
                        <div>
                            {merchant.rating} <StarSVG /> <p>(100)</p>
                        </div>
                        -
                        <p>{merchant.category}</p>
                    </div>

                    <div className="merchant-profile-header-opening-hours-container">
                        <p className="merchant-opening-hours-availability-status">
                            <strong>{currentStatus}</strong>
                        </p>

                        {currentDay && merchant.openinghours[currentDay] && (
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            >
                                <div className="merchant-profile-header-opening-hours-date">
                                    <p>
                                        {currentDay}:
                                    </p>

                                    <p>
                                        {formatTime(merchant.openinghours[currentDay].open)}
                                        -
                                        {formatTime(merchant.openinghours[currentDay].close)}
                                    </p>
                                </div>

                                <DownArrowSVG />

                                {isDropdownOpen && (
                            <div className="merchant-profile-header-opening-hours-carousel">
                                {reorderedDays().map((day) => (
                                    <div key={day} className="opening-hours-item">
                                        <p className="day">{day}:</p>

                                        {merchant.openinghours[day].isOpen ? (
                                            <p className="hours">
                                                {formatTime(merchant.openinghours[day].open)}
                                                -
                                                {formatTime(merchant.openinghours[day].close)}
                                            </p>
                                        ) : (
                                            <p className="closed">Closed</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                            </button>
                        )}

                    </div>
                </div>
            </div>

            <div className="merchant-profile-view-selection-buttons">
                <button className={`${merchantMenuView && 'active'}`} onClick={()=>setMerchantMenuView(true)}>Order Online</button>
                <button className={`${!merchantMenuView && 'active'}`} onClick={()=>setMerchantMenuView(false)}>Reels</button>
            </div>
        </div>
    )
}