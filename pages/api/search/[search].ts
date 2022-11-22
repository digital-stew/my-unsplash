import { NextApiRequest, NextApiResponse } from "next/types";
import { db } from "../../../components/sqlite";
import { dbImageType } from "../images";
import bcrypt from "bcrypt";

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

async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id, password } = JSON.parse(req.body);

    const selectedImage: dbImageType = await new Promise((resolve, reject) => {
      db.get("SELECT * FROM images WHERE id=?", [id], (err, row) => {
        if (err) reject(err);
        resolve(row);
      });
    });

    const isCorrectPassword = await new Promise((resolve, reject) => {
      bcrypt.compare(password, selectedImage.password, (err, result) => {
        if (err) reject(err);
        if (result === true) resolve(true);
        if (result === false) resolve(false);
      });
    });

    if (isCorrectPassword === true) {
      const deleteSuccessful = await new Promise((resolve, reject) => {
        db.run("DELETE FROM images WHERE id=?", [id], (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(true);
          }
        });
      });
      res.status(200).json(true);
    } else {
      res.status(401).send(null);
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
}

export const config = {
  api: {
    externalResolver: true,
    responseLimit: "10mb",
  },
};
function POST(req: NextApiRequest, res: NextApiResponse) {}
function PATCH(_req: NextApiRequest, _res: NextApiResponse) {}
