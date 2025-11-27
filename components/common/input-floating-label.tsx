import { FieldPath, FieldValues, UseFormRegister } from "react-hook-form";

interface FloatingInputProps<T extends FieldValues> {
  label: string;
  name: FieldPath<T>;
  type?: string;
  register: UseFormRegister<T>;
  error?: string;
}

export function FloatingInput<T extends FieldValues>({
  label,
  name,
  type = "text",
  register,
  error,
}: FloatingInputProps<T>) {
  return (
    <div className="relative w-full">
      <input
        id={name}
        type={type}
        placeholder=" "
        {...register(name)}
        className={`
          peer block w-full border rounded-lg px-3 py-3 bg-transparent 
          text-gray-900 focus:outline-none
          focus:border-primary
          ${error ? "border-red-500" : "border-gray-400"}
        `}
      />

      <label
        htmlFor={name}
        className="
          absolute left-3 top-3 text-gray-500 bg-white px-1 transition-all
          peer-placeholder-shown:top-3 peer-placeholder-shown:text-base
          peer-focus:-top-2 peer-focus:text-xs peer-focus:text-primary
          peer-not-placeholder-shown:-top-2
          peer-not-placeholder-shown:text-xs
        "
      >
        {label}
      </label>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
