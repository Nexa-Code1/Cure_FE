import { useState } from "react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import userPlaceholderImg from "@/assets/images/user-placeholder.png";

type UserAvatarProps = {
    image?: string;
};

function UserAvatar({ image }: UserAvatarProps) {
    const [userImg, setUserImg] = useState(image || userPlaceholderImg);

    return (
        <Avatar className="w-full h-full rounded-full overflow-hidden">
            <AvatarImage
                src={userImg}
                className="w-full h-full object-cover"
                onError={() => setUserImg(userPlaceholderImg)}
            />
        </Avatar>
    );
}

export default UserAvatar;
