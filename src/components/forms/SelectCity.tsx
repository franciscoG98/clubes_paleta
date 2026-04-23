import { locations } from "../../app/data/locations";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  selectedProvince: string;
  onValueChange: (value: string | null) => void;
  value?: string;
  error?: string;
};

const SelectCity = ({
  selectedProvince,
  onValueChange,
  value,
  error,
}: Props) => {
  const cities = locations.find(p => p.name === selectedProvince)?.cities || [];

  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="city-select">
        Ciudad <span className="text-destructive">*</span>
      </Label>
      <Select
        value={value}
        onValueChange={onValueChange}
        disabled={!selectedProvince}
      >
        <SelectTrigger
          id="city-select"
          className={`w-full ${error ? "ring-destructive/20 border-destructive" : ""}`}
          aria-invalid={!!error}
        >
          <SelectValue placeholder="Seleccioná una ciudad" />
        </SelectTrigger>
        <SelectContent>
          {cities.map(city => (
            <SelectItem key={city} value={city}>
              {city}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};

export default SelectCity;
