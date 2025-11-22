"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import Image from "next/image";

interface Branch {
  id: string;
  name: string;
  code: string;
  address: {
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
  telephone?: string;
  email?: string;
  whatsapp?: string;
  hours?: {
    monday?: string;
    tuesday?: string;
    wednesday?: string;
    thursday?: string;
    friday?: string;
    saturday?: string;
    sunday?: string;
  };
  coordinates?: {
    latitude?: number;
    longitude?: number;
  };
  services?: string[];
  image?: string;
  isFlagship?: boolean;
}

interface StoreCardProps {
  branch: Branch;
}

export function StoreCard({ branch }: StoreCardProps) {
  const fullAddress = [
    branch.address.street,
    branch.address.city,
    branch.address.state,
    branch.address.postalCode,
    branch.address.country,
  ]
    .filter(Boolean)
    .join(", ");

  const openGoogleMaps = () => {
    if (branch.coordinates?.latitude && branch.coordinates?.longitude) {
      window.open(
        `https://www.google.com/maps?q=${branch.coordinates.latitude},${branch.coordinates.longitude}`,
        "_blank"
      );
    } else if (fullAddress) {
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`,
        "_blank"
      );
    }
  };

  const openWhatsApp = () => {
    if (branch.whatsapp) {
      window.open(`https://wa.me/${branch.whatsapp.replace(/[^0-9]/g, "")}`, "_blank");
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image */}
      {branch.image && (
        <div className="relative h-48 w-full bg-gray-100">
          <Image
            src={branch.image}
            alt={branch.name}
            fill
            className="object-cover"
          />
        </div>
      )}

      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{branch.name}</h3>
            <p className="text-sm text-gray-500 mt-1">{branch.code}</p>
          </div>
          {branch.isFlagship && (
            <Badge className="bg-amber-600">Flagship</Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Address */}
        {fullAddress && (
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-gray-700 text-sm">{fullAddress}</p>
              {(branch.coordinates?.latitude || fullAddress) && (
                <Button
                  variant="link"
                  size="sm"
                  onClick={openGoogleMaps}
                  className="p-0 h-auto text-blue-600 hover:text-blue-800"
                >
                  Get Directions →
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Contact */}
        <div className="space-y-2">
          {branch.telephone && (
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-gray-400" />
              <a
                href={`tel:${branch.telephone}`}
                className="text-gray-700 text-sm hover:text-blue-600"
              >
                {branch.telephone}
              </a>
            </div>
          )}

          {branch.email && (
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-gray-400" />
              <a
                href={`mailto:${branch.email}`}
                className="text-gray-700 text-sm hover:text-blue-600"
              >
                {branch.email}
              </a>
            </div>
          )}

          {branch.whatsapp && (
            <div className="flex items-center gap-3">
              <MessageCircle className="h-5 w-5 text-gray-400" />
              <button
                onClick={openWhatsApp}
                className="text-gray-700 text-sm hover:text-green-600"
              >
                WhatsApp: {branch.whatsapp}
              </button>
            </div>
          )}
        </div>

        {/* Hours */}
        {branch.hours && (
          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-gray-700">
              <p className="font-medium mb-1">Operating Hours:</p>
              <div className="space-y-0.5 text-xs">
                {branch.hours.monday && (
                  <p>Mon: {branch.hours.monday}</p>
                )}
                {branch.hours.tuesday && (
                  <p>Tue: {branch.hours.tuesday}</p>
                )}
                {branch.hours.wednesday && (
                  <p>Wed: {branch.hours.wednesday}</p>
                )}
                {branch.hours.thursday && (
                  <p>Thu: {branch.hours.thursday}</p>
                )}
                {branch.hours.friday && (
                  <p>Fri: {branch.hours.friday}</p>
                )}
                {branch.hours.saturday && (
                  <p>Sat: {branch.hours.saturday}</p>
                )}
                {branch.hours.sunday && (
                  <p>Sun: {branch.hours.sunday}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Services */}
        {branch.services && branch.services.length > 0 && (
          <div>
            <p className="text-sm font-medium text-gray-900 mb-2">Services:</p>
            <div className="flex flex-wrap gap-2">
              {branch.services.map((service) => (
                <Badge key={service} variant="outline" className="text-xs">
                  {service}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
