import { Users, DollarSign, Calendar, MapPin } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import MapContent from "../../components/Coustom/MapContent";
import { Marker, Popup } from "react-leaflet";
import { format } from "date-fns";
import AnswersDrawer from "../../components/Coustom/answersDrawer";
import DetailItem from "../../components/Coustom/detailItem";
import IconLabel from "../../components/Coustom/iconLabel";
import ImageGallery from "../../components/Coustom/imageGallery";
import { IApartment } from "../../lib/interfaces";

// Use the IApartment interface directly for the profile prop
interface ApartmentProfileDisplayProps {
  profile: IApartment;
  myAnswers: any;
  score: any;
  editHeader?: () => JSX.Element;
  myProfile: any;
}

export default function ApartmentProfileDisplay({
  profile,
  myAnswers,
  score,
  editHeader,
  myProfile
}: ApartmentProfileDisplayProps) {
  return (
    <div className="mx-auto p-2 sm:p-4 font-sans flex flex-col gap-6 sm:gap-8">
      <ImageGallery images={profile.info?.images || []} />
      {editHeader && editHeader()}

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Badge className="text-xs sm:text-sm bg-blue-50 text-blue-900 px-2">
            <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            {profile.info?.location?.address?.city || "City not available"},{" "}
            {profile.info?.location?.address?.street || "Street not available"}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12">
        <div className="lg:col-span-2 flex flex-col gap-6 sm:gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl sm:text-2xl font-semibold">
              {profile.info?.overview?.propertyType || "Property Type not available"}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              {profile.info?.specifications?.bedrooms ?? "N/A"} bedrooms ·{" "}
              {profile.info?.specifications?.bathrooms ?? "N/A"} bathrooms ·{" "}
              {profile.info?.specifications?.size ?? "N/A"} sq m
            </p>
          </div>

          <Separator />

          <div className="flex flex-col gap-2">
            <h2 className="text-xl sm:text-2xl font-semibold">
              About this space
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              {profile.info?.overview?.description || "Description not available"}
            </p>
          </div>

          <Separator />

          <div className="flex flex-col gap-4">
            <h2 className="text-xl sm:text-2xl font-semibold">Location</h2>
            <p className="text-gray-600 text-sm sm:text-base">
              {profile.info?.location?.address?.street || "Street not available"},{" "}
              {profile.info?.location?.address?.city || "City not available"}
            </p>
            <div className="rounded-xl overflow-hidden w-full h-80">
              <MapContent
                center={profile.info?.location?.coordinates || [0, 0]}
                zoom={15}
              >
                <Marker
                  position={profile.info?.location?.coordinates || [0, 0]}
                >
                  <Popup>
                    {profile.info?.overview?.title || "Title not available"}
                    <br />
                    {profile.info?.location?.address?.street || "Street not available"},{" "}
                    {profile.info?.location?.address?.city || "City not available"}
                  </Popup>
                </Marker>
              </MapContent>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold">Nearby Places</h3>
              <div className="flex flex-wrap gap-2">
                {profile.info?.location?.nearbyPlaces?.map((place, index) => (
                  <Badge
                    key={index}
                    className="text-xs sm:text-sm bg-blue-50 text-blue-700"
                  >
                    {place}
                  </Badge>
                )) || "No nearby places available"}
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex flex-col gap-4">
            <h2 className="text-xl sm:text-2xl font-semibold">
              What this place offers
            </h2>
            <Accordion
              type="multiple"
              className="w-full"
              defaultValue={[
                "general",
                "kitchen",
                "bathroom",
                "bedroom",
                "outdoor",
                "entertainment",
                "safety",
              ]}
            >
              {Object.entries(profile.amenities || {}).map(
                ([category, items], index) => (
                  <AccordionItem value={category} key={index}>
                    <AccordionTrigger className="text-sm sm:text-base">
                      {category}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-wrap gap-2">
                        {(items as string[]).map((item, idx) => (
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
              {Object.entries(profile.details || {}).map(([key, value]) => (
                <DetailItem key={key} label={key} value={value} />
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-8 flex flex-col gap-4">
            <Card>
              <CardHeader>
                <CardTitle>
                  <span className="text-xl sm:text-2xl font-semibold">
                    ₪{profile.info?.financials?.rent ?? "N/A"}
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
                      new Date(profile.info?.leaseTerms?.availableFrom || ""),
                      "d MMM, yyyy"
                    )}
                  />
                  <IconLabel
                    icon={Users}
                    label="Total Capacity"
                    value={profile.info?.overview?.totalCapacity ?? "N/A"}
                  />
                  <IconLabel
                    icon={Calendar}
                    label="Min. lease"
                    value={`${profile.info?.leaseTerms?.leaseDuration ?? "N/A"} months`}
                  />
                  <IconLabel
                    icon={DollarSign}
                    label="Security Deposit"
                    value={`₪${profile.info?.financials?.securityDeposit ?? "N/A"}`}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <AnswersDrawer
        name={"Apartments"}
        myAnswers={myAnswers}
        otherAnswers={profile.questionnaire || {}}
        score={score}
        myProfile={myProfile}
      />
    </div>
  );
}
