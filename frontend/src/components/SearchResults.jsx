import React from "react";
import ResultCard from "@/components/ui/ResultCard";

export default function SearchResults({ results, loading, error }) {
  if (loading) return <p>Loading results...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!results) return null;

  return (
    <div className="space-y-8">
      {/* totalResults banner */}
      <p className="mb-4 text-gray-700">
        Found <span className="font-semibold">{results.totalResults}</span> result
        {results.totalResults > 1 ? 's' : ''}
      </p>
      
      {results.vans?.length > 0 && (
        <section>
          <h3 className="text-xl font-semibold mb-2">Vans</h3>
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {results.vans.map((van) => (
              <ResultCard key={van._id} category="vans" item={van} />
            ))}
          </div>
        </section>
      )}

      {results.vanReviews?.length > 0 && (
        <section>
          <h3 className="text-xl font-semibold mb-2">Van Reviews</h3>
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {results.vanReviews.map((rev) => (
              <ResultCard key={rev._id} category="vanReviews" item={rev} />
            ))}
          </div>
        </section>
      )}

      {results.guideReviews?.length > 0 && (
        <section>
          <h3 className="text-xl font-semibold mb-2">Guide Reviews</h3>
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {results.guideReviews.map((rev) => (
              <ResultCard key={rev._id} category="guideReviews" item={rev} />
            ))}
          </div>
        </section>
      )}

      {results.deals?.length > 0 && (
        <section>
          <h3 className="text-xl font-semibold mb-2">Deals</h3>
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {results.deals.map((deal) => (
              <ResultCard key={deal._id} category="deals" item={deal} />
            ))}
          </div>
        </section>
      )}

      {results.guides?.length > 0 && (
        <section>
          <h3 className="text-xl font-semibold mb-2">Guides</h3>
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {results.guides.map((guide) => (
              <ResultCard key={guide._id} category="guides" item={guide} />
            ))}
          </div>
        </section>
      )}

      {results.trips?.length > 0 && (
        <section>
          <h3 className="text-xl font-semibold mb-2">Trips</h3>
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {results.trips.map((trip) => (
              <ResultCard key={trip._id} category="trips" item={trip} />
            ))}
          </div>
        </section>
      )}

      {Object.values(results).every((arr) => Array.isArray(arr) && arr.length === 0) && (
        <p>No results found.</p>
      )}
    </div>
  );
}