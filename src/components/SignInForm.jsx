import * as Yup from "yup";
import { emailRegExp } from "../lib/utils/constants";
import { useForm } from "react-hook-form";
import { useYupValidationResolver } from "../lib/utils/validationResolver";
import { useState } from "react";
import { loginUser } from "../zustand/auth/operations";
import sprite from "src/assets/icons/sprite.svg";
import Button from "./Button";

const SignInForm = ({ onSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .matches(emailRegExp, "Email is not valid")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Your password is too short"),
  });

  const resolver = useYupValidationResolver(validationSchema);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver,
  });

  const onSubmit = async data => {
    await loginUser(data);
    onSuccess();
  };

  return (
    <div className="max-w-110">
      <div className="mb-5">
        <h3 className="mb-5 text-[40px] leading-12 font-medium">Log In</h3>
        <p className="text-waterloo/50">
          Welcome back! Please enter your credentials to access your account and
          continue your search for a psychologist.
        </p>
      </div>

      <form className="flex flex-col gap-4.5" onSubmit={handleSubmit(onSubmit)}>
        <div className="relative">
          <label htmlFor="email" className="hidden">
            Email
          </label>
          <input
            id="email"
            {...register("email")}
            placeholder="Email"
            className="border-waterloo/10 placeholder:text-waterloo w-full rounded-xl border px-4.5 py-4 text-base focus:outline-none"
          />
          {errors.email && (
            <p className="absolute right-2 bottom-0.5 text-xs text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="relative">
          <label htmlFor="password" className="hidden">
            Password
          </label>
          <input
            id="password"
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="border-waterloo/10 placeholder:text-waterloo w-full rounded-xl border px-4.5 py-4 text-base focus:outline-none"
          />
          <svg
            onClick={togglePassword}
            className="absolute top-1/2 right-4.5 -translate-y-1/2 cursor-pointer fill-transparent stroke-current"
            width={20}
            height={20}>
            <use
              href={
                showPassword ? `${sprite}#icon-eye` : `${sprite}#icon-eye-off`
              }></use>
          </svg>
          {errors.password && (
            <p className="absolute right-2 bottom-0.5 text-xs text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>
        <Button type="submit" label="Log In" className="px-12.5 py-4.5" />
      </form>
    </div>
  );
};

export default SignInForm;
