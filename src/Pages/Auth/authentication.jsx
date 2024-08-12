import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Boxes } from "@/components/ui/background-boxes";
import { auth } from "@/lib/http.js";
import GoogleIcon from "@mui/icons-material/Google";

export default function Authentication() {
  const { mutate } = useMutation({
    mutationFn: auth.initiateGoogleAuth,
  });
  const roommateSignIn = useMutation({
    mutationFn: auth.testRoommate,
  });
  const apartmentSignIn = useMutation({
    mutationFn: auth.testApartment,
  });

  const handleGoogleSignIn = () => {
    mutate();
  };
  const handleRoommateSignIn = () => {
    roommateSignIn.mutate();
  };
  const handleApartmentSignIn = () => {
    apartmentSignIn.mutate();
  };

  return (
    <div className="w-full lg:grid h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Create an Account</h1>
            <p className="text-balance text-muted-foreground">
              Enter your details below to create your account
            </p>
          </div>

          <Button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full bg-red-500 text-white grid grid-cols-3 hover:bg-red-400 hover:shadow-md"
          >
            <GoogleIcon className="mr-2" />
            Continue Google
          </Button>
          <Button
            type="button"
            onClick={handleRoommateSignIn}
            className="w-full bg-blue-500 text-white grid grid-cols-3 hover:bg-red-400 hover:shadow-md"
          >
            <GoogleIcon className="mr-2" />
            Login Roommate Test
          </Button>
          <Button
            type="button"
            onClick={handleApartmentSignIn}
            className="w-full bg-purple-500 text-white grid grid-cols-3 hover:bg-red-400 hover:shadow-md"
          >
            <GoogleIcon className="mr-2" />
            Login Apartment Test
          </Button>
        </div>
      </div>
      <div className="hidden bg-muted lg:flex lg:flex-col lg:justify-center lg:items-center relative overflow-hidden">
        <img
          src="src/assets/login.png"
          alt="img"
          className="h-96 w-96 object-cover z-10"
        />
        <div className="absolute inset-0 z-0">
          <Boxes className="w-full h-full" />
        </div>
      </div>
    </div>
  );
}