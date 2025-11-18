const RadioInput = ({ value, onChange }) => {
  return (
    <div className="mb-6">
      <div className="flex justify-center gap-10  pb-2">
        {/* YES */}
        <button
          type="button"
          onClick={() => onChange(true)}
          className="flex items-center gap-2 focus:outline-none"
        >
          <span
            className={
              "w-7 h-7 rounded-full border-2 flex items-center justify-center " +
              (value === true ? "border-blue-500" : "border-gray-300")
            }
          >
            {value === true && (
              <span className="w-5 h-5 rounded-full bg-blue-500" />
            )}
          </span>
          <span
            className={
              "text-sm font-semibold tracking-wide " +
              (value === true ? "text-blue-600" : "text-gray-400")
            }
          >
            YES
          </span>
        </button>

        {/* NO */}
        <button
          type="button"
          onClick={() => onChange(false)}
          className="flex items-center gap-2 focus:outline-none"
        >
          <span
            className={
              "w-7 h-7 rounded-full border-2 flex items-center justify-center " +
              (value === false ? "border-blue-500" : "border-gray-300")
            }
          >
            {value === false && (
              <span className="w-5 h-5 rounded-full bg-blue-500" />
            )}
          </span>
          <span
            className={
              "text-sm font-semibold " +
              (value === false ? "text-blue-600" : "text-gray-400")
            }
          >
            NO
          </span>
        </button>
      </div>
    </div>
  );
};

export default RadioInput;
