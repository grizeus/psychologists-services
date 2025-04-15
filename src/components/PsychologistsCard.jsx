import { useState } from "react";
import sprite from "src/assets/icons/sprite.svg";
import { toggleFavorite } from "../zustand/favorites/operations";
import useStore from "../zustand/store";
import Modal from "./Modal";
import AppoinmentForm from "./AppoinmentForm";
import Button from "./Button";

const PsychologistCard = ({ doctor }) => {
  const [formData, setFormData] = useState(null);
  const [isSuccesspen, setSuccessOpen] = useState(false);
  const [isReviewOpen, setReviewOpen] = useState(false);
  const [isAppoinmentOpen, setAppoinmentOpen] = useState(false);
  const [isCautionOpen, setCautionOpen] = useState(false);
  const user = useStore(state => state.user);
  const favs = useStore(state => state.generalFavsCollection);
  const handleToggleFavorite = async () => {
    if (user) {
      await toggleFavorite(doctor.id);
    } else {
      setCautionOpen(true);
    }
  };

  const handleSetAppointment = () => {
    if (user) {
      setAppoinmentOpen(true);
    } else {
      setCautionOpen(true);
    }
  };

  const onSuccessHandler = data => {
    setFormData(data);
    setSuccessOpen(true);
    setAppoinmentOpen(false);
  };

  return (
    <>
      <li className="bg-snow max-w-296 rounded-3xl p-6">
        <div className="flex gap-6 flex-col md:flex-row">
          {/* photo */}
          <div className="border-sun/20 rounded-3xlg relative flex size-30 shrink-0 items-center justify-center border-2">
            <div className="size-24 overflow-hidden rounded-[15px]">
              <img
                src={doctor.avatar_url}
                alt={doctor.name}
                className="h-full w-full object-cover"
              />
              <span className="border-snow bg-neon-green absolute top-2 right-3 size-3 rounded-full border-2"></span>
            </div>
          </div>
          <div className="flex w-full justify-evenly flex-col-reverse mb-2 lg:flex-row lg:justify-between">
            {/* name */}
            <div className="flex flex-col gap-2">
              <p className="text-goose leading-normal">Psychologist</p>
              <h2 className="text-lg leading-5 md:text-2xl md:leading-6 font-medium text-gray-800">
                {doctor.name}
              </h2>
            </div>
            {/* info */}
            <div className="inline-flex items-center justify-center tracking-tight text-sm gap-4 self-start md:text-base leading-6 font-medium">
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
                  <span className="text-neon-green">
                    {doctor.price_per_hour}$
                  </span>
                </p>
                <button
                  type="button"
                  className="group focus:outline-none"
                  onClick={handleToggleFavorite}>
                  {favs.some(item => item.favId === doctor.id) ? (
                    <svg
                      className="group-hover:stroke-sun group-focus:stroke-sun stroke-sun fill-sun transition-colors duration-300 ease-in-out hover:fill-transparent focus:fill-transparent"
                      width={26}
                      height={26}>
                      <use href={`${sprite}#icon-fav`}></use>
                    </svg>
                  ) : (
                    <svg
                      className="group-hover:stroke-sun group-focus:stroke-sun fill-transparent stroke-current transition-colors duration-300 ease-in-out"
                      width={26}
                      height={26}>
                      <use href={`${sprite}#icon-outline-fav`}></use>
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:-mt-9.5 lg:ml-36">
          <ul className="flex flex-col gap-2 leading-normal">
            <ul className="flex flex-col gap-1 md:flex-row">
              <li className="bg-smoke rounded-3xl px-4 py-2">
                <span className="text-goose">Experience :</span>{" "}
                {doctor.experience}
              </li>
              <li className="bg-smoke rounded-3xl px-4 py-2">
                <span className="text-goose">License :</span> {doctor.license}
              </li>
            </ul>
            <ul className="flex flex-col gap-1 md:flex-row">
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
          {!isReviewOpen && (
            <button
              className="mt-3.5 text-base leading-normal font-medium underline transition-discrete duration-300 ease-in-out hover:no-underline focus:no-underline focus:outline-none"
              onClick={() => setReviewOpen(true)}>
              Read more
            </button>
          )}
          {isReviewOpen &&
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
                  onClick={handleSetAppointment}
                  className="bg-sun hover:bg-sunset text-snow focus:bg-sunset rounded-3xlg px-10 py-3.5 transition-colors duration-300 ease-in-out focus:outline-none">
                  Make an appointment
                </button>
              </>
            )}
        </div>
      </li>
      {isAppoinmentOpen && (
        <Modal onClose={() => setAppoinmentOpen(false)}>
          <AppoinmentForm doctor={doctor} onSuccess={onSuccessHandler} />
        </Modal>
      )}
      {isCautionOpen && (
        <Modal onClose={() => setCautionOpen(false)}>
          <div className="flex w-100 flex-col items-center gap-6">
            <p className="font text-center leading-tight font-medium">
              You need to be registered and logged in to do this. Please proceed
              to register or/and log in!
            </p>
            <Button
              type="button"
              label="OK"
              className="w-40 px-4.5 py-4"
              onClick={() => setCautionOpen(false)}
            />
          </div>
        </Modal>
      )}
      {isSuccesspen && (
        <Modal onClose={() => setSuccessOpen(false)}>
          <div className="text-goose flex w-100 flex-col items-center gap-6 text-center leading-tight">
            <p>
              Thanks for the appointment,{" "}
              <span className="text-waterloo/80 font-medium">
                {formData.name}!
              </span>
            </p>
            <p>
              You have successfully booked an appointment with{" "}
              <span className="text-waterloo/80 font-medium">
                {doctor.name}
              </span>{" "}
              at {formData.time}!
            </p>
            <Button
              type="button"
              label="OK"
              className="w-40 px-4.5 py-4"
              onClick={() => setSuccessOpen(false)}
            />
          </div>
        </Modal>
      )}
    </>
  );
};

export default PsychologistCard;
