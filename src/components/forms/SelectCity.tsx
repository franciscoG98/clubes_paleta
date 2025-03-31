import { locations } from '../../app/data/locations';

type Props = {
  selectedProvince: string;
  handleCity: (any) => void;
};

const SelectCity = ({ selectedProvince, handleCity }: Props) => {
  const cities =
    locations.find((p) => p.name === selectedProvince)?.cities || [];

  return (
    <div>
      <label className="block font-semibold">Ciudad</label>
      <select
        className="w-full rounded-md border p-2"
        onChange={(e) => {
          handleCity(e);
        }}
        disabled={!selectedProvince}
      >
        <option value="">Selecciona una ciudad</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectCity;
