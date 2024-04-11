import { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from "@/utils/db";
import FrameData from '@/models/FreameData';

dbConnect();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { fid, hash } = req.body.userData;
      const newData = new FrameData({ fid, hash });
      await newData.save();
      res.status(201).json({ message: 'Datos de usuario guardados correctamente.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al guardar los datos de usuario.' });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido.' });
  }
}