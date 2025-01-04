import React, { useState, ChangeEvent } from "react";
import {
  User,
  Instagram,
  Facebook,
} from "lucide-react";

import { IRoommate } from "../../lib/interfaces";
import ProfilePictureUpload from "../../components/Coustom/ProfilePictureUpload";
import InputWithLabel from "../../components/Coustom/inputWithLabel";
import LocationCombobox from "../../components/Coustom/locationCombobox";

interface RoommateProfileFormProps {
  onSubmit: (profile: Partial<IRoommate>) => void;
  initialData?: Partial<IRoommate>;
}

interface Location {
  address: string;
  position: [number, number];
}

const RoommateProfileForm: React.FC<RoommateProfileFormProps> = ({
  onSubmit,
  initialData = {},
}) => {
  const [profile, setProfile] = useState<Partial<IRoommate>>({
    personalInfo: {
      name: initialData.personalInfo?.name || "",
      age: initialData.personalInfo?.age || undefined,
      gender: initialData.personalInfo?.gender || "",
      occupation: initialData.personalInfo?.occupation || "",
      education: initialData.personalInfo?.education || "",
      hometown: initialData.personalInfo?.hometown || "",
    },
    interests: {
      hobbies: initialData.interests?.hobbies || [],
      music: initialData.interests?.music || [],
      movies: initialData.interests?.movies || [],
      sports: initialData.interests?.sports || [],
    },
    social: {
      bio: initialData.social?.bio || "",
      profileImage: initialData.social?.profileImage || "",
      socialMedia: {
        facebook: initialData.social?.socialMedia?.facebook || "",
        instagram: initialData.social?.socialMedia?.instagram || "",
      },
    },
  });

  const handleInputChange = <T extends keyof IRoommate>(
    section: T,
    field: keyof NonNullable<IRoommate[T]>,
    value: any
  ) => {
    setProfile((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section] as Record<string, any>), // Assert as an object
        [field]: value,
      },
    }));
  };

  const handleNestedInputChange = <T extends keyof IRoommate>(
    section: T,
    nestedField: keyof NonNullable<IRoommate[T]>,
    field: string,
    value: any
  ) => {
    setProfile((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section] as Record<string, any>), // Default section to empty object
        [nestedField]: {
          ...((prev[section] as any)?.[nestedField] || {}), // Default nestedField to empty object
          [field]: value,
        },
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(profile);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="font-sans flex flex-col gap-6 sm:gap-8"
    >
      <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-500">
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
          <ProfilePictureUpload
            currentImage={profile.social?.profileImage || ""}
            onChange={(file: any) =>
              handleInputChange("social", "profileImage", file)
            }
          />
        </div>
      </div>

      <div className="p-2">
        <div className="grid lg:grid-cols-4 grid-cols-2 mt-4 gap-2 items-center">
          <InputWithLabel
            type="text"
            id="name"
            label="Name"
            icon={<User />}
            value={profile.personalInfo?.name || ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange("personalInfo", "name", e.target.value)
            }
          />
          <LocationCombobox
            label="Hometown"
            placeholder="Enter a location"
            onChange={(location: Location | null) =>
              location &&
              handleInputChange("personalInfo", "hometown", location.address)
            }
          />
          <InputWithLabel
            icon={<Facebook />}
            type="text"
            id="facebook"
            label="Facebook"
            value={profile.social?.socialMedia?.facebook || ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleNestedInputChange(
                "social",
                "socialMedia",
                "facebook",
                e.target.value
              )
            }
          />
          <InputWithLabel
            icon={<Instagram />}
            type="text"
            id="instagram"
            label="Instagram"
            value={profile.social?.socialMedia?.instagram || ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleNestedInputChange(
                "social",
                "socialMedia",
                "instagram",
                e.target.value
              )
            }
          />
        </div>

        {/* More fields go here, as in your original code */}
      </div>

      <div className="flex justify-center mt-8">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Submit Profile
        </button>
      </div>
    </form>
  );
};

export default RoommateProfileForm;