import iPhone12Pro from "../../../assets/images/iPhone 12 Pro.png";
import GooglePlay from "../../../assets/images/GooglePlay.png";
import AppStore from "../../../assets/images/AppStore.png";

export default function MiniFooter() {
  return (
    <div className="w-full relative z-40 -mb-10 text-white">
      <div className="w-[90%] lg:w-[70%] mx-auto bg-[#6894d1] flex lg:flex-row items-center justify-between py-6 lg:py-0 px-6 lg:px-12 rounded-xl">
        <div className="md:w-1/2">
          <h1 className="text-lg md:text-2xl font-semibold mb-2">
            Your Health, One Tap Away
          </h1>
          <p className="text-sm mb-8">
            Book appointments, chat with doctors, and manage your health
            anytime—right from your phone. Download the app now and stay
            connected wherever you are.
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            <img src={GooglePlay} alt="Google Play" className="w-32" />
            <img src={AppStore} alt="App Store" className="w-32" />
          </div>
        </div>
        <div className="hidden md:w-1/2 md:flex justify-center">
          <img
            src={iPhone12Pro}
            alt="App"
            className="max-h-62 object-contain"
          />
        </div>
      </div>
    </div>
  );
}
