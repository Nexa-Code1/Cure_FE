import GoBackButton from "@/components/common/GoBackButton";

const privacyPolicyContent =
  'Privacy Policy\nEffective Date: Sep 16, 2025\n\nThis Privacy Policy explains how Tech-cell ("we", "our", "us") collects, uses, and protects your information when you use our online doctor booking platform (the "Service").\n\n1) Information We Collect\n- Personal Information: name, email, phone number.\n- Medical Information: appointment notes/medical history (if applicable).\n- Technical Data: IP address, browser, device details.\n- Payments: processed via secure gateways (we don\'t store card data).\n\n2) How We Use Information\nWe use it to manage appointments, send notifications, improve the Service, process payments, and meet legal obligations.\n\n3) Sharing Information\nWe only share with healthcare providers, payment processors, or legal authorities when required. We do not sell your data.\n\n4) Security\nWe apply industry-standard security and encryption practices.\n\n5) Your Rights\nYou can request access, correction, or deletion of your personal data.\n\n6) Cookies\nWe use cookies to enhance your experience. You can disable them in your browser.\n\n7) Third-Party Links\nWe are not responsible for the privacy practices of third-party sites.\n\n8) Children’s Privacy\nWe do not knowingly collect data from children under 13 without parental consent.\n\n9) Changes\nWe may update this policy from time to time. Please review periodically.\n\n10) Contact Us\nEmail: tech-cell@example.com\nPhone: +20 123 456 789\nAddress: Cairo, Egypt';

export const PrivacyPage = () => {
  const renderContent = (text: string) => {
    return text.split(/\n\n+/).map((block, i) => {
      if (/^\d+\)/.test(block)) {
        const [titleLine, ...rest] = block.split("\n");
        return (
          <section key={i} className="space-y-1">
            <h3 className="font-semibold text-zinc-900">{titleLine}</h3>
            <p className="text-sm leading-6 text-zinc-600">{rest.join(" ")}</p>
          </section>
        );
      }
      return (
        <p key={i} className="text-sm leading-6 text-zinc-600">
          {block}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto">
        <div className="flex items-center gap-2 pb-4">
          <GoBackButton />
          <h1 className="mx-auto text-lg sm:text-xl md:text-2xl font-semibold text-zinc-900">
            Privacy Policy
          </h1>
        </div>

        <article className="space-y-5 px-4">
          {renderContent(privacyPolicyContent)}
        </article>
      </div>
    </div>
  );
};

export default PrivacyPage;
