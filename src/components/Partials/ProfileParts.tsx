import roleIdConverter from "../Helpers/roleIdConverter";

//TYPE
import type { ProfileType } from "../Types/profile_type";

//STATE
import { useState } from "react";

interface ProfilePropTypes {
  profileInfo: ProfileType;
  editable: boolean;
}

export default function ProfileParts({
  profileInfo,
  editable,
}: ProfilePropTypes) {
  const { userData, userProfile } = profileInfo;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 mt-10">
      <div
        className={
          "rounded-xl shadow-2xl max-w-4xl w-full p-8 transition-all duration-300 animate-fade-in"
        }
        style={{ backgroundColor: userProfile.color || "#1F2937" }}
      >
        <div className="flex flex-col md:flex-row">
          <ProfileTop userData={userData} editable={editable} />
          <ProfileMain userProfile={userProfile} />
        </div>
      </div>
    </div>
  );
}

export function ProfileTop({
  userData,
  editable,
}: {
  userData: ProfileType["userData"];
  editable: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const shareUrl =
    "https://www.vandbruno.net/" + "profile/" + userData.username;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="md:w-1/3 text-center mb-8 md:mb-0">
      <img
        src={userData.avatarUrl}
        alt={userData.fullname + "'s profile picture"}
        className="rounded-full w-48 h-48 mx-auto mb-4 border-4 border-indigo-800 dark:border-blue-900 transition-transform duration-300 hover:scale-105"
      />
      <h1 className="text-2xl font-bold text-indigo-800 dark:text-white mb-2">
        {userData.fullname}
      </h1>
      <p className="text-gray-600 dark:text-gray-300">
        {roleIdConverter(userData.roleId)}
      </p>
      <div className="mt-5">
        {editable ? (
          <a
            className="bg-indigo-800 text-white px-4 py-3 rounded-lg hover:bg-blue-900 transition-colors duration-300 hover:cursor-pointer"
            href="/profile/edit"
          >
            Edit Profile
          </a>
        ) : (
          <button
            className={`px-4 py-3 rounded-lg border transition-colors duration-300 ${
              copied
                ? "bg-green-100 text-green-800 border-green-800"
                : "bg-gray-100 text-indigo-800 border-indigo-800 hover:bg-white"
            }`}
            onClick={copyToClipboard}
          >
            {copied ? "Copied!" : "Copy Profile Link"}
          </button>
        )}
      </div>
    </div>
  );
}

export function ProfileMain({
  userProfile,
}: {
  userProfile: ProfileType["userProfile"];
}) {
  return (
    <div className="md:w-2/3 md:pl-8">
      {userProfile.profileTitle && (
        <h2 className="text-xl text-center underline font-semibold text-indigo-800 dark:text-white mb-4">
          {userProfile.profileTitle}
        </h2>
      )}

      <Section title="Bio">
        <p>{userProfile.bio ?? "This user has not written their bio yet."}</p>
      </Section>

      <Section title="Links">
        <ProfileLinks userProfile={userProfile} />
      </Section>

      <Section title="Contact Information">
        <ul className="space-y-2">
          <li className="flex items-center">
            <PhoneIcon />
            {userProfile.mobileNumber ??
              "This user has not shared their mobile number"}
          </li>
        </ul>
      </Section>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-indigo-800 dark:text-white mb-4">
        {title}
      </h2>
      <div className="text-gray-700 dark:text-gray-300">{children}</div>
    </div>
  );
}

function ProfileLinks({
  userProfile,
}: {
  userProfile: ProfileType["userProfile"];
}) {
  const links = [
    { name: "LinkedIn", url: userProfile.linkedinUrl },
    { name: "Instagram", url: userProfile.instagramUrl },
    {
      name: userProfile.additionalUrlName ?? "Website",
      url: userProfile.additionalUrl,
    },
  ].filter((link) => link.url);

  if (links.length === 0) return <p>This user hasn’t added any links.</p>;

  return (
    <div className="flex flex-wrap gap-2">
      {links.map((link) => (
        <a
          key={link.name}
          className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm"
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.name}
        </a>
      ))}
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 mr-2 text-indigo-800 dark:text-blue-900"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
    </svg>
  );
}
