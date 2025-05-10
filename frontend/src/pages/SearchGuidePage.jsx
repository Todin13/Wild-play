/*

Search Guide Page
Author: ODIN Thomas

*/
import MainLayout from "@/layouts/MainLayout";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGuideSearch } from "@/hooks/GuideHooks";
import MountainSVG from "@/assets/images/mountain-svg";
import Title from "@/components/ui/Titles";
import Button from "@/components/ui/Buttons";

const GuideSearchPage = () => {
  const initialFilters = {
    location: "",
    duration: "",
    startDate: "",
    endDate: "",
    title: "",
    sortBy: "creation_date",
    order: "desc",
  };

  const [filters, setFilters] = useState(initialFilters);
  const [page, setPage] = useState(1);
  const guidesPerPage = 24;

  const { guides, loading, error, refetch } = useGuideSearch(
    filters,
    page,
    guidesPerPage
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    setPage(1); // Reset to first page on new search
    refetch();
  };

  const handleResetFilters = () => {
    setFilters(initialFilters); // Reset filters to their initial values
    setPage(1); // Reset to first page
    refetch(); // Refetch with default filters (optional depending on behavior)
  };

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 1));

  const startIndex = (page - 1) * guidesPerPage;
  const currentGuides = guides.slice(startIndex, startIndex + guidesPerPage);
  const totalPages = Math.ceil(guides.length / guidesPerPage);

  return (
    <MainLayout>
      {/* Fixed Mountain Background at Bottom */}
      <div className="fixed bottom-0 left-0 w-full z-[-1] pointer-events-none transform xl:translate-y-[30%]">
        <MountainSVG className="w-full h-auto object-cover text-mountain-deepgreen" />
      </div>

      <section className="relative z-10 px-4 lg:px-12 py-12 flex flex-col xl:flex-row gap-12 mx-auto xl:min-w-[90vw] max-w-screen-xl">
        {/* Left: Sticky Search Panel */}
        <aside className="w-full xl:w-1/4 top-24 self-start xl:block">
          <div className="bg-intro-card/70 backdrop-blur-md border border-gray-200 rounded-2xl shadow-2xl p-6 lg:p-8 space-y-6">
            <Title variant="section" className="text-center">
              Filter Guides
            </Title>

            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="title"
                  className="text-sm font-semibold text-gray-700"
                >
                  Title
                </label>
                <input
                  id="title"
                  name="title"
                  value={filters.title}
                  onChange={handleChange}
                  placeholder="Title"
                  className="border p-3 rounded-lg w-full"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="location"
                  className="text-sm font-semibold text-gray-700"
                >
                  Location
                </label>
                <input
                  id="location"
                  name="location"
                  value={filters.location}
                  onChange={handleChange}
                  placeholder="Location"
                  className="border p-3 rounded-lg w-full"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="duration"
                  className="text-sm font-semibold text-gray-700"
                >
                  Min Duration (days)
                </label>
                <input
                  id="duration"
                  name="duration"
                  value={filters.duration}
                  onChange={handleChange}
                  placeholder="Min Duration"
                  type="number"
                  className="border p-3 rounded-lg w-full"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="startDate"
                  className="text-sm font-semibold text-gray-700"
                >
                  Start Date
                </label>
                <input
                  id="startDate"
                  name="startDate"
                  value={filters.startDate}
                  onChange={handleChange}
                  placeholder="Start Date"
                  type="date"
                  className="border p-3 rounded-lg w-full"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="endDate"
                  className="text-sm font-semibold text-gray-700"
                >
                  End Date
                </label>
                <input
                  id="endDate"
                  name="endDate"
                  value={filters.endDate}
                  onChange={handleChange}
                  placeholder="End Date"
                  type="date"
                  className="border p-3 rounded-lg w-full"
                />
              </div>

              <div className="flex gap-2">
                <div className="space-y-2 w-full">
                  <label
                    htmlFor="sortBy"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Sort By
                  </label>
                  <select
                    id="sortBy"
                    name="sortBy"
                    value={filters.sortBy}
                    onChange={handleChange}
                    className="border p-3 rounded-lg w-full"
                  >
                    <option value="creation_date">Creation Date</option>
                    <option value="duration">Duration</option>
                    <option value="title">Title</option>
                  </select>
                </div>

                <div className="space-y-2 w-full">
                  <label
                    htmlFor="order"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Order
                  </label>
                  <select
                    id="order"
                    name="order"
                    value={filters.order}
                    onChange={handleChange}
                    className="border p-3 rounded-lg w-full"
                  >
                    <option value="desc">Desc</option>
                    <option value="asc">Asc</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Center the buttons for small screens */}
            <div className="flex flex-col gap-4 xl:flex-row xl:justify-between">
              <div className="flex justify-center w-full xl:w-auto gap-4">
                <Button variant="primary" onClick={handleSearch}>
                  Search
                </Button>
                <Button
                  variant="primary"
                  onClick={handleResetFilters}
                  className="hover:bg-blue-600"
                >
                  Reset Filters
                </Button>
              </div>
            </div>
          </div>
        </aside>

        {/* Right: Results List */}
        <div className="w-full xl:w-3/4">
          <Title
            variant="section"
            className="text-center mb-6 flex items-center justify-center gap-4 bg-white/80 backdrop-blur-md rounded-xl shadow-lg hover:shadow-xl p-3 text-deepgreen"
          >
            Matching Guides
          </Title>

          {loading ? (
            <p className="text-lg text-center">Loading guides...</p>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : currentGuides.length === 0 ? (
            <p className="text-center text-gray-700">No guides found.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentGuides.map((guide) => (
                  <Link to="/guides" state={{ guide: guide }} key={guide._id}>
                    <div
                      className="
                p-6
                border
                bg-white/80
                backdrop-blur-md
                rounded-2xl
                shadow-lg
                hover:shadow-xl
                transition
                h-full         /* stretch to fill grid-cell */
                flex
                flex-col
              "
                    >
                      <h2 className="text-xl font-semibold text-deepgreen">
                        {guide.title}
                      </h2>
                      <p className="text-sm text-gray-600">
                        Duration: {guide.duration} days | Created:{" "}
                        {new Date(guide.creation_date).toLocaleDateString()}
                      </p>

                      {/* group description + notes */}
                      <div className="flex flex-col">
                        <p className="text-gray-800 mt-2">
                          {guide.description}
                        </p>
                        {guide.notes && (
                          <p className="text-sm text-gray-600 mt-1">
                            <strong>Notes:</strong>{" "}
                            {Array.isArray(guide.notes)
                              ? guide.notes.join(" | ")
                              : guide.notes}
                          </p>
                        )}
                      </div>

                      {/* filler pushes all above to top, equalising card height */}
                      <div className="flex-grow" />
                    </div>
                  </Link>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center mt-10 gap-4 items-center">
                  <Button
                    variant="secondary"
                    disabled={page === 1}
                    onClick={handlePrevPage}
                  >
                    Previous
                  </Button>
                  <span className="text-gray-700 text-lg">
                    Page {page} of {totalPages}
                  </span>
                  <Button
                    variant="secondary"
                    disabled={page === totalPages}
                    onClick={handleNextPage}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default GuideSearchPage;
