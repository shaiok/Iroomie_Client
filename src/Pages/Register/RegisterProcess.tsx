import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import  {auth}  from "../../lib/http";
import UserTypeForm from "./UserTypeForm";
import QuestionnaireForm from "./QuestionnaireForm";
import RoommateProfileForm from "./RoommateProfileForm";
import ApartmentProfileForm from "./ApartmentProfileForm";
import { IRoommate, IApartment, IQuestion } from "../../lib/interfaces";


type FormDataType = {
  userType: "roommate" | "apartment" | "";
  questionnaire: IQuestion | {};
  profile: Partial<IRoommate | IApartment>;
};

type Step = {
  id: number;
  component: React.ComponentType<{ onSubmit: (data: any) => void }>;
  onSubmit: (data: any) => void;
};

const CompleteRegistration : React.FC = () => {
  const [formData, setFormData] = useState<FormDataType>({
    userType: "",
    questionnaire: {},
    profile: {},
  });
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isReadyToSubmit, setIsReadyToSubmit] = useState<boolean>(false);
  const navigate = useNavigate();

  const completeRegistrationMutation = useMutation<void, Error, FormData>({
    mutationFn: async (data: FormData) =>
      formData.userType === "roommate"
        ? auth.completeRoommateRegistration(data)
        : auth.completeApartmentRegistration(data),
    onSuccess: () => {
      console.log("Registration completed successfully");
      navigate("/");
    },
    onError: (error) => {
      console.error("Registration completion error:", error);
    },
  });
  
  

  useEffect(() => {
    if (isReadyToSubmit) {
      const finalFormData = new FormData();
      finalFormData.append("questionnaireAnswers", JSON.stringify(formData.questionnaire));

      if (formData.userType === "roommate" && "personalInfo" in formData.profile) {
        finalFormData.append("personalInfo", JSON.stringify(formData.profile.personalInfo));
        finalFormData.append("interests", JSON.stringify(formData.profile.interests));
        finalFormData.append("social", JSON.stringify(formData.profile.social));

        if (formData.profile.social?.profileImage) {
          
            finalFormData.append(`images`, formData.profile.social.profileImage);

        }
      } else if (formData.userType === "apartment" && "info" in formData.profile) {
        finalFormData.append("info", JSON.stringify(formData.profile.info));
        finalFormData.append("amenities", JSON.stringify(formData.profile.amenities));
        finalFormData.append("details", JSON.stringify(formData.profile.details));

        if (formData.profile.info?.images && formData.profile.info.images.length > 0) {
          formData.profile.info.images.forEach((file) => {
            finalFormData.append("images", file);
          });
        }
      }

      completeRegistrationMutation.mutate(finalFormData);
    }
  }, [isReadyToSubmit, formData]);

  const steps:Step[] = [
    {
      id: 1,
      component: UserTypeForm,
      onSubmit: (type: "roommate" | "apartment") => {
        setFormData((prev) => ({ ...prev, userType: type }));
        setCurrentStep(2);
      },
    },
    {
      id: 2,
      component: QuestionnaireForm,
      onSubmit: (answers: IQuestion) => {
        setFormData((prev) => ({ ...prev, questionnaire: answers }));
        setCurrentStep(3);
      },
    },
    {
      id: 3,
      component: (props) =>
        formData.userType === "roommate" ? (
          <RoommateProfileForm {...props} />
        ) : (
          <ApartmentProfileForm {...props} />
        ),
      onSubmit: (profileData: Partial<IRoommate | IApartment>) => {
        setFormData((prev) => ({ ...prev, profile: profileData }));
        setIsReadyToSubmit(true);
      },
    },
  ];

  const handleStepComplete = (stepData: any) => {
    const currentStepObj = steps.find((step) => step.id === currentStep);
    if (currentStepObj?.onSubmit) {
      currentStepObj.onSubmit(stepData);
    } else {
      console.error("Invalid step or missing onSubmit handler");
    }
  };

  const CurrentStepComponent = steps.find((step) => step.id === currentStep)?.component;

  return (
    <div>
      {currentStep <= 3 && CurrentStepComponent && (
        <CurrentStepComponent onSubmit={handleStepComplete} />
      )}

      {completeRegistrationMutation.isPending && <div>Submitting...</div>}
      {completeRegistrationMutation.isError && (
        <div>Error submitting registration. Please try again.</div>
      )}
    </div>
  );
};

export default CompleteRegistration;