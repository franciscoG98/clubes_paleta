import { locations } from "../../app/data/locations";

type Props = {
  handleProvince: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: () => void;
  error?: string;
};

const SelectProvince = ({ handleProvince, onBlur, error }: Props) => {
  return (
    <div>
      <label className="block font-semibold">
        Provincia <span className="text-red-500">*</span>
      </label>
      <select
        className={`w-full rounded-md border p-2 ${error ? "border-red-500 focus:ring-red-300" : ""}`}
        onChange={handleProvince}
        onBlur={onBlur}
      >
        <option value="">Selecciona una provincia</option>
        {locations.map((province) => (
          <option key={province.id} value={province.name}>
            {province.name}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default SelectProvince;
