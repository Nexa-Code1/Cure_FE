import { Phone, Mail, MapPin } from "lucide-react";
import GoBackButton from "../../components/common/GoBackButton";

export default function ContactUs() {
  return (
    <div className="w-full mx-auto p-4 bg-white">
      <div className="space-y-8 flex flex-col justify-center items-start">
        <div className="flex items-center w-full">
          <GoBackButton />
          <h1 className="text-xl font-semibold text-zinc-900 w-full text-center">
            Contact Us
          </h1>
        </div>

        <div className="space-y-6 px-4">
          <p className="text-gray-600 text-lg leading-relaxed">
            We are committed to processing the information in order to contact
            you and talk about your questions
          </p>
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <Phone className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-gray-700 font-medium">080 707 555-321</span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <Mail className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-gray-700 font-medium">demo@example.com</span>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 mt-1">
              <MapPin className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-gray-700 font-medium">
              <div>526 Melrose Street, Water Mill, 11976, New York</div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg mt-8">
        <div className="space-y-6">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white"
              required
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white"
              required
            />
          </div>

          <div>
            <textarea
              name="message"
              placeholder="Message"
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 resize-none bg-white"
              required
            />
          </div>

          <button
            type="button"
            title="button"
            className="w-full cursor-pointer bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
