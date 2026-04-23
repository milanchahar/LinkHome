import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Coffee, School, TrainFront, Utensils, ShoppingBag, Hospital, Bus } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
const MapController = ({ activeCenter }) => {
    const map = useMap();
    useEffect(() => {
        if (activeCenter) {
            map.flyTo(activeCenter, 14, { animate: true, duration: 1.5 });
        }
    }, [activeCenter, map]);
    return null;
};

const BrowseMap = ({ listings, activeId, onMarkerClick }) => {
    const [activeLayer, setActiveLayer] = useState("Standard");

    const mapCenter = [12.9716, 77.5946];

    const poiData = useMemo(() => ({
        Lifestyle: [
            { id: 'l1', type: 'Coffee', lat: 12.975, lng: 77.590, name: "Blue Tokai" },
            { id: 'l2', type: 'Utensils', lat: 12.980, lng: 77.600, name: "The Pallet" },
            { id: 'l3', type: 'ShoppingBag', lat: 12.965, lng: 77.585, name: "Nexus Mall" },
        ],
        Essentials: [
            { id: 'e1', type: 'School', lat: 12.970, lng: 77.605, name: "NPS School" },
            { id: 'e2', type: 'Hospital', lat: 12.960, lng: 77.595, name: "Manipal Hospital" },
        ],
        Transit: [
            { id: 't1', type: 'TrainFront', lat: 12.985, lng: 77.610, name: "Indiranagar Metro" },
            { id: 't2', type: 'Bus', lat: 12.968, lng: 77.580, name: "Volvo Bus Stop" },
        ]
    }), []);

    const getPoiIconSvg = (type) => {
        switch (type) {
            case 'Coffee': return `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" x2="6" y1="2" y2="4"/><line x1="10" x2="10" y1="2" y2="4"/><line x1="14" x2="14" y1="2" y2="4"/></svg>`;
            case 'Utensils': return `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>`;
            case 'ShoppingBag': return `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`;
            case 'School': return `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m4 6 8-4 8 4"/><path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2"/><path d="M14 22v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4"/><path d="M18 5v17"/><path d="M6 5v17"/><circle cx="12" cy="9" r="2"/></svg>`;
            case 'Hospital': return `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6v4"/><path d="M14 14h-4"/><path d="M14 18h-4"/><path d="M14 8h-4"/><path d="M18 12h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2h2v-2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2Z"/></svg>`;
            case 'TrainFront': return `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3.1V7a4 4 0 0 0 8 0V3.1"/><path d="m9 15-1-1"/><path d="m15 15 1-1"/><path d="M9 19c-2.8 0-5-2.2-5-5v-4a8 8 0 0 1 16 0v4c0 2.8-2.2 5-5 5Z"/><path d="m8 19-2 3"/><path d="m16 19 2 3"/></svg>`;
            case 'Bus': return `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6v6"/><path d="M15 6v6"/><path d="M2 12h19.6"/><path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>`;
            default: return `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`;
        }
    };

    const createPoiIcon = (type, name) => {
        return L.divIcon({
            className: 'custom-poi-icon',
            html: `
                <div class="group relative">
                    <div class="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-black/80 transition-all cursor-help shadow-lg">
                        ${getPoiIconSvg(type)}
                    </div>
                    <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                        <div class="bg-black border border-white/10 px-3 py-1.5 rounded-lg shadow-2xl">
                            <span class="text-[10px] font-bold text-white uppercase tracking-widest">${name}</span>
                        </div>
                    </div>
                </div>
            `,
            iconSize: [32, 32],
            iconAnchor: [16, 16],
        });
    };

    const createPropertyIcon = (active, price) => {
        return L.divIcon({
            className: 'custom-property-icon',
            html: `
                <div class="relative group z-${active ? '50' : '10'}">
                    ${active ? `
                    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-black/10 rounded-full border-2 border-black/30 -z-10 animate-pulse"></div>
                    ` : ''}
                    <div class="w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-xl ${active ? "bg-black shadow-black/40 scale-110" : "bg-white border border-black/10 hover:bg-black/5"}">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${active ? 'white' : 'black'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    </div>
                    ${active ? `
                    <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 whitespace-nowrap z-50">
                        <div class="bg-white px-4 py-2 border border-black/10 rounded-xl shadow-2xl">
                            <p class="text-[10px] font-black uppercase text-black tracking-widest">₹${price}</p>
                        </div>
                        <div class="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white mx-auto filter drop-shadow-md"></div>
                    </div>
                    ` : ''}
                </div>
            `,
            iconSize: [40, 40],
            iconAnchor: [20, 20],
        });
    };

    const activeListing = useMemo(() => {
        return listings.find(l => l.id === activeId);
    }, [listings, activeId]);

    const activeCenter = useMemo(() => {
        if (!activeListing) return null;
        const lat = 12.9716 + ((activeListing.id * 137) % 100 - 50) * 0.001;
        const lng = 77.5946 + ((activeListing.id * 223) % 100 - 50) * 0.001;
        return [lat, lng];
    }, [activeListing]);

    return (
        <div className="w-full h-full relative overflow-hidden rounded-[2.5rem] border border-black/5 shadow-inner bg-[#fbfbf9]">
            {/* Neighborhood Layers Selector */}
            <div className="absolute top-8 left-8 right-8 z-[1000] flex gap-2 overflow-x-auto pb-4 custom-scrollbar">
                {["Standard", "Lifestyle", "Essentials", "Transit"].map((layer) => (
                    <button
                        key={layer}
                        onClick={() => setActiveLayer(layer)}
                        className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all border shadow-sm ${activeLayer === layer ? "bg-black border-black text-white shadow-lg shadow-black/20" : "bg-white/90 backdrop-blur-md border-black/5 text-black/60 hover:text-black hover:border-black/20"}`}
                    >
                        {layer}
                    </button>
                ))}
            </div>

            <MapContainer
                center={mapCenter}
                zoom={13}
                className="w-full h-full z-0"
                zoomControl={false}
            >
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                />

                <MapController activeCenter={activeCenter} />

                {activeLayer !== "Standard" && poiData[activeLayer]?.map((poi) => (
                    <Marker
                        key={poi.id}
                        position={[poi.lat, poi.lng]}
                        icon={createPoiIcon(poi.type, poi.name)}
                    />
                ))}

                {/* Property Markers */}
                {listings.map((listing) => {
                    // Generate stable fake coordinates around Bangalore for mock purposes
                    const lat = 12.9716 + ((listing.id * 137) % 100 - 50) * 0.001;
                    const lng = 77.5946 + ((listing.id * 223) % 100 - 50) * 0.001;

                    return (
                        <Marker
                            key={listing.id}
                            position={[lat, lng]}
                            icon={createPropertyIcon(activeId === listing.id, listing.price)}
                            eventHandlers={{
                                click: () => onMarkerClick(listing.id)
                            }}
                            zIndexOffset={activeId === listing.id ? 1000 : 0}
                        />
                    );
                })}
            </MapContainer>

            <div className="absolute top-0 right-0 w-64 h-64 bg-black/5 blur-[100px] pointer-events-none rounded-full z-10" />

        </div>
    );
};

export default BrowseMap;
