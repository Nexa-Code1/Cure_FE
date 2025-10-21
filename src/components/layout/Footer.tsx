import { Phone, Mail, MapPin } from "lucide-react";
import FacebookImage from "../../assets/images/facebook.png";
import WhatsappImage from "../../assets/images/whatsapp.png";
import YoutubeImage from "../../assets/images/youtube.png";
import LinkedInimage from "../../assets/images/linkedin.png";
import CureIcon from "../common/CureIcon";
import MiniFooter from "../../pages/home/components/MiniFooter";
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <>
      {location.pathname === "/" && <MiniFooter />}
      <footer className="bg-slate-900 text-white pt-20 pb-12 px-6 mb-11 md:mb-0 z-30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-16 h-16 bg-transparent rounded-full flex items-center justify-center">
                  <div
                    className="w-16 h-16 text-slate-900 cursor-pointer"
                    onClick={() => navigate("/")}
                  >
                    <CureIcon color="secondary" />
                  </div>
                </div>
                <span className="text-xl font-semibold">Cure</span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                Cure helps you find trusted doctors, book appointments, and
                manage your health—quickly and easily.
              </p>

              {/* Social Media Icons */}
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center hover:scale-110 transition-colors cursor-pointer">
                  <img src={FacebookImage} alt="faceBook" className="w-6 h-6" />
                </div>
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center hover:scale-110  transition-colors cursor-pointer">
                  <img src={WhatsappImage} alt="whatsapp" className="w-6 h-6" />
                </div>
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center hover:scale-110 transition-colors cursor-pointer">
                  <img src={YoutubeImage} alt="youtube" className="w-6 h-6" />
                </div>
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center hover:scale-110 transition-colors cursor-pointer">
                  <img src={LinkedInimage} alt="linkedIn" className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Company Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/"
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/search"
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    Doctors
                  </Link>
                </li>
                <li>
                  <Link
                    to="/faqs"
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact-us"
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/contact-us"
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    How it Works
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone size={18} className="text-white mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-300 text-sm">Phone</p>
                    <Link
                      to="tel:080707555321"
                      className="text-white text-sm hover:underline"
                    >
                      080 707 555-321
                    </Link>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail size={18} className="text-white mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-300 text-sm">Email</p>
                    <Link
                      to="mailto:demo@example.com"
                      className="text-white text-sm hover:underline"
                    >
                      demo@example.com
                    </Link>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-white mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-300 text-sm">Address</p>
                    <Link
                      to="https://www.google.com/maps?q=526+Melrose+Street,+Water+Mill,+11976+New+York"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white text-sm hover:underline"
                    >
                      526 Melrose Street, Water Mill, 11976 New York
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white text-sm">
              ©2024 Techvio - All Right Reserved
            </p>
            <div className="flex gap-6">
              <Link
                to="/privacy"
                className="text-white  transition-colors text-sm"
              >
                Terms & Condition
              </Link>
              <span className="text-white">|</span>
              <Link
                to="/privacy"
                className="text-white  transition-colors text-sm"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
