import sprite from "src/assets/icons/sprite.svg";

const UserBar = () => {
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
        <div className="bg-neon-green flex size-10 items-center justify-center rounded-[10px]">
           <svg className="fill-snow size-6" >
                      <use href={`${sprite}#icon-avatar`}></use>
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
