const AuthBar = () => {
  return (
    <ul className="flex gap-2 leading-tight font-medium">
      <li>
        <button
          type="button"
          className="border-waterloo/20 focus:bg-sunset focus:border-sunset hover:bg-sunset focus:text-snow hover:text-snow hover:border-sunset rounded-3xlg border px-10 py-3.5 transition-colors duration-300 ease-in-out focus:outline-none">
          Log In
        </button>
      </li>
      <li>
        <button
          type="button"
          className="bg-sun hover:bg-sunset text-snow focus:bg-sunset rounded-3xlg px-10 py-3.5 transition-colors duration-300 ease-in-out focus:outline-none">
          Registration
        </button>
      </li>
    </ul>
  );
};

export default AuthBar;
