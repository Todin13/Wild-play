import React, { useState, useEffect } from "react";
import SearchBar from "@/components/ui/SearchBar";
import SearchResults from "@/components/SearchResults";
import ResultCard from "@/components/ui/ResultCard";
import CampersCarousel from "@/modules/vans/CampersCarousel";
import DealsCarousel from "@/modules/deals/carousel";
import MainLayout from "@/layouts/MainLayout";

export default function SearchPage() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Default data state (show 4 items per category)
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

  // Fetch default (first 4) items per category on mount
  useEffect(() => {
    async function loadDefaults() {
      try {
         const [ vansRes, dealsRes, guidesRes ] = await Promise.all([
          API.get('/campers'),
          API.get('/deals'),
          API.get('/guides'),
        ]);
        if (!vansRes.ok || !dealsRes.ok || !guidesRes.ok) {
          throw new Error("Failed to fetch default data");
        }
        // responses from axios are under `.data`
        const vansData   = vansRes.data;
        const dealsData  = dealsRes.data;
        const guidesData = guidesRes.data;

        const vansList = Array.isArray(vansData.campers) ? vansData.campers : [];
        const dealsList = Array.isArray(dealsData.deals) ? dealsData.deals : [];
        const guidesList = Array.isArray(guidesData.guides) ? guidesData.guides : [];

        setDefaultData({
          vans: vansList.slice(0, 4),
          vanReviews: [],
          guideReviews: [],
          deals: dealsList.slice(0, 4),
          guides: guidesList.slice(0, 4)
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
      {/* Outer wrapper */}
      <div className="relative min-h-screen bg-gray-50 overflow-hidden">
        {/* Search Bar */}
        <main className="pt-10">
          <div className="w-1/2 mx-auto mb-8">
            <SearchBar
              keyword={keyword}
              setKeyword={setKeyword}
              onSearch={handleSearch}
            />
          </div>

          {/* Results or Defaults */}
          <div className="px-6 mx-20">
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
              <div className="space-y-12">
                {/* Vans Carousel */}
                {defaultData.vans.length > 0 && (
                  <section>
                    <h3 className="text-xl font-semibold mb-4">Vans</h3>
                    <div className="overflow-hidden">
                      <CampersCarousel vans={defaultData.vans} />
                    </div>
                  </section>
                )}

                {/* Deals Carousel */}
                {defaultData.deals.length > 0 && (
                  <section>
                    <h3 className="text-xl font-semibold mb-4">Deals</h3>
                    <div className="overflow-hidden">
                      <DealsCarousel deals={defaultData.deals} />
                    </div>
                  </section>
                )}

                {/* Van Reviews */}
                {defaultData.vanReviews.length > 0 && (
                  <section>
                    <h3 className="text-xl font-semibold mb-4">Van Reviews</h3>
                    <div className="flex space-x-4 overflow-x-auto pb-4">
                      {defaultData.vanReviews.map((rev) => (
                        <ResultCard
                          key={rev._id}
                          category="vanReviews"
                          item={rev}
                        />
                      ))}
                    </div>
                  </section>
                )}

                {/* Guide Reviews */}
                {defaultData.guideReviews.length > 0 && (
                  <section>
                    <h3 className="text-xl font-semibold mb-4">Guide Reviews</h3>
                    <div className="flex space-x-4 overflow-x-auto pb-4">
                      {defaultData.guideReviews.map((rev) => (
                        <ResultCard
                          key={rev._id}
                          category="guideReviews"
                          item={rev}
                        />
                      ))}
                    </div>
                  </section>
                )}

                {/* Guides */}
                {defaultData.guides.length > 0 && (
                  <section>
                    <h3 className="text-xl font-semibold mb-4">Guides</h3>
                    <div className="flex space-x-4 overflow-x-auto pb-4">
                      {defaultData.guides.map((guide) => (
                        <ResultCard
                          key={guide._id}
                          category="guides"
                          item={guide}
                        />
                      ))}
                    </div>
                  </section>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </MainLayout>
  );
}
