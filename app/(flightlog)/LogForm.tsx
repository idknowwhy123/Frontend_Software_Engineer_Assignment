import React, { useCallback, useState } from "react";
import { Button } from "../components/ui";

const emptyForm = {
  passengerName: "",
  airport: "",
  timestamp: "",
};

const inputBaseClass =
  "w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 transition duration-150 focus:outline-none focus:ring-2 dark:bg-gray-950 dark:text-gray-100 dark:placeholder:text-gray-500";
const inputDefaultClass =
  "border-gray-300 focus:border-airline focus:ring-airline/20 dark:border-gray-700";
const inputErrorClass =
  "border-red-500 focus:border-red-500 focus:ring-red-500/20 dark:border-red-500";

function LogForm({
  type,
  onSubmit,
  pendingPassengers,
  minTimeStamp,
}: LogFormProps) {
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState<FormErrors>();
  const isArrival = type === "arrival";
  const title = isArrival ? "Arrival Logging" : "Departure Logging";
  const description = isArrival
    ? "Select a pending passenger and capture their arrival airport."
    : "Register a passenger departure before tracking their arrival.";

  const handleSubmit = useCallback(() => {
    const errors: FormErrors = {};
    if (!formData.passengerName) errors.passengerName = "Required";
    if (!formData.airport) errors.airport = "Required";
    if (!formData.timestamp) errors.timestamp = "Required";
    else if (
      minTimeStamp !== undefined &&
      new Date(formData.timestamp).getTime() / 1000 < minTimeStamp
    ) {
      errors.timestamp = "Must be after latest log";
    }
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    onSubmit({
      ...formData,
      type,
      timestamp: new Date(formData.timestamp).getTime() / 1000,
    });
    setFormData(emptyForm);
    setErrors(undefined);
  }, [formData, minTimeStamp, type, onSubmit]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { id, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));
    },
    []
  );

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit();
      }}
    >
      <fieldset>
        <legend className="mb-4 text-base font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </legend>
        <p className="mb-6 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          {description}
        </p>

        <div className="grid grid-cols-1 gap-4">
          <Field
            error={errors?.passengerName}
            hint={
              isArrival
                ? "Only passengers without an arrival are listed."
                : "Use the passenger name from the travel record."
            }
            id="passengerName"
            label="Passenger Name"
          >
            {isArrival && pendingPassengers ? (
              <select
                id="passengerName"
                name="passengerName"
                value={formData.passengerName}
                className={`${inputBaseClass} ${
                  errors?.passengerName ? inputErrorClass : inputDefaultClass
                }`}
                onChange={handleChange}
              >
                <option value="">Select passenger</option>
                {pendingPassengers.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id="passengerName"
                name="passengerName"
                type="text"
                value={formData.passengerName}
                className={`${inputBaseClass} ${
                  errors?.passengerName ? inputErrorClass : inputDefaultClass
                }`}
                placeholder="e.g. cherprang"
                onChange={handleChange}
              />
            )}
          </Field>

          <Field
            error={errors?.airport}
            hint="Enter the airport or city exactly as it should appear in the route."
            id="airport"
            label="Airport"
          >
            <input
              id="airport"
              name="airport"
              type="text"
              value={formData.airport}
              className={`${inputBaseClass} ${
                errors?.airport ? inputErrorClass : inputDefaultClass
              }`}
              placeholder="e.g. bangkok"
              onChange={handleChange}
            />
          </Field>

          <Field
            error={errors?.timestamp}
            hint="Use the local date and time for this log entry."
            id="timestamp"
            label="Timestamp"
          >
            <input
              id="timestamp"
              name="timestamp"
              type="datetime-local"
              value={formData.timestamp}
              className={`${inputBaseClass} ${
                errors?.timestamp ? inputErrorClass : inputDefaultClass
              }`}
              onChange={handleChange}
            />
          </Field>
        </div>
      </fieldset>

      <div className="mt-6 flex justify-end">
        <Button className="w-full sm:w-auto" type="submit">
          Submit {isArrival ? "arrival" : "departure"}
        </Button>
      </div>
    </form>
  );
}

function Field({
  children,
  error,
  hint,
  id,
  label,
}: {
  children: React.ReactNode;
  error?: string;
  hint: string;
  id: string;
  label: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      {children}
      {error ? (
        <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
      ) : (
        <p className="text-xs text-gray-500 dark:text-gray-400">{hint}</p>
      )}
    </div>
  );
}

export default LogForm;
