import { RestaurantFinderError } from "../errors";
import {
  FourSquareErrorResponse,
  FourSquareResponse,
  SearchParameter,
} from "../types";
import dotenv from "dotenv";
dotenv.config();

export const searchFourSquare = async (params: SearchParameter) => {
  const fieldsToReturn = [
    "description",
    "hours",
    "location",
    "name",
    "price",
    "rating",
    "tel",
    "website",
  ];

  // queries we add in the url
  const queryObject = {
    ...params,
    fields: fieldsToReturn,
  };

  const stringifiedParams = Object.fromEntries(
    Object.entries(queryObject).map(([key, value]) => [key, String(value)])
  );
  const queryParams = new URLSearchParams(stringifiedParams);
  const url = `${process.env.FSQ_API_URL}?${queryParams.toString()}` || "";

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.FSQ_API_KEY || "",
    },
  };

  const response = await fetch(url, options);

  const data: FourSquareErrorResponse | FourSquareResponse =
    await response.json();

  // if the response is of type FourSquareErrorResponse, we throw an error
  if ("message" in data) {
    throw new RestaurantFinderError({
      message: data.message,
      status: 401,
    });
  }

  // only get the neccessary fields in the response data
  const results = data.results.map((result) => {
    return {
      fsq_id: result.fsq_id,
      description: result.description ?? null,
      hours: result.hours.display ?? null,
      location: result.location.formatted_address ?? null,
      name: result.name ?? null,
      price: result.price ?? null,
      rating: result.rating ?? null,
      tel: result.tel ?? null,
      website: result.website ?? null,
    };
  });

  return results;
};
