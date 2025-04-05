import sprite from "src/assets/icons/sprite.svg";
import { logoutUser } from "../zustand/auth/operations";
import useStore from "../zustand/store";

const UserBar = () => {
  const user = useStore(state => state.user);
  const handleLogout = async () => {
    await logoutUser();
  };
  return  (
    <div className="flex items-center justify-center gap-7">
      <div className="flex items-center justify-center gap-3.5">
        <div className="bg-neon-green flex size-10 items-center justify-center rounded-[10px]">
          <svg className="fill-snow size-6">
            <use href={`${sprite}#icon-avatar`}></use>
          </svg>
        </div>

        <span className="inline-block w-9 overflow-hidden leading-tight font-medium tracking-tighter text-ellipsis whitespace-nowrap">
          {user?.displayName}
        </span>
      </div>
      <button
        type="button"
        className="border-waterloo/20 focus:bg-sunset focus:border-sunset focus:text-snow hover:bg-sunset hover:text-snow hover:border-sunset rounded-3xlg border bg-transparent px-10 py-4.5 leading-5 font-medium transition-colors duration-300 ease-in-out focus:outline-none"
        onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
};

export default UserBar;
