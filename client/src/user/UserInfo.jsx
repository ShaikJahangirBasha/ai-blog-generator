function UserInfo({
  displayName,
  email,
  center = false,
}) {
  return (
    <div
      className={`overflow-hidden ${
        center ? "text-center" : ""
      }`}
    >
      <h3 className="truncate text-sm font-semibold text-slate-800">
        {displayName}
      </h3>

      <p className="truncate text-xs text-slate-500">
        {email}
      </p>
    </div>
  );
}

export default UserInfo;