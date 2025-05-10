/*

Search result ui
Author: Hervet Thibaut

*/
import React from "react";
import { Card, CardBody, CardFooter } from "@heroui/card";

/**
 * Generic card for displaying search results per category.
 *
 * Props:
 * - category: one of 'vans', 'vanReviews', 'guideReviews', 'deals', 'guides', 'trips'
 * - item: the data object for the card
 */
export default function ResultCard({ category, item }) {
  let bodyContent;
  let footerContent;

  switch (category) {
    case "vans":
      bodyContent = (
        <>
          <h4 className="font-semibold">
            {item.manufacturer} {item.model}
          </h4>
          <p className="text-sm">{item.type}</p>
          <p className="mt-2">
            <span className="font-medium">€{item.price}</span> &middot;{" "}
            {item.seats} seats &middot; {item.beds} beds
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Transmission: {item.transmission}
          </p>
          <p className="mt-2 text-sm text-gray-600">{item.info}</p>
        </>
      );
      footerContent = (
        <div className="flex flex-col">
          <span className="text-sm">{item.location}</span>
          <span className="text-xs text-gray-400">
            Utilities: {item.utilities.join(", ")}
          </span>
        </div>
      );
      break;


    case "vanReviews":
    case "guideReviews":
      bodyContent = <p className="italic">"{item.review}"</p>;
      footerContent = <span className="text-sm text-gray-600">— {item.author}</span>;
      break;

    case "deals":
      bodyContent = (
        <>
          <h4 className="font-semibold">{item.title}</h4>
          <p>{item.description}</p>
        </>
      );
      footerContent = <span className="font-bold">{item.price}</span>;
      break;

    case "guides":
      bodyContent = (
        <>
          <h4 className="font-semibold">{item.title}</h4>
          <p className="mt-1 text-gray-600">{item.summary}</p>
        </>
      );
      footerContent = <span className="text-sm text-gray-600">Read more</span>;
      break;

    case "trips":
      bodyContent = <h4 className="font-semibold">{item.title}</h4>;
      footerContent = <span className="text-sm text-gray-600">{item.location}</span>;
      break;

    default:
      bodyContent = null;
      footerContent = null;
  }

  return (
    <Card
      shadow="sm"
      radius="lg"
      isHoverable
      isFooterBlurred
      className="flex-none min-w-[250px]"
    >
      <CardBody>{bodyContent}</CardBody>
      <CardFooter className="justify-start">{footerContent}</CardFooter>
    </Card>
  );
}
