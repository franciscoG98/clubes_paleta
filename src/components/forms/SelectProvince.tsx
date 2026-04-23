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
  onValueChange: (value: string | null) => void;
  value?: string;
  error?: string;
};

const SelectProvince = ({ onValueChange, value, error }: Props) => {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="province-select">
        Provincia <span className="text-destructive">*</span>
      </Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger
          id="province-select"
          className={`w-full ${error ? "ring-destructive/20 border-destructive" : ""}`}
          aria-invalid={!!error}
        >
          <SelectValue placeholder="Seleccioná una provincia" />
        </SelectTrigger>
        <SelectContent>
          {locations.map(province => (
            <SelectItem key={province.id} value={province.name}>
              {province.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};

export default SelectProvince;
