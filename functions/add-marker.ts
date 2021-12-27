import { Donor } from "@/models/donor";
import { Handler } from "@netlify/functions";
import response from "../helpers/response";
require("dotenv").config();

export const handler: Handler = async (event, context) => {
  // check if this is post request
  if (event.httpMethod !== "POST") {
    return response(
      {
        message: "Only post request is allowed",
      },
      { status: 405 }
    );
  }

  //   save donor location
  const donor = new Donor({
    // @ts-ignore
    name: JSON.parse(event.body as string).name,
    location: {
      type: "Point",
      coordinates: [
        // @ts-ignore
        parseFloat(JSON.parse(event.body as string).location[1]),
        // @ts-ignore
        parseFloat(JSON.parse(event.body as string).location[0]),
      ],
    },
  });

  try {
    const doc = await donor.save();
    return response(
      {
        message: "Donor location saved",
        doc,
      },
      { status: 200 }
    );
  } catch (e) {
    return response(
      {
        message: "Error saving donor location",
      },
      { status: 500 }
    );
  }
};
