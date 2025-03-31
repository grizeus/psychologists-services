import { NavLink } from "react-router-dom";
import sprite from "src/assets/icons/sprite.svg";
const HeroButton = () => {
  return (
    <NavLink className="bg-sun hover:bg-sunset text-snow focus:bg-sunset rounded-3xlg flex items-baseline gap-4.5 px-12.5 py-4.5 text-xl leading-6 font-medium transition-colors duration-300 ease-in-out focus:outline-none">
      Get started
      <svg className="fill-current" height={17} width={15}>
        <use href={`${sprite}#icon-arrow`}></use>
      </svg>
    </NavLink>
  );
};

export default HeroButton;
