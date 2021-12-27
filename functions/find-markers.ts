import { Donor } from "@/models/donor";
import { Handler } from "@netlify/functions";
import response from "../helpers/response";

require("dotenv").config();

export const handler: Handler = async (event, context) => {
  const markers = await Donor.find({
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [
            // @ts-ignore
            parseFloat(JSON.parse(event.body as string).location[1]),
            // @ts-ignore
            parseFloat(JSON.parse(event.body as string).location[0]),
          ],
        },
        // $minDistance: 1000,
        $maxDistance: 50000,
      },
    },
  });
  return response(
    {
      markers,
    },
    { status: 200 }
  );
};
