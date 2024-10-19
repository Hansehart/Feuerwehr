import React from "react";
import MobileBody from "../../components/mobile/basics/MobileBody";
import MobileHeader from "../../components/mobile/basics/MobileHeader";
import MobileNavBar from "../../components/mobile/basics/MobileNavBar";
import MobileInfoFooter from "../../components/mobile/basics/MobileInfoFooter";
import { useNavbar } from "../../hooks/useNavbar";

interface LicenseInfo {
  title: string;
  description: string;
  linkText?: string;
  linkUrl?: string;
  postText?: string;
}

const licenseData: LicenseInfo[] = [
  {
    title: "React",
    description: "React wird unter der",
    linkText: "MIT-Lizenz",
    linkUrl: "https://github.com/facebook/react/blob/main/LICENSE",
    postText: "verwendet."
  },
  {
    title: "React Router",
    description: "React Router wird unter der",
    linkText: "MIT-Lizenz",
    linkUrl: "https://github.com/remix-run/react-router/blob/main/LICENSE.md",
    postText: "verwendet."
  },
  {
    title: "Lucide React",
    description: "Lucide React wird unter der",
    linkText: "ISC-Lizenz",
    linkUrl: "https://github.com/lucide-icons/lucide/blob/main/LICENSE",
    postText: "verwendet."
  },
  {
    title: "Tailwind CSS",
    description: "Tailwind CSS wird unter der",
    linkText: "MIT-Lizenz",
    linkUrl: "https://github.com/tailwindlabs/tailwindcss/blob/master/LICENSE",
    postText: "verwendet."
  },
  {
    title: "OpenAI-Java",
    description: "OpenAI-Java wird unter der",
    linkText: "MIT-Lizenz",
    linkUrl: "https://github.com/TheoKanning/openai-java/blob/main/LICENSE",
    postText: "verwendet."
  },
  {
    title: "Envato",
    description: "Medien von Envato Elements werden unter der",
    linkText: "Envato Elements Lizenz",
    linkUrl: "https://github.com/Hansehart/Feuerwehr/tree/develop/documents/licences",
    postText: "verwendet."
  },
  {
    title: "Eigene Inhalte",
    description: "Alle von uns erstellten Inhalte, einschließlich Texte, Bilder und Grafiken, sind urheberrechtlich geschützt. Die Nutzung für nicht-kommerzielle Zwecke ist unter Angabe der Quelle gestattet."
  },
  {
    title: "Änderungen der Lizenzbedingungen",
    description: "Wir behalten uns vor, diese Lizenzinformationen bei Bedarf zu aktualisieren. Änderungen werden auf dieser Seite bekannt gegeben und treten mit der Veröffentlichung in Kraft."
  }
];

const LicenseSection: React.FC<LicenseInfo> = ({ title, description, linkText, linkUrl, postText }) => (
  <section className="flex flex-col justiy-center items-center mb-8">
    <h2 className="text-2xl font-semibold text-gray-900 mb-4">{title}</h2>
    <p className="text-gray-700">
      {description}
      {linkText && linkUrl && (
        <a href={linkUrl} className="underline mx-1">
          {linkText}
        </a>
      )}
      {postText}
    </p>
  </section>
);

const LicenseContent: React.FC = () => {
  return (
    <div className="w-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Lizenzen</h1>
          {licenseData.map((license, index) => (
            <LicenseSection key={index} {...license} />
          ))}
        </div>
      </div>
    </div>
  );
};

const License: React.FC = () => {
  const { changeView } = useNavbar();

  return (
    <div>
      <MobileHeader name="Infopoint" link="/info" />
      <MobileBody fullscreen={<LicenseContent />} />
      <MobileNavBar changeView={changeView} preset="" />
      <MobileInfoFooter />
    </div>
  );
}

export default License;