function UserAvatar({
  photoURL,
  displayName,
  size = 44,
}) {
  return (
    <img
      src={
        photoURL ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
          displayName || "User"
        )}&background=2563eb&color=ffffff`
      }
      alt={displayName || "User"}
      style={{
        width: size,
        height: size,
      }}
      className="
        rounded-full
        object-cover
        shrink-0
        border-2
        border-slate-200
      "
    />
  );
}

export default UserAvatar;