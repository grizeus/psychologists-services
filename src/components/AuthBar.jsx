const AuthBar = () => {
  return (
    <ul className="flex gap-2 leading-tight font-medium">
      <li>
        <button
          type="button"
          className="border-waterloo/20 rounded-[30px] border px-10 py-3.5">
          Log In
        </button>
      </li>
      <li>
        <button
          type="button"
          className="bg-sun rounded-[30px] px-10 py-3.5 text-white">
          Registration
        </button>
      </li>
    </ul>
  );
};

export default AuthBar;
