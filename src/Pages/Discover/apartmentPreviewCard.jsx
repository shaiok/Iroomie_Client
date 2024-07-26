import React from "react";
import { useMediaQuery } from "react-responsive";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, DollarSign, Users, Calendar, ChevronRight } from "lucide-react";
import ApartmentProfileDisplay from "../Profile/apartmentProfile";
import DrawerDialogDemo from "@/components/Coustom/modal";
import { format } from "date-fns";

const ApartmentPreviewCard = ({ apartment }) => {
  const { info, amenities } = apartment;
  const isSmallScreen = useMediaQuery({ maxWidth: 640 });

  return (
    <Card className="w-full hover:shadow-lg transition-shadow duration-300 rounded-xl overflow-hidden">
      <CardContent className="p-0">
        <div className="relative">
          <img
            src={info.images[0]}
            alt={info.overview.title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h3 className="font-semibold text-lg truncate">
              {info.overview.title || `${info.specifications.bedrooms} Bed Apartment`}
            </h3>
            <div className="flex items-center text-sm mt-1">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="truncate">
                {info.location.address.street}, {info.location.address.city}
              </span>
            </div>
          </div>
          <Badge className="absolute top-2 right-2 bg-black bg-opacity-50">
            {info.roommates.length} {info.roommates.length > 1 ? "roommates" : "roommate"}
          </Badge>
        </div>
        
        <div className="p-4 space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <DollarSign className="w-5 h-5 text-green-600 mr-1" />
              <span className="font-semibold text-lg">₪{info.financials.rent}/mo</span>
            </div>
            <Badge variant="outline" className="text-sm">
              {info.specifications.size} sq m
            </Badge>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Users className="w-4 h-4 mr-1" />
            <span>{info.specifications.bedrooms} bed • {info.specifications.bathrooms} bath</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {Object.entries(amenities)
              .slice(0, 1)
              .flatMap(([category, items]) =>
                items.slice(0, 3).map((item) => (
                  <Badge key={item} variant="secondary" className="text-xs">
                    {item}
                  </Badge>
                ))
              )}
            {Object.values(amenities).flat().length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{Object.values(amenities).flat().length - 3} more
              </Badge>
            )}
          </div>
          
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-1" />
            <span className="truncate">Available {format(new Date(info.leaseTerms.availableFrom), "d MMM, yyyy")}</span>
          </div>
          
          <DrawerDialogDemo>
            
            <ApartmentProfileDisplay profile={apartment} />
          </DrawerDialogDemo>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApartmentPreviewCard;