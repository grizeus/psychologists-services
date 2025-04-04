import { useState } from "react";
import Modal from "./Modal";
import SignInForm from "./SignInForm";
import Button from "./Button";
import SignUpForm from "./SignUpForm";

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
          <Button
            label="Registration"
            type="button"
            onClick={() => setIsOpenReg(true)}
            className={"px-10 py-3.5"}
          />
        </li>
      </ul>
      {isOpenLogIn && (
        <Modal onClose={handleCloseLogIn}>
          <SignInForm onSuccess={handleCloseLogIn} />
        </Modal>
      )}
      {isOpenReg && (
        <Modal onClose={handleCloseReg}>
          <SignUpForm onSuccess={handleCloseReg} />
        </Modal>
      )}
    </>
  );
};

export default AuthBar;
