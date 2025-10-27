import { Avatar, AvatarImage } from "@/components/ui/avatar";
import userPlaceholderImg from "@/assets/images/user-placeholder.png";

type UserAvatarProps = {
  image?: string;
};

function UserAvatar({ image }: UserAvatarProps) {
  return (
    <Avatar className="w-full h-full rounded-full overflow-hidden">
      <AvatarImage
        src={image || userPlaceholderImg}
        className="w-full h-full object-cover"
        onError={() => (image = userPlaceholderImg)}
      />
    </Avatar>
  );
}

export default UserAvatar;
