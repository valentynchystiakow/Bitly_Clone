
// creates TextField component
const TextField = ({
    // props
    label,
    id,
    type,
    errors,
    register,
    required,
    message,
    className,
    min,
    value,
    placeholder,
  }) => {
    return (
      <div className="flex flex-col gap-1">
        {/* label block */}
        <label
          htmlFor={id}
          className={`${className ? className : ""} font-semibold text-md  `}
        >
          {label}
        </label>
        {/* input block */}
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          className={`${
            className ? className : ""
          } px-2 py-2 border   outline-none bg-transparent  text-slate-700 rounded-md ${
            errors[id]?.message ? "border-red-500" : "border-slate-600"
          }`}
          {...register(id, {
            required: { value: required, message },
            minLength: min
              ? { value: min, message: "Minimum 6 character is required" }
              : null,
            pattern:
              type === "email"
                ? {
                    value: /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+com+$/,
                    message: "Invalid email",
                  }
                : type === "url"
                ? {
                    value:
                      /^(https?:\/\/)?(([a-zA-Z0-9\u00a1-\uffff-]+\.)+[a-zA-Z\u00a1-\uffff]{2,})(:\d{2,5})?(\/[^\s]*)?$/,
                    message: "Please enter a valid url",
                  }
                : null,
          })}
        />
        {/*  error message block */}
        {errors[id]?.message && (
          <p className="text-sm font-semibold text-red-600 mt-0">
            {errors[id]?.message}*
          </p>
        )}
      </div>
    );
  };
  
  // exports TextField component
  export default TextField;