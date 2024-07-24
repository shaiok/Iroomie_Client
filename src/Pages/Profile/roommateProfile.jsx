import React, { useContext, useState } from "react";
import {
  User,
  Briefcase,
  GraduationCap,
  MapPin,
  Music,
  Film,
  Gamepad2,
  Instagram,
  Facebook,
  Pencil,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import LinkPreview from "@/components/Coustom/LinkPreview";
import QuestionAnswerSummary from "@/components/Coustom/questionAnswerSummary";
import { questions, questionsTest } from "@/lib/register";
import { useParams, useNavigate } from "react-router-dom";


const IconLabel = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-2 text-gray-600">
    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
    <span className="text-xs sm:text-sm">{label}: </span>
    <span className="font-semibold text-gray-900 text-xs sm:text-sm">
      {value}
    </span>
  </div>
);

const InterestSection = ({ title, items, icon: Icon }) => (
  <div className="flex flex-col gap-2">
    <h3 className="text-lg font-semibold flex items-center gap-2">
      <Icon className="h-5 w-5" />
      {title}
    </h3>
    <div className="flex flex-wrap gap-2">
      {items.map((item, index) => (
        <Badge
          key={index}
          variant="secondary"
          className="text-xs sm:text-sm bg-green-100 text-green-700"
        >
          {item}
        </Badge>
      ))}
    </div>
  </div>
);

export default function RoommateProfileDisplay({ profile , renderHeader}) {

  return (
    <div className=" font-sans flex flex-col gap-6 sm:gap-8">
      <div className="relative h-48 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500">
      {renderHeader && renderHeader()}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 ">
          <Avatar className="w-24 h-24 sm:w-36 sm:h-36">
            <AvatarImage
              src={profile.social.profileImage}
              className="object-cover shadow-2xl"
            />
            <AvatarFallback>
              {profile.personalInfo.name?.charAt(0) || "R"}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="flex flex-col mt-4 gap-2 items-center">
        <h1 className="text-2xl sm:text-3xl font-semibold">
          {profile.personalInfo.name || "Roommate"}
        </h1>

        <div className="flex justify-center gap-4">
          {profile.social.socialMedia.facebook && (
            <LinkPreview
              url={`https://www.facebook.com/${profile.social.socialMedia.facebook}`}
              width={300}
              height={150}
            >
              <div className="flex items-center gap-1 text-blue-600 hover:underline">
                <Facebook />
                <span>{profile.social.socialMedia.facebook}</span>
              </div>
            </LinkPreview>
          )}
          {profile.social.socialMedia.instagram && (
            <LinkPreview
              url={`https://www.instagram.com/${profile.social.socialMedia.instagram}`}
              width={300}
              height={150}
            >
              <div className="flex items-center gap-1 text-pink-600 hover:underline">
                <Instagram />
                {profile.social.socialMedia.instagram}
              </div>
            </LinkPreview>
          )}
        </div>
        <Badge className="text-xs sm:text-sm bg-green-100 text-green-700 px-2">
          <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
          {profile.personalInfo.hometown}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12 p-4 ">
        <div className="lg:col-span-2 flex flex-col gap-6 sm:gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl sm:text-2xl font-semibold">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <IconLabel
                icon={User}
                label="Age"
                value={profile.personalInfo.age}
              />
              <IconLabel
                icon={User}
                label="Gender"
                value={profile.personalInfo.gender}
              />
              <IconLabel
                icon={Briefcase}
                label="Occupation"
                value={profile.personalInfo.occupation}
              />
              <IconLabel
                icon={GraduationCap}
                label="Education"
                value={profile.personalInfo.education}
              />
            </div>
          </div>

          <Separator />

          <div className="flex flex-col gap-2">
            <h2 className="text-xl sm:text-2xl font-semibold">About Me</h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              {profile.social.bio}
            </p>
          </div>

          <Separator />

          <div className="flex flex-col gap-4">
            <h2 className="text-xl sm:text-2xl font-semibold">Interests</h2>
            <Accordion
              type="multiple"
              defaultValue={["hobbies", "music", "movies", "sports"]}
              className="w-full"
            >
              <AccordionItem value="hobbies">
                <AccordionTrigger>Hobbies</AccordionTrigger>
                <AccordionContent>
                  <InterestSection
                    items={profile.interests.hobbies}
                    icon={Gamepad2}
                  />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="music">
                <AccordionTrigger>Music</AccordionTrigger>
                <AccordionContent>
                  <InterestSection
                    items={profile.interests.music}
                    icon={Music}
                  />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="movies">
                <AccordionTrigger>Movies</AccordionTrigger>
                <AccordionContent>
                  <InterestSection
                    items={profile.interests.movies}
                    icon={Film}
                  />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="sports">
                <AccordionTrigger>Sports</AccordionTrigger>
                <AccordionContent>
                  <InterestSection
                    items={profile.interests.sports}
                    icon={Gamepad2}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        <div className="lg:col-span-1">
          <h3 className="text-2xl font-bold p-3">
            {profile.personalInfo.name.split(" ")[0]}'s Answers Summary
          </h3>

          <QuestionAnswerSummary
            questions={questions}
            userAnswers={profile.questions}
          />
        </div>
      </div>
    </div>
  );
}
