import mysql from 'mysql2';
import { NextApiRequest, NextApiResponse } from 'next';

const db = mysql.createConnection({
  host: `${process.env.DB_HOST}`,
  user: `${process.env.DB_USER}`,
  password: `${process.env.DB_PASSWORD}`,
  database: `${process.env.DB_DATABASE}`,
});


export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        if (req.query.id) {
          return new Promise((resolve, reject) => {
            const productId = req.query.id;
            db.query(
              'SELECT * FROM launches WHERE idLaunches = ?',
              [productId],
              (error, results) => {
                  if (error) throw error;
                  res.status(200).json(results);
              }
            );
          });
        } else {
          return new Promise((resolve, reject) => {
            db.query(
              'SELECT * FROM launches',
              (error, results) => {
                if (error) throw error;
                res.status(200).json(results);
              }
          );
          })
        }
    } else if (req.method === 'POST') {
      const { name, flight_number, data_local, success, image_small, image_large, webcast_code, details, article } = req.body;
      return new Promise((resolve, reject) => {
        db.query(
          'INSERT INTO launches (name, flight_number, data_local, success, image_small, image_large, webcast_code, details, article ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [name, flight_number, data_local, success, image_small, image_large, webcast_code, details, article],
          (error, results) => {
            if (error) throw error;
            res.status(201).json({ message: 'Prodotto aggiunto con successo' });
          }
        );
      });
    } else if (req.method === 'PUT') {
      const productId = req.query.id;
      const { name, flight_number, data_local, success, image_small, image_large, webcast_code, details, article } = req.body;
      return new Promise((resolve, reject) => {
        db.query(
          'UPDATE launches SET name = ?, flight_number = ?, data_local =?, success = ?, image_small = ?, image_large = ?, webcast_code = ?, details = ?, article = ? WHERE idLaunches = ?',
          [name, flight_number, data_local, success, image_small, image_large, webcast_code, details, article, productId],
          (error, results) => {
            if (error) throw error;
            res.status(200).json({ message: 'Prodotto aggiornato con successo' });
          }
        );
      });
    } else if (req.method === 'DELETE') {
      const productId = req.query.id;
      return new Promise((resolve, reject) => {
        db.query(
          'DELETE FROM launches WHERE idLaunches = ?',
          [productId],
          (error, results) => {
            if (error) throw error;
            res.status(200).json({ message: 'Prodotto eliminato con successo' });
          }
        );
      });
    }
}