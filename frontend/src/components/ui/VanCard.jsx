/*

Small UI for the Trips
Author: HERVET Thibaut

*/
import { useNavigate } from "react-router-dom";
import {
  CalendarIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";

const VanCard = ({ van, large= false }) => {
  const formattedPrice = `$${van.price.toLocaleString()}`;
  const formattedBaseRate = `$${van.baseRate.toLocaleString()}`;

  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/campervans/${van._id}`, {
      state: { 
        van, 
        startDate: van.startDate, 
        endDate: van.endDate 
      }
    });
  };

  return (
    <div 
    onClick={handleClick}
    className={`${
      large ? "w-96" : "w-64"
    } rounded-xl shadow-md p-4  border bg-white/80
                backdrop-blur-md transition-all duration-200`}>
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-voga-title">
          {van.manufacturer} {van.model}
        </h2>

        <div className="flex items-center text-sm text-voga-textMuted">
          <TruckIcon className="w-5 h-5 mr-1 text-voga-accent" />
          {van.type} Van
        </div>

        <div className="flex items-center text-sm text-voga-textMuted">
          <CurrencyDollarIcon className="w-5 h-5 mr-1 text-voga-accent" />
          {formattedPrice} / day
        </div>

        <div className="flex items-center text-sm text-voga-textMuted">
          <CalendarIcon className="w-5 h-5 mr-1 text-voga-accent" />
          Base Rate: {formattedBaseRate} / day
        </div>

        <div>
          <h3 className="text-sm font-semibold text-voga-text mb-1">Location</h3>
          <div className="flex items-center text-sm text-voga-title">
            <MapPinIcon className="w-5 h-5 mr-1 text-voga-accent" />
            {van.location}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-voga-text mb-1">Details</h3>
          <ul className="space-y-2 text-sm text-voga-title">
            <li><strong>Seats:</strong> {van.seats}</li>
            <li><strong>Beds:</strong> {van.beds}</li>
            <li><strong>Transmission:</strong> {van.transmission}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VanCard;
