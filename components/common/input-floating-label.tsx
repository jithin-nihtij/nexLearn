const InputFloatingLabel = () => {
  return (
    <div className="relative w-full">
      <input
        type="text"
        id="name"
        className="peer block w-full border border-gray-400 rounded-lg px-3 py-3 bg-transparent text-gray-900 focus:outline-none focus:border-primary"
        placeholder=" "
      />
      <label
        htmlFor="name"
        className="absolute left-3 top-3 text-gray-500 transition-all 
           peer-placeholder-shown:top-3 peer-placeholder-shown:text-base 
           peer-focus:-top-2 peer-focus:text-[12px] peer-focus:text-primary
           bg-white px-1"
      >
        Name
      </label>
    </div>
  );
};

export default InputFloatingLabel;
