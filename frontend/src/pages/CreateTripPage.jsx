import { useState, useEffect, useRef } from "react";
import MainLayout from "@/layouts/MainLayout";
import { useAddTrip, useUpdateTrip } from "@/hooks/TripHooks";
import "@/assets/styles/index.css";
import { useLocation } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import useNavigationHooks from "@/hooks/NavigationHooks";

import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  Tooltip,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import {
  DragOverlay,
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const defaultIcon = L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const locationIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png", // Search result icon (green)
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const largerIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png", // Search result icon (green)
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
  iconSize: [30, 49],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Helper to capture map instance
const SetMapRef = ({ setMap }) => {
  const map = useMap();
  setMap(map);
  return null;
};

const LocationPicker = ({ onSelect }) => {
  useMapEvents({
    click(e) {
      onSelect(e.latlng);
    },
  });
  return null;
};

const SortableLocationItem = ({
  id,
  index,
  location,
  handleLocationChange,
  removeLocation,
  sectionLocationCount,
}) => {
  const { attributes, listeners, setNodeRef, transform } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: undefined,
    pointerEvents: transform ? "none" : "auto",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative space-y-2 border p-4 rounded-lg bg-gray-50 cursor-move"
    >
      <div className="flex justify-between items-center">
        <input
          name="name"
          value={location.name}
          onChange={(e) => handleLocationChange(e, index)}
          placeholder="Name"
          className="w-full p-3 border rounded"
          required
        />

        {sectionLocationCount > 1 && (
          <button
            type="button"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => {
              removeLocation(index);
            }}
            className="text-red-500 font-bold cursor-pointer text-xl ml-4"
          >
            ×
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <input
          type="number"
          name="lat"
          value={location.lat}
          onChange={(e) => handleLocationChange(e, index)}
          placeholder="Latitude"
          className="p-3 border rounded"
          required
        />
        <input
          type="number"
          name="lon"
          value={location.lon}
          onChange={(e) => handleLocationChange(e, index)}
          placeholder="Longitude"
          className="p-3 border rounded"
          required
        />
      </div>

      <input
        name="info"
        value={location.info}
        onChange={(e) => handleLocationChange(e, index)}
        placeholder="Optional Info"
        className="w-full p-3 border rounded"
      />
    </div>
  );
};

const SectionGroup = ({
  sectionName,
  group,
  setTripData,
  handleLocationChange,
  totalLocations,
  moveSection,
}) => {
  const [tempSectionName, setTempSectionName] = useState(sectionName);

  const commitSectionNameChange = () => {
    setTripData((prev) => {
      const updatedLocations = [...prev.locations];
      group.forEach(({ index }) => {
        updatedLocations[index] = {
          ...updatedLocations[index],
          section: tempSectionName,
        };
      });
      return { ...prev, locations: updatedLocations };
    });
  };

  const deleteSection = () => {
    setTripData((prev) => ({
      ...prev,
      locations: prev.locations.filter((loc) => loc.section !== sectionName),
    }));
  };

  const removeLocation = (indexToRemove) => {
    setTripData((prev) => ({
      ...prev,
      locations: prev.locations.filter((_, index) => index !== indexToRemove),
    }));
  };

  const addLocationToSection = () => {
    setTripData((prev) => ({
      ...prev,
      locations: [
        ...prev.locations,
        {
          section: tempSectionName,
          name: "",
          lat: "",
          lon: "",
          info: "",
        },
      ],
    }));
  };

  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="mb-6 border-b pb-4">
      <div className="flex justify-between items-center mb-2">
        <input
          type="text"
          value={tempSectionName}
          onChange={(e) => setTempSectionName(e.target.value)}
          onBlur={commitSectionNameChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              commitSectionNameChange();
              e.target.blur();
            }
          }}
          className="text-xl font-bold text-gray-700 bg-transparent border-b focus:outline-none"
          placeholder="Section Name"
        />

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsCollapsed((prev) => !prev)}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            {isCollapsed ? "▶ Expand" : "▼ Collapse"}
          </button>

          <button
            type="button"
            onClick={() => moveSection(sectionName, "up")}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            ↑ Move Up
          </button>
          <button
            type="button"
            onClick={() => moveSection(sectionName, "down")}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            ↓ Move Down
          </button>

          <button
            type="button"
            onClick={deleteSection}
            className="text-red-500 hover:text-red-700 text-sm font-semibold"
          >
            Delete Section
          </button>
        </div>
      </div>

      {!isCollapsed && (
        <>
          <SortableContext
            items={group.map(({ index }) => `${sectionName}-${index}`)}
            strategy={verticalListSortingStrategy}
          >
            {group.map(({ location, index }) => (
              <SortableLocationItem
                key={`${sectionName}-${index}`}
                id={`${sectionName}-${index}`}
                index={index}
                location={location}
                handleLocationChange={handleLocationChange}
                removeLocation={removeLocation}
                sectionLocationCount={group.length}
              />
            ))}
          </SortableContext>

          <button
            type="button"
            onClick={addLocationToSection}
            className="mt-2 text-sm text-blue-600 hover:text-blue-800"
          >
            + Add Location
          </button>
        </>
      )}
    </div>
  );
};

const CreateTripPage = () => {
  const location = useLocation();
  const { trip } = location.state || {};
  const isEditing = trip && Object.keys(trip).length > 0;

  const { goToTripDetail } = useNavigationHooks();

  const mapDivRef = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(true);
  const [searchMarkers, setSearchMarkers] = useState([]);
  const [selectedSearchIdx, setSelectedSearchIdx] = useState(0);
  const [selectedSearchPlace, setSelectedSearchPlace] = useState(null);
  const [placeDetailsMap, setPlaceDetailsMap] = useState({});

  const { addTrip, addTripLoading, addTripError } = useAddTrip();
  const { updateTrip, updateLoading, updateError } = useUpdateTrip();

  const [tripData, setTripData] = useState({
    title: isEditing ? trip.title : "",
    start_date:
      isEditing && trip.start_date ? trip.start_date.slice(0, 10) : "",
    end_date: isEditing && trip.end_date ? trip.end_date.slice(0, 10) : "",
    locations: isEditing
      ? [
          ...trip.locations,
          { name: "", section: "", lat: "", lon: "", info: "" },
        ]
      : [{ name: "", section: "", lat: "", lon: "", info: "" }],
    notes: isEditing ? trip.notes : [],
    van_id: isEditing ? trip.van_id : "",
    van_booked: isEditing ? trip.van_booked : false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTripData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLocationChange = (e, index) => {
    const { name, value } = e.target;
    const updated = [...tripData.locations];
    updated[index][name] = value;
    setTripData((prev) => ({ ...prev, locations: updated }));
  };

  const handleMarkerDragEnd = (idx, e) => {
    const { lat, lng } = e.target.getLatLng();
    setTripData((prev) => {
      const updated = [...prev.locations];
      updated[idx] = { ...updated[idx], lat, lon: lng };
      return { ...prev, locations: updated };
    });
  };

  const addNote = () => {
    setTripData((prev) => ({ ...prev, notes: [...prev.notes, ""] }));
  };

  const handleNoteChange = (e, index) => {
    const updated = [...tripData.notes];
    updated[index] = e.target.value;
    setTripData((prev) => ({ ...prev, notes: updated }));
  };

  const removeNote = (index) => {
    const updated = [...tripData.notes];
    updated.splice(index, 1);
    setTripData((prev) => ({ ...prev, notes: updated }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        const response = await updateTrip(trip._id, tripData);
        alert("Trip updated successfully!");
        goToTripDetail(response.trip);
      } else {
        const response = await addTrip(tripData);
        alert("Trip created successfully!");
        goToTripDetail(response.trip);
      }
    } catch (error) {
      const message =
        addTripError?.message ||
        updateError?.message ||
        error?.message ||
        "Something went wrong.";
      console.log(addTripError?.message);
      console.log(updateError?.message);
      console.log(error?.message);
      alert(message);
    }
  };

  const scrollToMap = () => {
    mapDivRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handlePlaceSearch = async () => {
    if (!searchQuery.trim() || !mapInstance) {
      setSearchResults([]);
      setSearchMarkers([]);
      return;
    }

    const bounds = mapInstance.getBounds();
    const viewbox = `${bounds.getSouthWest().lng},${
      bounds.getSouthWest().lat
    },${bounds.getNorthEast().lng},${bounds.getNorthEast().lat}`;

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          searchQuery
        )}&format=json&limit=20&viewbox=${viewbox}&bounded=1`
      );
      const data = await res.json();

      setSearchResults(data);
      setSearchMarkers(
        data.map((place) => ({
          lat: parseFloat(place.lat),
          lon: parseFloat(place.lon),
          display_name: place.display_name,
          osm_id: place.osm_id,
          osm_type: place.osm_type,
        }))
      );

      const details = await Promise.all(data.map(fetchPlaceDetails));
      const detailsMap = {};
      details.forEach((detail, idx) => {
        if (detail) {
          detailsMap[`${data[idx].osm_type}-${data[idx].osm_id}`] = detail;
        }
      });
      setPlaceDetailsMap(detailsMap);
    } catch (err) {
      console.error("Search failed:", err);
    }
  };

  const fetchPlaceDetails = async (place) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/lookup?format=json&osm_ids=${place.osm_type
          .charAt(0)
          .toUpperCase()}${place.osm_id}`
      );
      const data = await res.json();
      return data[0]; // Single result
    } catch (err) {
      console.error("Failed to fetch place details:", err);
      return null;
    }
  };

  useEffect(() => {
    const selected = searchResults[selectedSearchIdx];
    if (selected) {
      const key = `${selected.osm_type}-${selected.osm_id}`;
      const detail = placeDetailsMap[key];
      setSelectedSearchPlace({
        ...selected,
        detail,
      });
    }
  }, [selectedSearchIdx, searchResults, placeDetailsMap]);

  const selectPlaceFromSearch = (place) => {
    const updated = [...tripData.locations];
    const lastIndex = updated.length - 1;
    const lastLoc = updated[lastIndex];

    if (!lastLoc.lat && !lastLoc.lon) {
      // Fill in the empty last location
      updated[lastIndex] = {
        ...lastLoc,
        name: place.display_name,
        lat: parseFloat(place.lat),
        lon: parseFloat(place.lon),
      };
    } else {
      // Append a new filled location + a blank one
      updated.push({
        section: "",
        name: place.display_name,
        lat: parseFloat(place.lat),
        lon: parseFloat(place.lon),
      });
    }

    updated.push({
      section: "",
      name: "",
      lat: null,
      lon: null,
    });

    setTripData((prev) => ({ ...prev, locations: updated }));
    setSearchQuery("");
    setSearchResults([]);
    setSearchMarkers([]);
    setSelectedSearchPlace(null);
  };

  const addSection = () => {
    setTripData((prev) => {
      const existingSections = new Set(
        prev.locations.map((loc) => loc.section)
      );
      let sectionName = "New Section";
      let count = 1;

      while (existingSections.has(sectionName)) {
        sectionName = `New Section ${count++}`;
      }

      return {
        ...prev,
        locations: [
          ...prev.locations,
          {
            section: sectionName,
            name: "",
            lat: "",
            lon: "",
            info: "",
          },
        ],
      };
    });
  };

  const [activeId, setActiveId] = useState(null);
  const [activeLocation, setActiveLocation] = useState(null);

  const moveSection = (sectionName, direction) => {
    setTripData((prev) => {
      const locations = [...prev.locations];

      // Group locations by section
      const sections = [];
      let currentSection = null;
      locations.forEach((loc, idx) => {
        if (!currentSection || currentSection.name !== loc.section) {
          currentSection = { name: loc.section, start: idx, items: [] };
          sections.push(currentSection);
        }
        currentSection.items.push(loc);
      });

      const index = sections.findIndex((s) => s.name === sectionName);
      if (
        (direction === "up" && index === 0) ||
        (direction === "down" && index === sections.length - 1)
      ) {
        return prev; // Already at boundary
      }

      const newSections = [...sections];
      const swapWith = direction === "up" ? index - 1 : index + 1;
      [newSections[index], newSections[swapWith]] = [
        newSections[swapWith],
        newSections[index],
      ];

      const newLocations = newSections.flatMap((s) => s.items);
      return { ...prev, locations: newLocations };
    });
  };

  return (
    <MainLayout>
      <div className="w-full px-4 lg:px-12 py-16 mx-auto min-w-[95vw]">
        {/* <h2 className="text-3xl font-bold text-center text-voga-title lg:px-12">
          {isEditing ? "Update Trip" : "Create New Trip"}
        </h2> */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form Section */}
          <div className="w-full lg:w-[45%] bg-white p-8 rounded-3xl shadow-xl border border-gray-300 space-y-8 overflow-y-auto">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Trip Title as inline input */}
              <div className="text-3xl font-bold text-voga-title text-center">
                <input
                  name="title"
                  value={tripData.title}
                  onChange={handleInputChange}
                  placeholder="Trip Title"
                  className="bg-transparent border-b border-gray-400 focus:outline-none focus:border-voga-accent text-3xl font-bold w-full text-center"
                  required
                />
              </div>

              {/* Start & End Dates */}
              <div className="grid grid-cols-2 gap-6">
                <input
                  type="date"
                  name="start_date"
                  value={tripData.start_date}
                  onChange={handleInputChange}
                  className="w-full p-4 border rounded-lg"
                  required
                />
                <input
                  type="date"
                  name="end_date"
                  value={tripData.end_date}
                  onChange={handleInputChange}
                  className="w-full p-4 border rounded-lg"
                  required
                />
              </div>

              {/* Van Booked */}
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="van_booked"
                  checked={tripData.van_booked}
                  onChange={(e) =>
                    setTripData({ ...tripData, van_booked: e.target.checked })
                  }
                />
                Van Booked
              </label>

              {/* Locations Section */}
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-semibold text-voga-title">
                    Locations
                  </h3>
                  <button
                    type="button"
                    className="text-blue-500 underline text-sm block lg:hidden"
                    onClick={scrollToMap}
                  >
                    Go to Map
                  </button>
                </div>

                <DndContext
                  sensors={useSensors(useSensor(PointerSensor))}
                  collisionDetection={closestCenter}
                  onDragStart={({ active }) => {
                    setActiveId(active.id);

                    const [, indexStr] = active.id.split("-");
                    const index = parseInt(indexStr, 10);

                    setActiveLocation(tripData.locations[index]);
                  }}
                  onDragCancel={() => {
                    setActiveId(null);
                    setActiveLocation(null);
                  }}
                  onDragEnd={({ active, over }) => {
                    setActiveId(null);
                    setActiveLocation(null);

                    if (!over || active.id === over.id) return;

                    const [fromSection, fromIndexStr] = active.id.split("-");
                    const [toSection, toIndexStr] = over.id.split("-");
                    const fromIndex = parseInt(fromIndexStr, 10);
                    const toIndex = parseInt(toIndexStr, 10);

                    setTripData((prev) => {
                      const itemToMove = { ...prev.locations[fromIndex] };
                      const updated = [...prev.locations];
                      updated.splice(fromIndex, 1); // remove from old spot

                      itemToMove.section = toSection;
                      updated.splice(toIndex, 0, itemToMove); // insert into new section/position

                      return { ...prev, locations: updated };
                    });
                  }}
                >
                  <SortableContext
                    items={tripData.locations.map((_, index) =>
                      index.toString()
                    )}
                    strategy={verticalListSortingStrategy}
                  >
                    {Object.entries(
                      tripData.locations.reduce((groups, loc, idx) => {
                        const section = loc.section;
                        if (!groups[section]) groups[section] = [];
                        groups[section].push({ location: loc, index: idx });
                        return groups;
                      }, {})
                    ).map(([sectionName, group]) => (
                      <SectionGroup
                        key={sectionName}
                        sectionName={sectionName}
                        group={group}
                        setTripData={setTripData}
                        handleLocationChange={handleLocationChange}
                        totalLocations={tripData.locations.length}
                        moveSection={moveSection}
                      />
                    ))}
                  </SortableContext>
                  <DragOverlay>
                    {activeLocation ? (
                      <div className="relative space-y-2 border p-4 rounded-lg bg-gray-50 cursor-move">
                        <div className="flex justify-between items-center">
                          <input
                            name="name"
                            value={activeLocation.name || ""}
                            onChange={(e) =>
                              handleLocationChange(e, activeLocation.index)
                            }
                            placeholder="Name"
                            className="w-full p-3 border rounded"
                            required
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <input
                            type="number"
                            name="lat"
                            value={activeLocation.lat || ""}
                            onChange={(e) =>
                              handleLocationChange(e, activeLocation.index)
                            }
                            placeholder="Latitude"
                            className="p-3 border rounded"
                            required
                          />
                          <input
                            type="number"
                            name="lon"
                            value={activeLocation.lon || ""}
                            onChange={(e) =>
                              handleLocationChange(e, activeLocation.index)
                            }
                            placeholder="Longitude"
                            className="p-3 border rounded"
                            required
                          />
                        </div>

                        <input
                          name="info"
                          value={activeLocation.info || ""}
                          onChange={(e) =>
                            handleLocationChange(e, activeLocation.index)
                          }
                          placeholder="Optional Info"
                          className="w-full p-3 border rounded"
                        />
                      </div>
                    ) : null}
                  </DragOverlay>
                </DndContext>

                <button
                  type="button"
                  onClick={addSection}
                  className="px-4 py-2 bg-voga-accent text-white rounded hover:bg-voga-accent-dark"
                >
                  Add Section
                </button>
              </div>

              {/* Notes */}
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-voga-title">
                  Notes
                </h3>
                {tripData.notes.map((note, index) => (
                  <div key={index} className="relative">
                    <textarea
                      value={note}
                      onChange={(e) => handleNoteChange(e, index)}
                      className="w-full p-4 border rounded-lg"
                      placeholder={`Note ${index + 1}`}
                    />
                    <div
                      onClick={() => removeNote(index)}
                      className="absolute top-0 right-0 text-red-500 font-bold cursor-pointer text-xl"
                    >
                      ×
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addNote}
                  className="px-4 py-2 bg-voga-accent text-white rounded hover:bg-voga-accent-dark"
                >
                  Add Note
                </button>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={addTripLoading || updateLoading}
                  className="px-6 py-3 text-xl font-semibold bg-voga-accent text-white rounded-lg hover:bg-voga-accent-dark disabled:opacity-60"
                >
                  {addTripLoading || updateLoading
                    ? isEditing
                      ? "Updating..."
                      : "Creating..."
                    : isEditing
                    ? "Update Trip"
                    : "Create Trip"}
                </button>
              </div>
            </form>
          </div>

          {/* Map Section */}
          <div
            ref={mapDivRef}
            className="w-full lg:w-[60%] sticky top-36 h-[50vh] lg:h-[80vh] rounded-3xl overflow-hidden border shadow-md relative z-0"
          >
            <div className="absolute top-4 right-4 z-[1000] w-[90%] max-w-md bg-white rounded-lg shadow-lg p-4">
              <div className="flex items-center relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handlePlaceSearch()}
                  placeholder="Search places like 'camping', 'restaurant'..."
                  className="w-full p-2 border rounded pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowSearchResults((prev) => !prev)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-black"
                >
                  {showSearchResults ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>

              {showSearchResults && searchResults.length > 0 && (
                <ul className="mt-2 max-h-40 overflow-y-auto border rounded">
                  {searchResults.map((place, idx) => (
                    <li
                      key={idx}
                      onClick={() => {
                        setSelectedSearchIdx(idx); // ← sets the correct index
                        const key = `${place.osm_type}-${place.osm_id}`;
                        const detail = placeDetailsMap[key];
                        setSelectedSearchPlace({
                          ...place,
                          detail,
                        });
                      }}
                      className="cursor-pointer p-2 hover:bg-gray-100"
                    >
                      {place.display_name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <MapContainer center={[20, 0]} zoom={2} className="w-full h-full">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />
              <SetMapRef setMap={setMapInstance} />
              <LocationPicker
                onSelect={(latlng) => {
                  const updated = [...tripData.locations];
                  const lastIndex = updated.length - 1;
                  updated[lastIndex].lat = latlng.lat;
                  updated[lastIndex].lon = latlng.lng;
                  setTripData((prev) => ({ ...prev, locations: updated }));
                }}
              />
              {tripData.locations.map((loc, idx) =>
                loc.lat && loc.lon ? (
                  <Marker key={idx} position={[loc.lat, loc.lon]} />
                ) : null
              )}
              {tripData.locations.map((loc, idx) =>
                loc.lat || loc.lon ? (
                  <Marker
                    key={idx}
                    position={[loc.lat, loc.lon]}
                    icon={locationIcon} // Use searchIcon for search result markers
                    draggable={true}
                    eventHandlers={{
                      dragend: (e) => handleMarkerDragEnd(idx, e),
                    }}
                  />
                ) : null
              )}
              {searchMarkers.map((place, idx) => (
                <Marker
                  key={`search-${idx}`}
                  position={[place.lat, place.lon]}
                  icon={idx === selectedSearchIdx ? largerIcon : defaultIcon}
                  eventHandlers={{
                    click: () => {
                      setSelectedSearchIdx(idx);
                      const key = `${place.osm_type}-${place.osm_id}`;
                      const detail = placeDetailsMap[key];
                      setSelectedSearchPlace({
                        ...place,
                        detail,
                      });
                    },
                  }}
                >
                  <Tooltip>{place.display_name}</Tooltip>
                </Marker>
              ))}
            </MapContainer>

            {selectedSearchPlace && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-[90%] h-auto min-h-[15%] max-h-[30%] bg-white/90 backdrop-blur-md shadow-lg rounded-xl px-6 py-4 flex items-center justify-between z-[1000]">
                <div className="w-full">
                  <div className="flex justify-between items-center mb-2">
                    <button
                      onClick={() =>
                        setSelectedSearchIdx((prev) =>
                          prev > 0 ? prev - 1 : searchResults.length - 1
                        )
                      }
                      className="text-gray-600 hover:text-black"
                    >
                      ◀
                    </button>
                    <h3 className="text-md font-semibold text-center flex-1 text-emerald-800 mx-2">
                      {selectedSearchPlace.display_name}
                    </h3>
                    <button
                      onClick={() =>
                        setSelectedSearchIdx((prev) =>
                          prev < searchResults.length - 1 ? prev + 1 : 0
                        )
                      }
                      className="text-gray-600 hover:text-black"
                    >
                      ▶
                    </button>
                  </div>

                  {selectedSearchPlace.detail?.type && (
                    <p className="text-sm text-gray-600 mb-1">
                      Type: {selectedSearchPlace.detail.type}
                    </p>
                  )}
                  {selectedSearchPlace.detail?.address && (
                    <p className="text-sm text-gray-600">
                      {Object.values(selectedSearchPlace.detail.address).join(
                        ", "
                      )}
                    </p>
                  )}
                </div>
                <div className="flex flex-col space-y-2 ml-4">
                  <button
                    onClick={() =>
                      selectPlaceFromSearch({
                        display_name: selectedSearchPlace.display_name,
                        lat: selectedSearchPlace.lat,
                        lon: selectedSearchPlace.lon,
                      })
                    }
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-1 rounded"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => setSelectedSearchPlace(null)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-1 rounded"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CreateTripPage;
