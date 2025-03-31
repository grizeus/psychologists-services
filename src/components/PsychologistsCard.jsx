import { useState } from "react";
import sprite from "src/assets/icons/sprite.svg";
const PsychologistCard = ({ doctor }) => {
  const [isOpen, setIsOpen] = useState(false);

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
          <h2 className="text-2xl  leading-6 font-medium text-gray-800">
            {doctor.name}
          </h2>
        </div>
        <div className="ml-auto inline-flex items-center justify-center gap-4 self-start text-base leading-6 font-medium">
          <div className="flex items-center gap-2">
            <svg className="size-4">
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
            <button type="button" className="group focus:outline-none">
              <svg
                className="group-hover:stroke-sun group-focus:stroke-sun fill-transparent stroke-current transition-colors duration-300 ease-in-out"
                width={26}
                height={26}>
                <use href={`${sprite}#icon-outline-fav`}></use>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="ml-36 -mt-9.5">
        <ul className=" flex flex-col gap-2 leading-normal">
          <ul className="flex gap-1">
            <li className="bg-smoke rounded-3xl px-4 py-2">
              <span className="text-goose">Experience :</span>{" "}
              {doctor.experience}
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
        {!isOpen && (
          <button
            className="mt-3.5 text-base leading-normal font-medium underline transition-discrete duration-300 ease-in-out hover:no-underline focus:no-underline focus:outline-none"
            onClick={() => setIsOpen(true)}>
            Read more
          </button>
        )}
        {isOpen &&
          Array.isArray(doctor?.reviews) &&
          doctor.reviews.length > 0 && (
            <>
              <ul className="mt-12 mb-10 flex flex-col gap-6">
                {doctor.reviews.map((review, i) => (
                  <li key={`${doctor.id}-${i}`} className="">
                    <div className="mb-4 flex gap-3">
                      <div className="bg-sun/20 text-sun flex size-11 items-center justify-center rounded-full text-xl leading-none font-medium">
                        {review.reviewer.at(0).toUpperCase()}
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="leading-tight font-medium">
                          {review.reviewer}
                        </span>
                        <div className="flex gap-2">
                          <svg className="size-4">
                            <use href={`${sprite}#icon-star`}></use>
                          </svg>
                          <span className="text-sm leading-4.5">
                            {review.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className="text-waterloo/50">{review.comment}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="bg-sun hover:bg-sunset text-snow focus:bg-sunset rounded-[30px] px-10 py-3.5 transition-colors duration-300 ease-in-out focus:outline-none">
                Make an appointment
              </button>
            </>
          )}
      </div>
    </li>
  );
};

export default PsychologistCard;
