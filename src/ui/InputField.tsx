type InputFieldProps = {
	label: string;
	name: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	type?: string;
	placeholder?: string;
	required?: boolean;
	pattern?: string;
	title?: string;
	disabled?: boolean;
};

// Componente interno para inputs (para no repetir clases)
export function InputField({
	label,
	name,
	value,
	onChange,
	type = "text",
	placeholder = "",
	required = false,
	disabled = false,
	...props
}: InputFieldProps) {
	return (
		<div className="flex flex-col gap-1">
			<label className="text-sm font-medium text-gray-500">{label}</label>
			<input
				className="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 sm:text-sm transition-shadow disabled:bg-gray-100 disabled:text-gray-500"
				type={type}
				name={name}
				value={value}
				onChange={onChange} // Pasamos el evento directo
				placeholder={placeholder}
				required={required}
				disabled={disabled}
				{...props}
			/>
		</div>
	);
}