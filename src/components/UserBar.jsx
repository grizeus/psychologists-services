const UserBar = () => {
  // const sprite = import.meta.env.BASE_URL + "src/assets/icons/sprite.svg";
  const user = {
    displayName: "John",
    email: "john.doe@example.com",
  };
  const handleLogout = () => {
    // TODO: implement logout logic
    console.log("logout");
  };
  return (
    <div className="flex items-center justify-center gap-7">
      <div className="flex items-center justify-center gap-3.5">
        <div className="bg-sun flex size-10 items-center justify-center rounded-[10px]">
          <svg viewBox="0 0 24 24" className="fill-snow size-6">
            <path d="M12 4C13.0609 4 14.0783 4.42143 14.8284 5.17157C15.5786 5.92172 16 6.93913 16 8C16 9.06087 15.5786 10.0783 14.8284 10.8284C14.0783 11.5786 13.0609 12 12 12C10.9391 12 9.92172 11.5786 9.17157 10.8284C8.42143 10.0783 8 9.06087 8 8C8 6.93913 8.42143 5.92172 9.17157 5.17157C9.92172 4.42143 10.9391 4 12 4ZM12 14C16.42 14 20 15.79 20 18V20H4V18C4 15.79 7.58 14 12 14Z" />
          </svg>
        </div>

        <span className="inline-block w-9 overflow-hidden leading-tight font-medium tracking-tighter text-ellipsis whitespace-nowrap">
          {user.displayName}
        </span>
      </div>
      <button
        type="button"
        className="border-waterloo/20 hover:bg-sun hover:text-snow hover:border-sun rounded-[30px] border bg-transparent px-10 py-4.5 leading-5 font-medium transition-colors duration-300 ease-in-out"
        onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
};

export default UserBar;
