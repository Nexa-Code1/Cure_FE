import GoBackButton from "@/components/common/GoBackButton";

export function ProfileHeader() {
    return (
        <div className="flex items-center gap-2 py-3">
            <GoBackButton />
            <h1 className="mx-auto text-lg font-semibold text-zinc-900">
                Edit Profile
            </h1>
            <div className="w-9" />
        </div>
    );
}
