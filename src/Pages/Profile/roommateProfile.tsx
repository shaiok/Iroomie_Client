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
} from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Separator } from "../../components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import LinkPreview from "../../components/Coustom/LinkPreview";
import AnswersDrawer from "../../components/Coustom/answersDrawer";
import { IRoommate } from "../../lib/interfaces";
// Define types for the props
interface IconLabelProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
}

const IconLabel: React.FC<IconLabelProps> = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-2 text-gray-600">
    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
    <span className="text-xs sm:text-sm">{label}: </span>
    <span className="font-semibold text-gray-900 text-xs sm:text-sm">
      {value}
    </span>
  </div>
);

interface InterestSectionProps {
  title: string;
  items: string[];
  icon: React.ElementType;
}

const InterestSection: React.FC<InterestSectionProps> = ({ title, items, icon: Icon }) => (
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
          className="text-xs sm:text-sm bg-blue-50 text-blue-900"
        >
          {item}
        </Badge>
      ))}
    </div>
  </div>
);

interface RoommateProfileDisplayProps {
  profile: IRoommate;
  myAnswers: any;
  score: number;
  editHeader?: () => JSX.Element;
  myProfile: any;
}

const RoommateProfileDisplay: React.FC<RoommateProfileDisplayProps> = ({
  profile,
  myAnswers,
  score,
  editHeader,
  myProfile,
}) => {
  
  const avatarName =
    profile.personalInfo?.name?.charAt(0)|| "name" +
      profile.personalInfo?.name?.split(" ")[1]?.charAt(0) || "Roomie";

  return (
    <div className="font-sans flex flex-col gap-6 sm:gap-8">
      <div className="relative h-48 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500">
        {editHeader && editHeader()}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 ">
          <Avatar className="w-24 h-24 sm:w-36 sm:h-36">
            <AvatarImage
              src={profile.social?.profileImage}
              className="object-cover shadow-2xl"
            />
            <AvatarFallback className="text-5xl">
              {avatarName || "Roomie"}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="flex flex-col mt-4 gap-2 items-center">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 ">
          {profile.personalInfo?.name || "Roommate"}
        </h1>

        <div className="flex justify-center gap-4">
          {profile.social?.socialMedia?.facebook && (
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
          {profile.social?.socialMedia?.instagram && (
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
        <Badge className="text-xs sm:text-sm bg-blue-50 text-blue-900 px-2">
          <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
          {profile.personalInfo?.hometown}
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:gap-12 p-4">
        <div className="flex flex-col gap-6 sm:gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl sm:text-2xl font-semibold">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-4">
              <IconLabel
                icon={User}
                label="Age"
                value={profile.personalInfo?.age || 0 } 
              />
              <IconLabel
                icon={User}
                label="Gender"
                value={profile.personalInfo?.gender || "unkown"}
              />
              <IconLabel
                icon={Briefcase}
                label="Occupation"
                value={profile.personalInfo?.occupation|| "unkown"}
              />
              <IconLabel
                icon={GraduationCap}
                label="Education"
                value={profile.personalInfo?.education|| "unkown"}
              />
            </div>
          </div>

          <Separator />

          <div className="flex flex-col gap-2">
            <h2 className="text-xl sm:text-2xl font-semibold">About Me</h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              {profile.social?.bio}
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
                    items={profile.interests?.hobbies || ["unkown"]}
                    icon={Gamepad2} title={""}                  />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="music">
                <AccordionTrigger>Music</AccordionTrigger>
                <AccordionContent>
                  <InterestSection
                    items={profile.interests?.music || ["unkown"]}
                    icon={Music} title={""}                  />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="movies">
                <AccordionTrigger>Movies</AccordionTrigger>
                <AccordionContent>
                  <InterestSection
                    items={profile.interests?.movies || ["unkown"]}
                    icon={Film || ["unkown"]} title={""}                  />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="sports">
                <AccordionTrigger>Sports</AccordionTrigger>
                <AccordionContent>
                  <InterestSection
                    items={profile.interests?.sports || ["unkown"]}
                    icon={Gamepad2} title={""}                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <AnswersDrawer
            name={profile.personalInfo?.name || "name"}
            myAnswers={myAnswers}
            otherAnswers={profile.questionnaire as  Record<string, any> }
            score={score}
            myProfile={myProfile}
          />
        </div>
      </div>
    </div>
  );
};

export default RoommateProfileDisplay;
