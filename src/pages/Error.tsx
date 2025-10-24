import { useNavigate, useRouteError } from "react-router-dom";
import { Button } from "@/components/ui/button";

function Error() {
  const error = useRouteError();
  const navigate = useNavigate();

  let message: string;

  if (error instanceof Error) {
    message = (error as Error).message;
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "Unknown error";
  }

  return (
    <div className="p-6 text-center w-screen h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="text-muted-foreground">{message}</p>
      <Button
        variant="outline"
        onClick={() => navigate("/")}
        className="mt-4 border-primary-100 text-primary-100 hover:text-primary-100"
      >
        Go Back to Home
      </Button>
    </div>
  );
}

export default Error;
