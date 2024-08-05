import React, { useState, useContext } from "react";
import {
  Users,
  DollarSign,
  Calendar,
  MapPin,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { apartmentExp } from "@/lib/test";
import MapContent from "@/components/Coustom/MapContent";
import { Marker, Popup } from "react-leaflet";
import { format } from "date-fns";
import { UserContext } from "@/App";
import AnswersDrawer from "@/components/Coustom/answersDrawer";

const IconLabel = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-2 text-gray-600">
    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
    <span className="text-xs sm:text-sm">{label}: </span>
    <span className="font-semibold text-gray-900 text-xs sm:text-sm">
      {value}
    </span>
  </div>
);

const DetailItem = ({ label, value, icon: Icon }) => (
  <div className="flex items-center gap-2">
    {value ? (
      <Check className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
    ) : (
      <X className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
    )}
    <span className="text-xs sm:text-sm">{label}</span>
  </div>
);



const ImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  // Helper function to determine grid layout
  const getGridLayout = (count) => {
    if (count === 1) return 'grid-cols-1';
    if (count === 2) return 'grid-cols-2';
    if (count === 3) return 'grid-cols-2 grid-rows-2';
    return 'grid-cols-4 grid-rows-2';
  };

  return (
    <Dialog>
      {/* Mobile View */}
      <div className="block sm:hidden">
        <DialogTrigger asChild>
          <div className="relative w-full h-64 overflow-hidden rounded-lg">
            <img
              src={images[0]}
              alt="Main apartment view"
              className="w-full h-full object-cover cursor-pointer"
            />
            <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
              1 / {images.length}
            </div>
          </div>
        </DialogTrigger>
      </div>

      {/* Desktop View */}
      <div className={`hidden sm:grid ${getGridLayout(images.length)} gap-2 h-96`}>
        {images.slice(0, Math.min(5, images.length)).map((img, index) => (
          <DialogTrigger asChild key={index}>
            <div
              className={`
                cursor-pointer overflow-hidden relative
                ${index === 0 && images.length > 1 ? "row-span-2" : ""}
                ${index === 0 ? "rounded-l-xl" : ""}
                ${index === Math.min(4, images.length - 1) ? "rounded-r-xl" : ""}
              `}
            >
              <img
                src={img}
                alt={`Apartment view ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              {index === 4 && images.length > 5 && (
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">
                    +{images.length - 5} more
                  </span>
                </div>
              )}
            </div>
          </DialogTrigger>
        ))}
      </div>

      <DialogContent className="w-11/12 max-w-5xl p-0 overflow-hidden">
        <DialogHeader className="p-4">
          <DialogTitle>Apartment Gallery</DialogTitle>
        </DialogHeader>
        <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh]">
          <img
            src={images[selectedImage]}
            alt={`Apartment view ${selectedImage + 1}`}
            className="w-full h-full object-contain bg-gray-100"
          />
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75"
            onClick={prevImage}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75"
            onClick={nextImage}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full">
            {selectedImage + 1} / {images.length}
          </div>
        </div>
        <ScrollArea className="w-full mt-4">
          <div className="flex gap-2 p-4">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className={`w-20 h-20 object-cover cursor-pointer rounded-md transition-opacity duration-200 ${
                  selectedImage === index
                    ? "opacity-100 ring-2 ring-blue-500"
                    : "opacity-70 hover:opacity-100"
                }`}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};


export default function ApartmentProfileDisplay({ profile, myAnswers }) {
  const { user } = useContext(UserContext);
  if (profile === undefined) {
    profile = user.profile;
  }

  return (
    <div className="mx-auto p-2 sm:p-4 font-sans flex flex-col gap-6 sm:gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl sm:text-3xl font-semibold">
          {profile.info.overview.title}
        </h1>
        <div className="flex items-center justify-between">
          <Badge className="text-xs sm:text-sm bg-blue-50 text-blue-900 px-2">
            <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            {profile.info.location.address.city},{" "}
            {profile.info.location.address.street}
          </Badge>
        </div>
      </div>

      <ImageGallery images={profile.info.images} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12">
        <div className="lg:col-span-2 flex flex-col gap-6 sm:gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl sm:text-2xl font-semibold">
              {profile.info.overview.propertyType}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              {profile.info.specifications.bedrooms} bedrooms ·{" "}
              {profile.info.specifications.bathrooms} bathrooms ·{" "}
              {profile.info.specifications.size} sq m
            </p>
          </div>

          <Separator />

          <div className="flex flex-col gap-2">
            <h2 className="text-xl sm:text-2xl font-semibold">
              About this space
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              {profile.info.overview.description}
            </p>
          </div>

          <Separator />

          <div className="flex flex-col gap-4">
            <h2 className="text-xl sm:text-2xl font-semibold">Location</h2>
            <p className="text-gray-600 text-sm sm:text-base">
              {profile.info.location.address.street},{" "}
              {profile.info.location.address.city}
            </p>
            <div className="rounded-xl overflow-hidden w-full h-80">
              <MapContent center={profile.info.location.coordinates} zoom={15} >
                <Marker position={profile.info.location.coordinates}>
                  <Popup>
                    {profile.info.overview.title}
                    <br />
                    {profile.info.location.address.street},{" "}
                    {profile.info.location.address.city}
                  </Popup>
                </Marker>
              </MapContent>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold">Nearby Places</h3>
              <div className="flex flex-wrap gap-2">
                {profile.info.location.nearbyPlaces.map((place, index) => (
                  <Badge
                    key={index}
                    className="text-xs sm:text-sm bg-blue-50 text-blue-700"
                  >
                    {place}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex flex-col gap-4">
            <h2 className="text-xl sm:text-2xl font-semibold">
              What this place offers
            </h2>
            <Accordion type="multiple" className="w-full" 
             defaultValue={['general', 'kitchen', 'bathroom', 'bedroom', 'outdoor', 'entertainment' , 'safety']}>
              {Object.entries(profile.amenities).map(
                ([category, items], index) => (
                  <AccordionItem value={category} key={index}>
                    <AccordionTrigger className="text-sm sm:text-base">
                      {category}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-wrap gap-2">
                        {items.map((item, idx) => (
                          <Badge
                            key={idx}
                            className="text-xs sm:text-sm bg-blue-50 text-blue-900"
                          >
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )
              )}
            </Accordion>
          </div>

          <Separator />

          <div className="flex flex-col gap-4">
            <h2 className="text-xl sm:text-2xl font-semibold">
              Property Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(profile.details).map(([key, value]) => (
                <DetailItem key={key} label={key} value={value} />
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-8">

          <Card >
            <CardHeader>
              <CardTitle>
                <span className="text-xl sm:text-2xl font-semibold">
                  ₪{profile.info.financials.rent}
                </span>
                <span className="text-gray-600 text-sm sm:text-base">
                  {" "}
                  / month
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                <IconLabel
                  icon={Calendar}
                  label="Available from"
                  value={format(
                    new Date(profile.info.leaseTerms.availableFrom),
                    "d MMM, yyyy"
                  )}
                />
                <IconLabel
                  icon={Users}
                  label="Total Capacity"
                  value={profile.info.overview.totalCapacity}
                />
                <IconLabel
                  icon={Calendar}
                  label="Min. lease"
                  value={`${profile.info.leaseTerms.leaseDuration} months`}
                />
                <IconLabel
                  icon={DollarSign}
                  label="Security Deposit"
                  value={`₪${profile.info.financials.securityDeposit}`}
                />
              </div>
            </CardContent>
          </Card>
          <AnswersDrawer name={'Apartments'} myAnswers={myAnswers} otherAnswers={profile.questionnaire}  />

          </div>
        </div>
      </div>
    </div>
  );
}
