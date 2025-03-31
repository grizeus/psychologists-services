import { NavLink } from "react-router-dom";
import sprite from "src/assets/icons/sprite.svg";
const HeroButton = () => {
  return (
    <NavLink className="bg-sun flex items-baseline gap-4.5 rounded-[30px] px-12.5 py-4.5 text-xl leading-6 font-medium text-white">
      Get started
      <svg className="fill-current" height={17} width={15}>
        <use href={`${sprite}#icon-arrow`}></use>
      </svg>
    </NavLink>
  );
};

export default HeroButton;
