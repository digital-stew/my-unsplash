import { NextApiRequest, NextApiResponse } from "next/types";
import formidable from "formidable";
import fs from "fs";
import { db } from "../../components/sqlite";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
export const saltRounds = 10;

export interface dbImageType {
  readonly id: number;
  readonly fileName: string;
  readonly uuid: string;
  readonly label: string;
  readonly password: string;
}
export interface UploadForm {
  password: string;
  label: string;
}
async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const form = new formidable.IncomingForm();

    form.parse(req, async (_err: Error, fields: any, files: any) => {
      const { password, label }: UploadForm = fields;
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
      const passwordHash = await new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, (err, hash) => {
          if (err) reject(err);
          resolve(hash);
        });
      });

      const runSQL = await new Promise((resolve, reject) => {
        db.run(
          "INSERT INTO images (fileName, uuid, label, password) VALUES (?,?,?,?)",
          [files.image.originalFilename, randomId, label, passwordHash],
          (err) => {
            if (err) reject(err);
            resolve(true);
          }
        );
      });

      if (runSQL === true) {
        res.status(200).json(randomId);
      } else {
        res.status(500).send(null);
      }
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
}
async function saveFile(file: formidable.File, fileType: string) {
  const data = fs.readFileSync(file.filepath);
  const random = uuid();
  fs.writeFileSync(`./public/uploaded/${random}.${fileType}`, data);
  fs.unlinkSync(file.filepath);
  return `${random}.${fileType}`;
}

function GET(req: NextApiRequest, res: NextApiResponse) {
  db.all(
    "SELECT * from images ORDER BY id DESC",
    (err: Error, rows: dbImageType[]) => {
      if (err) console.error(err);
      res.status(200).json(rows);
    }
  );
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
