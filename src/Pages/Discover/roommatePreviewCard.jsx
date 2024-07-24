import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Briefcase,
  GraduationCap,
  Music,
  Film,
  Gamepad2,
  User,
  Calendar,
  ArrowRight,
} from "lucide-react";

const RoommatePreviewCard = ({ roommate }) => {
  const { personalInfo, social, interests, questions } = roommate;

  const allInterests = [
    ...interests.hobbies,
    ...interests.sports,
    ...interests.music,
    ...interests.movies,
  ];


  return (
    <Card className="w-full max-w-md hover:shadow-lg transition-shadow duration-300 rounded-xl overflow-auto  ">
      <CardContent className="p-0 ">
        <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-500">
          <div className="absolute bottom-0 left-0 p-4 flex items-end">
            <Avatar className="w-24 h-24 border-4 border-white">
              <AvatarImage
                src={social.profileImage}
                className="object-cover"
                alt={personalInfo.name}
              />
              <AvatarFallback>{personalInfo.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="ml-4 mb-1">
              <h3 className="text-2xl font-bold text-white">
                {personalInfo.name}
              </h3>
              <p className="text-sm text-gray-200">
                {personalInfo.age} years • {personalInfo.gender}
              </p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary" className="flex items-center space-x-1">
              <MapPin className="w-3 h-3" />
              <span>{personalInfo.hometown}</span>
            </Badge>
            <Badge variant="secondary" className="flex items-center space-x-1">
              <Briefcase className="w-3 h-3" />
              <span>{personalInfo.occupation}</span>
            </Badge>
            <Badge variant="secondary" className="flex items-center space-x-1">
              <GraduationCap className="w-3 h-3" />
              <span>{personalInfo.education}</span>
            </Badge>
          </div>
          <p className="text-sm text-gray-700 line-clamp-2 mb-4">
            {social.bio}
          </p>
          <Separator className="my-4" />

          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {allInterests.slice(0,4).map((interest, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {interest}
                </Badge>
              ))}
              {allInterests.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{allInterests.length - 4} more
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 p-4 ">
        <div className="flex justify-between items-center w-full text-sm">
          <span className="text-gray-500">Joined 3 months ago</span>
          <span className="text-blue-600 hover:underline cursor-pointer flex items-center">
            View Full Profile
            <ArrowRight className="w-4 h-4 ml-1" />
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default RoommatePreviewCard;
