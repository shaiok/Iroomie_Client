import React, { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, DollarSign, Users, Calendar } from "lucide-react";
import ApartmentProfileDisplay from "../Profile/apartmentProfile";
import DrawerDialogDemo from "@/components/Coustom/modal";
import { format } from "date-fns";

const ApartmentPreviewCard = ({ apartment }) => {
  const { info, amenities } = apartment;

  return (
    <Card className="w-full max-w-md hover:shadow-lg transition-shadow duration-300 rounded-xl overflow-hidden h-full flex flex-col justify-between">
      <CardContent className="p-0">
        <div className="relative">
          <img
            src={info.images[0]}
            alt={info.overview.title}
            className="w-full h-48 object-cover"
          />
          <Badge className="absolute top-2 right-2 bg-black bg-opacity-50 text-white">
            {info.overview.propertyType}
          </Badge>
        </div>
        <div className="p-4 ">
          <div className="flex items-center gap-2 mb-4 h-6">
            <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0" />
            <span className="text-sm text-gray-700 truncate">
              {info.location.address.street}, {info.location.address.city}
            </span>
            <span className="text-sm text-gray-700 truncate">
              • {info.roommates.length}{" "}
              {info.roommates.length > 1 ? "roommates" : "roommate"}
            </span>
          </div>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mb-4">
            <div className="flex items-center">
              <DollarSign className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
              <div>
                <p className="font-semibold">₪{info.financials.rent}/mo</p>
                <p className="text-xs text-gray-500">
                  Security: ₪{info.financials.securityDeposit}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <Users className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" />
              <div>
                <p className="font-semibold">
                  {info.specifications.bedrooms} bed •{" "}
                  {info.specifications.bathrooms} bath
                </p>
                <p className="text-xs text-gray-500">
                  {info.specifications.size} sq m
                </p>
              </div>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="flex flex-col h-full gap-8 justify-between">
            <div className="flex flex-wrap gap-2 max-h-20">
              {Object.entries(amenities)
                .slice(0, 2)
                .flatMap(([category, items]) =>
                  items.slice(0, 2).map((item) => (
                    <Badge key={item} variant="outline" className="text-xs">
                      {item}
                    </Badge>
                  ))
                )}
              <Badge variant="outline" className="text-xs">
                +{Object.values(amenities).flat().length - 4} more
              </Badge>
            </div>
            <p className="text-sm text-gray-700 line-clamp-2 h-10">
              {info.overview.description}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 p-4 ">
        <div className="flex flex-col lg:flex-row lg:justify-between items-center w-full text-sm">
          <div className="flex gap-1 items-center">
            <Calendar className="w-4 h-4 text-gray-500 flex-shrink-0" />
            <span className="truncate">
              Available from -{" "}
              {format(new Date(info.leaseTerms.availableFrom), "d MMM, yyyy")}
            </span>
          </div>
          <DrawerDialogDemo>
            <ApartmentProfileDisplay profile={apartment} />
          </DrawerDialogDemo>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ApartmentPreviewCard;
