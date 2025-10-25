import CureIcon from "@/components/common/CureIcon";
import { Link } from "react-router-dom";

function LogoLink() {
    return (
        <Link
            to="/"
            className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer"
        >
            <CureIcon color="primary" />
        </Link>
    );
}

export default LogoLink;
