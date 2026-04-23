import Image from "next/image";
import { Cancha } from "@/types/club";
import { House, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ClubCard = ({
  club,
  city,
  state,
  maps_location,
  type,
  phone,
  image,
  address,
}: Cancha) => {
  return (
    <Card className="relative h-[440px] w-80 gap-0 overflow-hidden p-0">
      <Badge className="absolute z-10 rounded-br-lg bg-blue-600 text-white hover:bg-blue-700">
        {type}
      </Badge>

      <Image
        aria-hidden
        src={
          typeof image === "string"
            ? image.startsWith("http")
              ? image
              : `${process.env.NEXT_PUBLIC_SERVER_URI}${image}`
            : `${process.env.NEXT_PUBLIC_SERVER_URI}/uploads/cancha_default.webp`
        }
        alt={`Cancha de ${club}, ${city}`}
        className="h-fit w-full border-b object-cover"
        width={320}
        height={210}
        priority
      />

      <CardHeader className="pb-1">
        <h3 className="text-xl font-bold">{club}</h3>
        <p className="text-sm text-muted-foreground">
          {city}, {state}
        </p>
      </CardHeader>

      <CardContent className="flex flex-col gap-2">
        <p className="flex items-start gap-2 text-sm text-muted-foreground">
          <House className="mt-0.5 size-4 shrink-0" />
          {address ?? "Dirección no disponible"}
        </p>

        <Link
          href={maps_location}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-primary hover:underline"
        >
          <MapPin className="size-4 shrink-0" />
          Ver en Google Maps
        </Link>
      </CardContent>

      {phone ? (
        <CardFooter className="border-none">
          <Link
            href={`tel:+549${phone}`}
            className="flex items-center gap-2 text-sm text-green-600 hover:underline"
          >
            <Phone className="size-4 shrink-0" />
            {phone}
          </Link>
        </CardFooter>
      ) : null}
    </Card>
  );
};

export default ClubCard;
