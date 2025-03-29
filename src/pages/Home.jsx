import HeroButton from "../components/HeroButton";
import hero from "../assets/images/hero.jpg";
import hero2x from "../assets/images/hero@2x.jpg";
const Home = () => {
  return (
    <div className="flex justify-between">
      <div className="flex flex-col items-start justify-center py-40">
        <h1 className="mb-5 max-w-150 text-[80px] leading-[82px] font-semibold">
          The road to the <span className="text-sun italic">depths</span> of the
          human soul
        </h1>
        <p className="mb-10 max-w-128 text-lg leading-6">
          We help you to reveal your potential, overcome challenges and find a
          guide in your own life with the help of our experienced psychologists.
        </p>
        <HeroButton />
      </div>
      <div className="relative mt-19.5 shrink-0">
        <picture>
          <source srcSet={`${hero} 1x, ${hero2x} 2x`} />
          <img src={hero} alt="hero" />
        </picture>
        <div className="bg-sun absolute top-83 -left-25 flex gap-4 rounded-[20px] p-8">
          <div className="bg-snow rounded-xl p-3">
            <svg
              viewBox="0 0 30 30"
              className="fill-sun"
              height="30"
              width="30">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.5 12.5L5 15L12.5 22.5L25 10L22.5 7.5L12.5 17.5L7.5 12.5Z"
              />
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
          <svg
            width="10"
            height="17"
            viewBox="0 0 10 17"
            className="fill-snow rotate-15">
            <path d="M2.5 5.3125C2.5 4.14043 3.39687 3.1875 4.5 3.1875H5.5C6.60313 3.1875 7.5 4.14043 7.5 5.3125V5.43203C7.5 6.15586 7.15313 6.82988 6.58125 7.21836L5.2625 8.11817C4.8753 8.38268 4.5568 8.74625 4.33622 9.17554C4.11564 9.60483 4.00003 10.0861 4 10.5752V10.625C4 11.2127 4.44688 11.6875 5 11.6875C5.55312 11.6875 6 11.2127 6 10.625V10.5785C6 10.3063 6.13125 10.0539 6.34375 9.90781L7.6625 9.00801C8.80625 8.22442 9.5 6.87969 9.5 5.43203V5.3125C9.5 2.96504 7.70937 1.0625 5.5 1.0625H4.5C2.29063 1.0625 0.5 2.96504 0.5 5.3125C0.5 5.9002 0.946875 6.375 1.5 6.375C2.05313 6.375 2.5 5.9002 2.5 5.3125ZM5 15.9375C5.33152 15.9375 5.64946 15.7976 5.88388 15.5485C6.1183 15.2994 6.25 14.9616 6.25 14.6094C6.25 14.2571 6.1183 13.9193 5.88388 13.6703C5.64946 13.4212 5.33152 13.2813 5 13.2813C4.66848 13.2813 4.35054 13.4212 4.11612 13.6703C3.8817 13.9193 3.75 14.2571 3.75 14.6094C3.75 14.9616 3.8817 15.2994 4.11612 15.5485C4.35054 15.7976 4.66848 15.9375 5 15.9375Z" />
          </svg>
        </div>
        <div className="absolute top-9 -right-10 flex size-12 rotate-15 items-center justify-center rounded-[10px] bg-[#fbc75e]">
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            className="fill-snow -rotate-10">
            <g clipPath="url(#clip0_42_1658)">
              <path d="M14.8761 17.6007L14.4483 19.1973L3.27181 16.2026L3.69963 14.6059C3.69963 14.6059 4.55527 11.4126 10.1435 12.91C15.7318 14.4074 14.8761 17.6007 14.8761 17.6007ZM14.1142 9.26792C14.2622 8.7153 14.2431 8.13117 14.0592 7.58941C13.8753 7.04766 13.5349 6.5726 13.081 6.22431C12.6271 5.87603 12.0801 5.67016 11.5092 5.63274C10.9383 5.59532 10.3692 5.72803 9.87368 6.01409C9.37821 6.30015 8.97869 6.72672 8.72565 7.23984C8.47261 7.75295 8.3774 8.32959 8.45208 8.89681C8.52676 9.46404 8.76796 9.99638 9.14519 10.4265C9.52241 10.8567 10.0187 11.1653 10.5713 11.3134C11.3124 11.5119 12.102 11.408 12.7664 11.0244C13.4308 10.6408 13.9156 10.009 14.1142 9.26792ZM15.6839 14.3945C16.0729 14.9058 16.3451 15.4962 16.4814 16.124C16.6177 16.7518 16.6148 17.4019 16.4728 18.0285L16.045 19.6251L19.2383 20.4808L19.6661 18.8841C19.6661 18.8841 20.4426 15.9862 15.6839 14.3945ZM16.8586 7.00857C16.31 6.85828 15.7285 6.87856 15.1917 7.06674C15.4951 7.87424 15.5381 8.75644 15.3149 9.58966C15.0916 10.4229 14.6132 11.1653 13.9467 11.713C14.3176 12.1444 14.811 12.4526 15.3613 12.5968C16.1023 12.7954 16.8919 12.6914 17.5563 12.3078C18.2207 11.9242 18.7055 11.2924 18.9041 10.5514C19.1026 9.81033 18.9987 9.02076 18.6151 8.35635C18.2315 7.69195 17.5997 7.20713 16.8586 7.00857Z" />
            </g>
            <defs>
              <clipPath id="clip0_42_1658">
                <rect width="19.8356" height="19.8356" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Home;
