'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Navigation, Crosshair, Search, Car, Bus } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { toast } from 'sonner';

const HUB_COORDS: [number, number] = [6.4698, 3.5852];
const HUB_NAME = "AfriScience Hub HQ";

function localiseInstruction(text: string, distance: number, index: number, total: number): string {
  let localText = text
    .replace(/Head/i, "Proceed")
    .replace(/Turn right/i, "Take a right turn")
    .replace(/Turn left/i, "Take a left turn")
    .replace(/Make a U-turn/i, "Turn back")
    .replace(/Destination/i, "AfriScience Hub");
  if (distance > 2000) {
    localText += ". Continue straight for a while.";
  } else if (distance < 100 && index !== total - 1) {
    localText += ". It's just nearby.";
  }
  if (localText.includes("turn")) {
    localText = localText.replace("turn", "turn at the junction");
  }
  return localText;
}

function generateKekeInstructions(osrmSteps: any[]): string[] {
  const instructions: string[] = [];
  if (osrmSteps.length === 0) return instructions;
  instructions.push("From your current location, trek to the nearest bus stop.");
  let accumDistance = 0;
  osrmSteps.forEach((step) => {
    const roadName = step.name || "the road";
    const distance = step.distance || 0;
    if (distance > 1000) {
      instructions.push(`Enter a bus or keke heading down ${roadName}.`);
    } else if (step.maneuver.type.includes("turn")) {
      instructions.push(`Alight at the junction connecting to ${roadName}.`);
      instructions.push(`Enter another keke or trek into ${roadName}.`);
    }
  });
  instructions.push("You will see the AfriScience Hub building clearly marked. Alight safely.");
  return instructions.length > 2 ? instructions : [
    "From your location, take a Keke to the nearest major road.",
    "Ask the driver to drop you at the Tech District junction.",
    "Trek down Innovation Drive, you will see AfriScience Hub on your right."
  ];
}

export default function MapSection() {
  const [L, setL] = useState<any>(null);
  const [hubIcon, setHubIcon] = useState<any>(null);
  const [userIcon, setUserIcon] = useState<any>(null);

  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [isRouting, setIsRouting] = useState(false);
  const [routePath, setRoutePath] = useState<[number, number][]>([]);
  const [steps, setSteps] = useState<string[]>([]);
  const [travelMode, setTravelMode] = useState<'driving' | 'keke'>('driving');

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<{ hub?: any; user?: any }>({});
  const polylineRef = useRef<any>(null);

  useEffect(() => {
    (async () => {
      const leaflet = await import('leaflet');
      (leaflet.Icon.Default.prototype as any)._getIconUrl && delete (leaflet.Icon.Default.prototype as any)._getIconUrl;
      leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });
      setHubIcon(new leaflet.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      }));
      setUserIcon(new leaflet.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      }));
      setL(() => leaflet);
    })();
  }, []);

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
    link.crossOrigin = '';
    document.head.appendChild(link);
    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

  useEffect(() => {
    if (!L || !hubIcon) return;
    if (mapContainerRef.current && !mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current).setView(HUB_COORDS, 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current);
      markersRef.current.hub = L.marker(HUB_COORDS, { icon: hubIcon })
        .addTo(mapRef.current)
        .bindPopup(HUB_NAME);
    }
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [L, hubIcon]);

  useEffect(() => {
    if (!mapRef.current || !L || !userIcon) return;
    if (userLocation) {
      if (markersRef.current.user) {
        markersRef.current.user.setLatLng(userLocation);
      } else {
        markersRef.current.user = L.marker(userLocation, { icon: userIcon })
          .addTo(mapRef.current)
          .bindPopup("You are here");
      }
    }
    if (polylineRef.current) {
      polylineRef.current.remove();
    }
    if (routePath.length > 0) {
      polylineRef.current = L.polyline(routePath, {
        color: "#ED3237",
        weight: 5,
        opacity: 0.8,
        dashArray: travelMode === 'keke' ? '10, 10' : undefined
      }).addTo(mapRef.current);
      const bounds = L.latLngBounds([userLocation || HUB_COORDS, HUB_COORDS]);
      mapRef.current.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [userLocation, routePath, travelMode, L, userIcon]);

  const handleUseCurrentLocation = () => {
    setIsLocating(true);
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      setIsLocating(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newLoc: [number, number] = [latitude, longitude];
        setUserLocation(newLoc);
        setIsLocating(false);
        setSearchQuery("Current Location");
        calculateRoute(newLoc, HUB_COORDS, travelMode);
      },
      () => {
        const mockLoc: [number, number] = [6.5244, 3.3792];
        toast.info("Using simulated location (Geolocation restricted in preview)");
        setUserLocation(mockLoc);
        setIsLocating(false);
        setSearchQuery("Simulated Location (Lagos Mainland)");
        calculateRoute(mockLoc, HUB_COORDS, travelMode);
      },
      { timeout: 10000, enableHighAccuracy: false }
    );
  };

  const handleSearchLocation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;
    setIsLocating(true);
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        const newLoc: [number, number] = [parseFloat(lat), parseFloat(lon)];
        setUserLocation(newLoc);
        setIsLocating(false);
        calculateRoute(newLoc, HUB_COORDS, travelMode);
      } else {
        toast.error("Location not found. Try a different city or address.");
        setIsLocating(false);
      }
    } catch {
      toast.error("Error searching location.");
      setIsLocating(false);
    }
  };

  useEffect(() => {
    if (userLocation) {
      calculateRoute(userLocation, HUB_COORDS, travelMode);
    }
  }, [travelMode]);

  const calculateRoute = async (start: [number, number], end: [number, number], mode: 'driving' | 'keke') => {
    setIsRouting(true);
    setSteps([]);
    try {
      const response = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson&steps=true`
      );
      const data = await response.json();
      if (data.code === 'Ok' && data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        const coordinates = route.geometry.coordinates.map((coord: number[]) => [coord[1], coord[0]] as [number, number]);
        setRoutePath(coordinates);
        if (mode === 'driving') {
          const newSteps = route.legs[0].steps.map((step: any, idx: number) => {
            let instruction = step.maneuver.type;
            if (step.name) instruction += ` onto ${step.name}`;
            return localiseInstruction(instruction.replace(/_/g, ' '), step.distance, idx, route.legs[0].steps.length);
          });
          newSteps.push("Arrive at AfriScience Hub HQ");
          setSteps(newSteps);
        } else {
          const kekeSteps = generateKekeInstructions(route.legs[0].steps);
          setSteps(kekeSteps);
        }
      } else {
        toast.error("Could not calculate driving route.");
      }
    } catch {
      setRoutePath([start, end]);
      setSteps(["Head towards destination (Routing unavailable)"]);
    } finally {
      setIsRouting(false);
    }
  };

  return (
    <div className="rounded-2xl border border-neutral-gray-light bg-white overflow-hidden shadow-sm flex flex-col h-[600px] sm:h-[700px]">
      <div className="p-4 bg-white border-b border-neutral-gray-light z-10 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-neutral-black flex items-center gap-2">
            <Navigation className="h-5 w-5 text-brand-red-600" />
            Get Directions
          </h3>
          <div className="flex items-center gap-1 bg-neutral-bg-light p-1 rounded-lg">
            <button
              onClick={() => setTravelMode('driving')}
              className={`p-1.5 rounded-md transition-all ${travelMode === 'driving' ? 'bg-white shadow-sm text-brand-red-600' : 'text-slate-500 hover:text-slate-700'}`}
              title="Driving Directions"
            >
              <Car className="h-4 w-4" />
            </button>
            <button
              onClick={() => setTravelMode('keke')}
              className={`p-1.5 rounded-md transition-all ${travelMode === 'keke' ? 'bg-white shadow-sm text-brand-red-600' : 'text-slate-500 hover:text-slate-700'}`}
              title="Local / Keke Directions"
            >
              <Bus className="h-4 w-4" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSearchLocation} className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Enter your location..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 text-sm focus:border-brand-red-600 focus:outline-none focus:ring-2 focus:ring-brand-red-600/20"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          </div>
          <Button type="submit" disabled={isLocating} className="bg-brand-red-600 hover:bg-brand-red-700">
            {isLocating ? '...' : 'Go'}
          </Button>
        </form>

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-full gap-2 text-slate-600 hover:text-brand-red-600"
          onClick={handleUseCurrentLocation}
          disabled={isLocating}
        >
          <Crosshair className="h-4 w-4" />
          Use My Current Location
        </Button>
      </div>

      <div className="flex-1 relative bg-slate-100 min-h-[400px] z-0">
        <div ref={mapContainerRef} style={{ height: "100%", width: "100%" }} />
      </div>

      {steps.length > 0 && (
        <div className="h-48 overflow-y-auto border-t border-slate-200 bg-slate-50 p-4">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3 sticky top-0 bg-slate-50 py-1 flex items-center justify-between">
            <span>{travelMode === 'keke' ? 'Local Commute Guide' : 'Driving Directions'}</span>
            <span className="text-[10px] bg-slate-200 px-2 py-0.5 rounded-full text-slate-600">{steps.length} Steps</span>
          </h4>
          <ol className="space-y-4">
            {steps.map((step, idx) => (
              <li key={idx} className="flex gap-3 text-sm text-slate-700">
                <span className={`flex-shrink-0 h-6 w-6 rounded-full border flex items-center justify-center text-xs font-bold ${
                  idx === 0 || idx === steps.length - 1
                    ? 'bg-brand-red-100 text-brand-red-600 border-brand-red-600/20'
                    : 'bg-white text-slate-400 border-slate-200'
                }`}>
                  {idx + 1}
                </span>
                <span className="capitalize leading-snug pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
