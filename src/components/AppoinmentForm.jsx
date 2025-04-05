import * as Yup from "yup";
import Button from "./Button";
import { emailRegExp } from "../lib/utils/constants";
import { useYupValidationResolver } from "../lib/utils/validationResolver";
import { Controller, useForm } from "react-hook-form";
import TimePicker from "./TimeSelect";

const AppoinmentForm = ({ onSuccess, doctor }) => {
  
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(2, "Too Short!")
      .max(25, "Too Long!"),
    email: Yup.string()
      .matches(emailRegExp, "Email is not valid")
      .required("Email is required"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^\+380\d{9}$/, "Put a valid phone number"),
    comment: Yup.string().max(160, "Too long!"),
  });

  const resolver = useYupValidationResolver(validationSchema);
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver,
  });
  const onSubmit = async data => {
    onSuccess(data);
  };
  return (
    <>
      <div className="max-w-110">
        <div className="mb-5">
          <h3 className="mb-5 text-[40px] leading-12 font-medium">
            Make an appointment with a psychologists
          </h3>
          <p className="text-waterloo/50">
            You are on the verge of changing your life for the better. Fill out
            the short form below to book your personal appointment with a
            professional psychologist. We guarantee confidentiality and respect
            for your privacy.
          </p>
        </div>
        <div className="mb-8 flex gap-3.5">
          <div className="size-11 overflow-hidden rounded-[15px]">
            <img
              src={doctor.avatar_url}
              alt={doctor.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-1 font-medium">
            <p className="text-goose text-xs leading-4">Your psychologist</p>
            <h4 className="leading-6">{doctor.name}</h4>
          </div>
        </div>
        <form
          className="flex flex-col gap-4.5"
          onSubmit={handleSubmit(onSubmit)}>
          <div className="relative">
            <label htmlFor="name" className="hidden">
              Name
            </label>
            <input
              id="name"
              {...register("name")}
              placeholder="Name"
              className="border-waterloo/10 placeholder:text-waterloo w-full rounded-xl border px-4.5 py-4 text-base focus:outline-none"
            />
            {errors.name && (
              <p className="absolute right-2 bottom-0.5 text-xs text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <div className="border-waterloo/10 relative rounded-xl border px-4.5 py-4">
              <label htmlFor="phone" className="hidden">
                Phone
              </label>
              <Controller
                name="phone"
                control={control}
                defaultValue="+380"
                render={({ field }) => (
                  <input
                    {...field}
                    className="w-full bg-transparent focus:outline-none"
                    value={field.value}
                    onChange={e => {
                      const value = e.target.value;

                      if (value.startsWith("+380")) {
                        field.onChange(value);
                      } else {
                        field.onChange("+380");
                      }
                    }}
                  />
                )}
              />
              {errors.phone && (
                <p className="absolute right-2 bottom-0.5 text-xs text-red-500">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="relative w-full">
              <label htmlFor="time" className="hidden">
                Time
              </label>
              <Controller
                name="time"
                control={control}
                defaultValue="09:00"
                render={({ field }) => (
                  <TimePicker field={field} form={{ setValue }} />
                )}
              />
              {errors.time && (
                <p className="absolute right-2 bottom-0.5 text-xs text-red-500">
                  {errors.time.message}
                </p>
              )}
            </div>
          </div>
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
            <label htmlFor="email" className="hidden">
              Comment
            </label>
            <textarea
              id="comment"
              {...register("comment")}
              placeholder="Comment"
              className="border-waterloo/10 placeholder:text-waterloo h-29 w-full resize-none rounded-xl border px-4.5 py-4 text-base focus:outline-none"
            />
            {errors.comment && (
              <p className="absolute right-2 bottom-0.5 text-xs text-red-500">
                {errors.comment.message}
              </p>
            )}
          </div>

          <Button type="submit" label="Send" className="px-12.5 py-4.5" />
        </form>
      </div>
      
    </>
  );
};

export default AppoinmentForm;
