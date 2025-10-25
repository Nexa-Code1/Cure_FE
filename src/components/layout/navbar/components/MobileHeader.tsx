import LogoLink from "./LogoLink";
import SearchNavbar from "./SearchNavbar";
import UserInfo from "./UserInfo";

function MobileHeader() {
    return (
        <div className="md:hidden bg-white px-4 py-3 border-b">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <UserInfo />
                </div>
                <LogoLink />
            </div>
            <SearchNavbar />
        </div>
    );
}

export default MobileHeader;
