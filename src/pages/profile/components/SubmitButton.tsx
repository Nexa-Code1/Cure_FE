import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SubmitButtonProps {
    isSubmitting: boolean;
}

export function SubmitButton({ isSubmitting }: SubmitButtonProps) {
    return (
        <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-blue-600 p-6 text-sm font-medium text-white shadow-md hover:bg-blue-700 disabled:opacity-50"
        >
            {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
                "Edit Profile"
            )}
        </Button>
    );
}
