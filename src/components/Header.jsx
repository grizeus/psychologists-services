import useStore from "../zustand/store";
import AuthBar from "./AuthBar";
import NavBar from "./NavBar";
import UserBar from "./UserBar";

const Header = () => {
  const user = useStore(state => state.user);
  return (
    <header className="border-waterloo/10 w-full border-b">
      <div className="mx-auto flex max-w-360 items-center justify-between px-32 py-6 sm:min-w-80">
        <p className="text-xl leading-6 font-bold tracking-tight">
          <span className="text-sun">psychologists</span>
          <span className="font-medium">.</span>
          <span className="font-semibold">services</span>
        </p>

        <NavBar />
        {user ? <UserBar /> : <AuthBar />}
      </div>
    </header>
  );
};

export default Header;
