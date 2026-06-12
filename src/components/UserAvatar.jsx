import profileImage from "../assets/profile-avatar.webp";

function UserAvatar({ className = "", imageClassName = "" }) {
  return (
    <span
      className={`inline-flex overflow-hidden rounded-full bg-white ${className}`.trim()}
    >
      <img
        src={profileImage}
        alt=""
        aria-hidden="true"
        className={`h-full w-full object-cover object-center ${imageClassName}`.trim()}
      />
    </span>
  );
}

export default UserAvatar;
