import { NextApiRequest, NextApiResponse } from "next/types";
import formidable from "formidable";
import fs from "fs";
import { db } from "../../components/sqlite";
import { v4 as uuid } from "uuid";
import path from "path";

export interface dbImageType {
  readonly id: number;
  readonly fileName: string;
  readonly uuid: string;
  readonly label: string;
  readonly password: string;
}
async function POST(req: NextApiRequest, res: NextApiResponse) {
  const delay = await new Promise((resolve) =>
    setTimeout(() => resolve("some value"), 10000)
  );

  const form = new formidable.IncomingForm();
  form.parse(req, async (_err: Error, fields: any, files: any) => {
    const fileType: string = files.image.originalFilename
      .split(".")
      .pop()
      .toLowerCase();

    if (
      fileType !== "png" &&
      fileType !== "jpg" &&
      fileType !== "jpeg" &&
      fileType !== "blob" &&
      fileType !== "gif"
    ) {
      return res.status(415).json({ error: "wrong file type" });
    }

    const randomId = await saveFile(files.image, fileType);

    db.run(
      "INSERT INTO images (fileName, uuid) VALUES (?,?)",
      [files.image.originalFilename, randomId],
      async (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(randomId);
      }
    );
  });
}
async function saveFile(file: formidable.File, fileType: string) {
  const data = fs.readFileSync(file.filepath);
  const random = uuid();
  fs.writeFileSync(`./public/uploaded/${random}.${fileType}`, data);
  fs.unlinkSync(file.filepath);
  return `${random}.${fileType}`;
}

function GET(req: NextApiRequest, res: NextApiResponse) {
  db.all("SELECT * from images", (err: Error, rows: dbImageType[]) => {
    if (err) console.error(err);
    res.status(200).json(rows);
  });
}

export const config = {
  api: {
    bodyParser: false,
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

function PATCH(_req: NextApiRequest, _res: NextApiResponse) {}
function DELETE(_req: NextApiRequest, _res: NextApiResponse) {}