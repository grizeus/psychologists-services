import React from "react";
import sprite from "src/assets/icons/sprite.svg";
const PsychologistCard = ({ doctor }) => {
  return (
    <li className="bg-snow max-w-296 rounded-3xl p-6">
      <div className="flex gap-6">
        <div className="border-sun/20 relative flex size-30 items-center justify-center rounded-[30px] border-2">
          <div className="size-24 overflow-hidden rounded-[15px]">
            <img
              src={doctor.avatar_url}
              alt={doctor.name}
              className="h-full w-full object-cover"
            />
            <span className="border-snow bg-neon-green absolute top-2 right-3 size-3 rounded-full border-2"></span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-goose leading-normal">Psychologist</p>
          <h2 className="text-2xl leading-none font-medium text-gray-800">
            {doctor.name}
          </h2>
        </div>
        <div className="ml-auto inline-flex items-center justify-center gap-4 self-start text-base leading-6 font-medium">
          <div className="flex items-center gap-2">
            <svg className="size-4 fill-current">
              <use href={`${sprite}#icon-star`}></use>
            </svg>
            <span className="border-r-waterloo/20 border-r pr-4">
              Rating : {doctor.rating}
            </span>
          </div>
          <div className="flex items-center gap-7">
            <p>
              Price / 1 hour :{" "}
              <span className="text-neon-green">{doctor.price_per_hour}$</span>
            </p>
            <button type="button" className="foxus:outline-none">
              <svg
                className="hover:fill-sun hover:stroke-sun fill-transparent stroke-current transition-colors duration-300 ease-in-out"
                width={26}
                height={26}>
                <use href={`${sprite}#icon-outline-fav`}></use>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <ul className="mt-4 flex flex-col gap-2 leading-normal">
        <ul className="flex gap-1">
          <li className="bg-smoke rounded-3xl px-4 py-2">
            <span className="text-goose">Experience :</span> {doctor.experience}
          </li>
          <li className="bg-smoke rounded-3xl px-4 py-2">
            <span className="text-goose">License :</span> {doctor.license}
          </li>
        </ul>
        <ul className="flex gap-1">
          <li className="bg-smoke rounded-3xl px-4 py-2">
            <span className="text-goose">Specialization :</span>{" "}
            {doctor.specialization}
          </li>
          <li className="bg-smoke rounded-3xl px-4 py-2">
            <span className="text-goose">Initial consultation :</span>{" "}
            {doctor.initial_consultation}
          </li>
        </ul>
      </ul>

      <p className="text-waterloo/50 mt-4 leading-tight">{doctor.about}</p>
      <button className="mt-3.5 text-base leading-normal font-medium underline focus:outline-none">
        Read more
      </button>
    </li>
  );
};

export default PsychologistCard;
