import UserAvatar from "./UserAvatar";
import UserInfo from "./UserInfo";

function UserProfileCard({
  user,
}) {
  if (!user) return null;

  return (
    <div
      className="
        flex
        items-center
        gap-3
      "
    >
      <UserAvatar
        photoURL={user.photoURL}
        displayName={user.displayName}
      />

      <UserInfo
        displayName={user.displayName}
        email={user.email}
      />
    </div>
  );
}

export default UserProfileCard;