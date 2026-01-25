import LogoLink from "./LogoLink";
import UserInfo from "./UserInfo";

function MobileHeader() {
  return (
    <div className="md:hidden bg-white px-6 py-3 border-b">
      <div className="flex items-center justify-between">
        <LogoLink />
        <div className="flex items-center space-x-3">
          <UserInfo />
        </div>
      </div>
    </div>
  );
}

export default MobileHeader;
