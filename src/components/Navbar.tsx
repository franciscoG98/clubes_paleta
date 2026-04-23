"use client";

import Image from "next/image";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const paths: { title: string; href: string }[] = [
  { title: "Buscar Canchas", href: "/buscar-canchas" },
  { title: "Sumá tu Cancha", href: "/suma-tu-cancha" },
  { title: "Acerca de", href: "/acerca-de" },
];

const Navbar = () => {
  const segment = useSelectedLayoutSegment();
  const currentPath = segment ? `/${segment}` : "/";

  return (
    <nav className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 border-b border-border backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-3 font-semibold text-foreground transition-opacity hover:opacity-80"
        >
          <Image
            alt="Logo de Canchas de Paleta"
            src="/main_logo.webp"
            className="rounded-xl"
            height={44}
            width={44}
          />
          <span className="text-base sm:text-lg">Canchas de Paleta</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {paths.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-muted ${
                currentPath === item.href
                  ? "bg-primary/10 text-primary"
                  : "text-foreground"
              }`}
            >
              {item.title}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <Sheet>
          <SheetTrigger
            render={
              <Button variant="ghost" size="icon" className="md:hidden" />
            }
          >
            <MenuIcon className="size-5" />
            <span className="sr-only">Abrir menú</span>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetHeader>
              <SheetTitle>
                <Link href="/" className="flex items-center gap-2">
                  <Image
                    alt="Logo"
                    src="/main_logo.webp"
                    className="rounded-xl"
                    height={36}
                    width={36}
                  />
                  Canchas de Paleta
                </Link>
              </SheetTitle>
            </SheetHeader>
            <div className="mt-6 flex flex-col gap-1 px-4">
              {paths.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-muted ${
                    currentPath === item.href
                      ? "bg-primary/10 text-primary"
                      : "text-foreground"
                  }`}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
