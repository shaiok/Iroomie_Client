// import React, { useState, useCallback } from "react";
// import { auth } from "@/lib/http.js";
// import { questions, questionsTest } from "@/lib/register";
// import { useMutation } from "@tanstack/react-query";

// import Signup from "./Signup";
// import UserTypeSelection from "./UserTypeSelection";
// import Questionnaire from "./Questionnaire";
// import ApartmentInformation from "./Apartment/ApartmentInformation";
// import RoommateInformation from "./Roommate/RoommateInformation";

// export default function RegistrationProcess() {
//   const [step, setStep] = useState(0);
//   const [userInfo, setUserInfo] = useState({
//     registerInfo: null,
//     userType: null,
//     questionnaireAnswers: null,
//     additionalInfo: null,
//   });

//   const { mutate, isPending, isError, error, isSuccess } = useMutation({
//     mutationFn: (data) => {
//       const formData = new FormData();
  
//       // Append JSON data
//       formData.append('data', JSON.stringify({
//         registerInfo: data.registerInfo,
//         userType: data.userType,
//         questionnaireAnswers: data.questionnaireAnswers,
//         additionalInfo: {
//           ...data.additionalInfo,
//           img: undefined // Remove img from JSON data
//         }
//       }));
  
//       // Append image files
//       if (data.additionalInfo && data.additionalInfo.img) {
//         data.additionalInfo.img.forEach((file, index) => {
//           formData.append(`images`, file);
//         });
//       }
  
      
//       if (data.userType.userType === 'apartment') {
//         console.log("Registering apartment");
//         return auth.registerApartment(formData);
//       } else {
//         return auth.registerUser(formData);
//       }
//     },
//   });
//   const handleStepSubmit = useCallback(
//     (info) => {
//       setUserInfo((prev) => {
//         const updatedInfo = { ...prev, [steps[step].key]: info };
//         if (step === steps.length - 1) {
//           console.log("Registration complete:", updatedInfo);
//           mutate(updatedInfo);
//         }
//         return updatedInfo;
//       });
//       setStep((prev) => (prev === steps.length - 1 ? prev : prev + 1));
//     },
//     [step]
//   );

//   const steps = [
//     {
//       key: "registerInfo",
//       component: (
//         <Signup
//           className="p-4 container-none"
//           onSubmit={(data) => handleStepSubmit(data)}
//         />
//       ),
//     },
//     {
//       key: "userType",
//       component: (
//         <UserTypeSelection onSubmit={(data) => handleStepSubmit(data)} />
//       ),
//     },
//     {
//       key: "questionnaireAnswers",
//       component: (
//         <Questionnaire
//           questions={questionsTest}
//           onSubmit={(data) => handleStepSubmit(data)}
//         />
//       ),
//     },

//     {
//       key: "additionalInfo",
//       component:
//         userInfo.userType?.userType === "roommate" ? (
//           <RoommateInformation onSubmit={(data) => handleStepSubmit(data)} />
//         ) : (
//           <ApartmentInformation onSubmit={(data) => handleStepSubmit(data)} />
//         ),
//     },
//   ];

//   const CurrentStep = steps[step]?.component;

//   return (
//     <div className={step !== 0 ? `container mx-auto p-4` : ""}>
//       {CurrentStep}
//       {isPending && <p>Submitting registration...</p>}
//       {isError && <p>Error: {error.message}</p>}
//       {isSuccess && <p>Registration successful!</p>}
//     </div>
//   );
// }


import React, { useState, useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { auth } from "@/lib/http.js";
import { questionsTest } from "@/lib/register";
import Signup from "./Signup";
import UserTypeSelection from "./UserTypeSelection";
import Questionnaire from "./Questionnaire";
import ApartmentInformation from "./Apartment/ApartmentInformation";
import RoommateInformation from "./Roommate/RoommateInformation";

export default function RegistrationProcess() {
  const [step, setStep] = useState(0);
  const [userInfo, setUserInfo] = useState({
    registerInfo: null,
    userType: null,
    questionnaireAnswers: null,
    additionalInfo: null,
  });

  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: async (data) => {
      const formData = new FormData();
      
      const jsonData = {
        registerInfo: data.registerInfo,
        userType: data.userType,
        questionnaireAnswers: data.questionnaireAnswers,
        additionalInfo: { ...data.additionalInfo, img: undefined }
      };
      formData.append('data', JSON.stringify(jsonData));

      if (data.additionalInfo?.img) {
        data.additionalInfo.img.forEach((file, index) => {
          formData.append(`images`, file);
        });
      }

      const registerFunction = data.userType.userType === 'apartment' 
        ? auth.registerApartment 
        : auth.registerUser;

      return registerFunction(formData);
    },
    onSuccess: (data) => {
      console.log("Registration successful:", data);
      // Handle successful registration (e.g., redirect to login page)
    },
    onError: (error) => {
      console.error("Registration failed:", error);
      // Handle registration error (e.g., show error message to user)
    }
  });

  const handleStepSubmit = useCallback(
    (info) => {
      setUserInfo((prev) => {
        const updatedInfo = { ...prev, [steps[step].key]: info };
        if (step === steps.length - 1) {
          mutate(updatedInfo);
        }
        return updatedInfo;
      });
      setStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    },
    [step, mutate]
  );

  const steps = [
    { key: "registerInfo", component: <Signup onSubmit={handleStepSubmit} /> },
    { key: "userType", component: <UserTypeSelection onSubmit={handleStepSubmit} /> },
    { key: "questionnaireAnswers", component: <Questionnaire questions={questionsTest} onSubmit={handleStepSubmit} /> },
    { 
      key: "additionalInfo", 
      component: userInfo.userType?.userType === "roommate" 
        ? <RoommateInformation onSubmit={handleStepSubmit} />
        : <ApartmentInformation onSubmit={handleStepSubmit} />
    },
  ];

  const CurrentStep = steps[step]?.component;

  return (
    <div className={step !== 0 ? `container mx-auto p-4` : ""}>
      {CurrentStep}
      {isPending && <p>Submitting registration...</p>}
      {isError && <p>Error: {error.message}</p>}
      {isSuccess && <p>Registration successful!</p>}
    </div>
  );
}