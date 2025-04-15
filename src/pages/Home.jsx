import HeroButton from "../components/HeroButton";
import hero from "../assets/images/hero.jpg";
import hero2x from "../assets/images/hero@2x.jpg";
import sprite from "src/assets/icons/sprite.svg";
const Home = () => {
  return (
    <div className="flex justify-between flex-wrap">
      <div className="flex flex-col items-start justify-center py-20 xl:py-40">
        <h1 className="mb-5 lg:max-w-150 text-7xl xl:text-[80px] leading-[82px] font-semibold">
          The road to the <span className="text-sun italic">depths</span> of the
          human soul
        </h1>
        <p className="mb-10 lg:max-w-128 text-lg leading-6">
          We help you to reveal your potential, overcome challenges and find a
          guide in your own life with the help of our experienced psychologists.
        </p>
        <HeroButton />
      </div>
      <div className="relative xl:mt-19.5 shrink-0">
        <picture>
          <source srcSet={`${hero} 1x, ${hero2x} 2x`} />
          <img src={hero} alt="hero" />
        </picture>
        <div className="bg-sun absolute top-83 -left-10 xl:-left-25 flex gap-4 rounded-[20px] p-8">
          <div className="bg-snow rounded-xl p-3">
            <svg className="fill-sun size-7.5">
              <use href={`${sprite}#icon-check`}></use>
            </svg>
          </div>
          <div className="flex flex-col justify-between">
            <span className="text-snow/50 text-sm leading-4">
              Experienced psychologists
            </span>
            <span className="text-snow text-2xl leading-7 font-bold">
              15,000
            </span>
          </div>
        </div>
        <div className="absolute top-46 -left-9 flex size-10 -rotate-15 items-center justify-center rounded-[10px] bg-[#54BE96]">
          <svg className="fill-snow h-4 w-2.5 rotate-15">
            <use href={`${sprite}#icon-question`}></use>
          </svg>
        </div>
        <div className="absolute top-9 -right-10 flex size-12 rotate-15 items-center justify-center rounded-[10px] bg-[#fbc75e]">
          <svg className="fill-snow size-5 -rotate-15">
            <use href={`${sprite}#icon-avatars`}></use>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Home;
