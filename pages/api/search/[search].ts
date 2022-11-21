import { NextApiRequest, NextApiResponse } from "next/types";
import formidable from "formidable";
import fs from "fs";
import { db } from "../../../components/sqlite";
import { v4 as uuid } from "uuid";
import path from "path";
import { dbImageType } from "../images";

async function GET(req: NextApiRequest, res: NextApiResponse) {
  db.all(
    "SELECT * from images WHERE label LIKE ?",
    [`%${req.query.search}%`],
    (err: Error, rows: dbImageType[]) => {
      if (err) console.error(err);
      res.status(200).json(rows);
    }
  );
}

export const config = {
  api: {
    externalResolver: true,
    responseLimit: "10mb",
  },
};

export default function image(req: NextApiRequest, res: NextApiResponse) {
  req.method === "POST"
    ? POST(req, res)
    : req.method === "PATCH"
    ? PATCH(req, res)
    : req.method === "DELETE"
    ? DELETE(req, res)
    : req.method === "GET"
    ? GET(req, res)
    : res.status(404).send("");
}
function POST(req: NextApiRequest, res: NextApiResponse) {}
function PATCH(_req: NextApiRequest, _res: NextApiResponse) {}
function DELETE(_req: NextApiRequest, _res: NextApiResponse) {}
