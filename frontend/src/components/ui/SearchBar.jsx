"use client";
import React from "react";
import { Button } from "@heroui/button";

export default function SearchBar({ keyword, setKeyword, onSearch }) {
  return (
    <div className="flex gap-2 mb-4">
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSearch();
          }}
        placeholder="Where do you wanna go?"
        className="flex-grow border border-gray-300 rounded-lg p-2"
      />
      <Button onPress={onSearch}>Search</Button>
    </div>
  );
}