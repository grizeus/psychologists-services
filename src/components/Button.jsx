import clsx from "clsx";

const Button = ({
  type = "submit",
  label,
  onClick = null,
  className = null,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        "bg-sun hover:bg-sunset text-snow focus:bg-sunset rounded-3xlg flex items-center justify-center leading-5 font-medium transition-colors duration-300 ease-in-out focus:outline-none",
        className
      )}>
      {label}
    </button>
  );
};

export default Button;
