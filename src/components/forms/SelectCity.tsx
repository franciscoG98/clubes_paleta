import { locations } from "../../app/data/locations";

type Props = {
  selectedProvince: string;
  handleCity: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: () => void;
  error?: string;
};

const SelectCity = ({ selectedProvince, handleCity, onBlur, error }: Props) => {
  const cities = locations.find(p => p.name === selectedProvince)?.cities || [];

  return (
    <div>
      <label className="block font-semibold">
        Ciudad <span className="text-red-500">*</span>
      </label>
      <select
        className={`w-full rounded-md border p-2 ${error ? "border-red-500 focus:ring-red-300" : ""}`}
        onChange={handleCity}
        onBlur={onBlur}
        disabled={!selectedProvince}
      >
        <option value="">Selecciona una ciudad</option>
        {cities.map(city => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default SelectCity;
