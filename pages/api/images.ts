import { NextApiRequest, NextApiResponse } from "next/types";
import formidable from "formidable";
import fs, { appendFile } from "fs";
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

function GET(req: NextApiRequest, res: NextApiResponse) {
  //using header, cant parse body
  if (req.headers["search"]) {
    db.all(
      "SELECT id,label,uuid from images WHERE label LIKE ?",
      [`%${req.headers["search"]}%`],
      (err: Error, rows: dbImageType[]) => {
        if (err) console.error(err);
        res.status(200).json(rows);
      }
    );
  }

  if (!req.headers["search"]) {
    db.all(
      "SELECT id,label,uuid from images ORDER BY id DESC",
      (err: Error, rows: dbImageType[]) => {
        if (err) console.error(err);
        res.status(200).json(rows);
      }
    );
  }
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
    res.status(500).json(error);
  }
}

async function saveFile(file: formidable.File, fileType: string) {
  const data = fs.readFileSync(file.filepath);
  const random = uuid();
  fs.writeFileSync(`./public/uploaded/${random}.${fileType}`, data);
  fs.unlinkSync(file.filepath);
  return `${random}.${fileType}`;
}

async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data: { id: string; password: string } = await new Promise(
      (resolve, reject) => {
        const form = new formidable.IncomingForm();
        form.parse(req, async (err: Error, fields: any, files: any) => {
          if (err) reject(err);
          resolve(fields);
        });
      }
    );
    const { id, password } = data;

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
    res.status(500).json(error);
  }
}

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
    responseLimit: "10mb",
  },
};

export default function images(req: NextApiRequest, res: NextApiResponse) {
  req.method === "POST"
    ? POST(req, res)
    : req.method === "PATCH"
    ? DELETE(req, res)
    : req.method === "GET"
    ? GET(req, res)
    : res.status(404).send("");
}
