import { locations } from '../../app/data/locations';

type Props = {
  handleProvince: (any) => void;
};

const SelectProvince = ({ handleProvince }: Props) => {
  return (
    <div>
      <label className="block font-semibold">Provincia</label>
      <select
        className="w-full rounded-md border p-2"
        onChange={(e) => {
          handleProvince(e);
        }}
      >
        <option value="">Selecciona una provincia</option>
        {locations.map((province) => (
          <option key={province.id} value={province.name}>
            {province.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectProvince;
