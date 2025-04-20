import React, { useState, useEffect } from "react";
import SearchBar from "@/components/ui/SearchBar";
import SearchResults from "@/components/SearchResults";
import ResultCard from "@/components/ui/ResultCard";
import MainLayout from "@/layouts/MainLayout";


export default function SearchPage() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Default data state (without trips)
  const [defaultData, setDefaultData] = useState({
    vans: [],
    vanReviews: [],
    guideReviews: [],
    deals: [],
    guides: []
  });
  const [defaultLoading, setDefaultLoading] = useState(true);
  const [defaultError, setDefaultError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Fetch default (first 3) items per category on mount
  useEffect(() => {
    async function loadDefaults() {
      try {
        const [vansRes, dealsRes, guidesRes] = await Promise.all([
          fetch("http://localhost:5050/api/campers"),
          fetch("http://localhost:5050/api/deals"),
          fetch("http://localhost:5050/api/guides")
        ]);
        if (!vansRes.ok || !dealsRes.ok || !guidesRes.ok) {
          throw new Error("Failed to fetch default data");
        }
        const vansData = await vansRes.json();
        const dealsData = await dealsRes.json();
        const guidesData = await guidesRes.json();

        // Normalize arrays
        const vansList = Array.isArray(vansData.campers) ? vansData.campers : [];
        const dealsList = Array.isArray(dealsData.deals)
          ? dealsData.deals
          : Array.isArray(dealsData)
          ? dealsData
          : [];
        const guidesList = Array.isArray(guidesData.guides)
          ? guidesData.guides
          : Array.isArray(guidesData)
          ? guidesData
          : [];

        setDefaultData({
          vans: vansList.slice(0, 3),
          vanReviews: [],
          guideReviews: [],
          deals: dealsList.slice(0, 3),
          guides: guidesList.slice(0, 3)
        });
      } catch (err) {
        console.error(err);
        setDefaultError(err.message);
      } finally {
        setDefaultLoading(false);
      }
    }
    loadDefaults();
  }, []);

  const handleSearch = async () => {
    if (!keyword) return;
    setHasSearched(true);
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const res = await fetch(
        `http://localhost:5050/api/search?keyword=${encodeURIComponent(keyword)}`
      );
      const data = await res.json();
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout> 

      {/* Outer wrapper to contain both background and content */}
      <div className="relative min-h-screen bg-gray-50 overflow-hidden">
        {/* Pyramid SVG background covering entire wrapper */}
        {/* Pyramid SVG background */}
                {/* Pyramid SVG background covering entire wrapper */}
        <div className="absolute bottom-0 inset-0 pointer-events-none blur-sm">
          <svg
            className="w-full h-full"
            viewBox="0 0 1662 2437"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Largest pyramid covering full width */}
            <polygon points="0,2437 831,100 1662,2437" fill="#c4d4c9" />
            {/* Medium pyramid shifted left */}
            <polygon points="-200,2300 600,150 1400,2300" fill="#2a5d4d" />
            {/* Smallest pyramid shifted right */}
            <polygon points="200,2500 1000,200 1800,2500" fill="#3e7f4d" />
          </svg>
        </div>

        <main>
          {/* Search Bar Container */}
          <div className="w-1/2 mx-auto mt-10 mb-6">
            <SearchBar
              keyword={keyword}
              setKeyword={setKeyword}
              onSearch={handleSearch}
            />
          </div>


          {/* Results Container */}
          <div className="p-6 mx-20">
            {hasSearched ? (
              <SearchResults
                results={results}
                loading={loading}
                error={error}
              />
            ) : defaultLoading ? (
              <p>Loading default items...</p>
            ) : defaultError ? (
              <p className="text-red-500">{defaultError}</p>
            ) : (
              <div className="space-y-8">
                {Object.entries(defaultData).map(
                  ([category, items]) =>
                    items.length > 0 && (
                      <section key={category}>
                        <h3 className="text-xl font-semibold mb-2">
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </h3>
                        <div className="flex space-x-4 overflow-x-auto pb-6">
                          {items.map((item) => (
                            <ResultCard
                              key={item._id}
                              category={category}
                              item={item}
                            />
                          ))}
                        </div>
                      </section>
                    )
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </MainLayout>
  );
}