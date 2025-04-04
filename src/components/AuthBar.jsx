import { useState } from "react";
import Modal from "./Modal";
import SignInForm from "./SignInForm";

const AuthBar = () => {
  const [isOpenLogIn, setIsOpenLogIn] = useState(false);
  const [isOpenReg, setIsOpenReg] = useState(false);
  const handleCloseLogIn = () => {
    setIsOpenLogIn(false);
  };
  const handleCloseReg = () => {
    setIsOpenReg(false);
  };
  return (
    <>
      <ul className="flex gap-2 leading-tight font-medium">
        <li>
          <button
            type="button"
            onClick={() => setIsOpenLogIn(true)}
            className="border-waterloo/20 focus:bg-sunset focus:border-sunset hover:bg-sunset focus:text-snow hover:text-snow hover:border-sunset rounded-3xlg border px-10 py-3.5 transition-colors duration-300 ease-in-out focus:outline-none">
            Log In
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => setIsOpenReg(true)}
            className="bg-sun hover:bg-sunset text-snow focus:bg-sunset rounded-3xlg px-10 py-3.5 transition-colors duration-300 ease-in-out focus:outline-none">
            Registration
          </button>
        </li>
      </ul>
      {isOpenLogIn && (
        <Modal onClose={handleCloseLogIn}>
          <SignInForm onSuccess={handleCloseLogIn} />
        </Modal>
      )}
      {isOpenReg && (
        <Modal onClose={handleCloseReg}>
          <span className="text-waterloo text-lg"> hello modal</span>
        </Modal>
      )}
    </>
  );
};

export default AuthBar;
