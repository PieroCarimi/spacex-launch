import { AppContext } from "@/ContextProvider";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { useContext } from "react";

export function validateForm(formData: any) {
    const errors = []
    
        
        if (!formData.name || formData.name.trim() === '') {
            //return res.status(400).json({ error: { field: 'name', message: 'Name is required'}})
            errors.push('Name is required');
        }

        if (!formData.flight_number || isNaN(formData.flight_number) || formData.flight_number <= 0) {
            //return res.status(400).json({ error: { field: 'flight_number', message: 'Flight number is required or you have entered an invalid value '}})
            errors.push('Flight number is required');
        }

        if ( !formData.data_local || isNaN(formData.data_local)) {
            //return res.status(400).json({ error: { field: 'data_local', message: 'Data is required'}})
            errors.push('Data local is required');
        }

        if ( formData.success === undefined || typeof formData.success !== 'boolean') {
            //return res.status(400).json({ error: { field: 'success', message: 'Success is required'}})
            errors.push('Success is required');
        }

        if ( !formData.image_small || !/\.(jpg|jpeg|png|gif)$/i.test(formData.image_small)) {
            //return res.status(400).json({ error: { field: 'image_small', message: 'Image small is required or you have entered an invalid value'}})
            errors.push('Image small is required');
        }

        if ( !formData.image_large || !/\.(jpg|jpeg|png|gif)$/i.test(formData.image_small)) {
            //return res.status(400).json({ error: { field: 'image_large', message: 'Image large is required or you have entered an invalid value'}})
            errors.push('Image large is required');
        }

        if ( !formData.webcast_code || formData.webcast_code.length !== 11) {
            //return res.status(400).json({ error: { field: 'image_large', message: 'Webcast code is required or you have entered an invalid value'}})
            errors.push('Webcast code is required');
        }

        if ( !formData.details || formData.details.trim() === '') {
            //return res.status(400).json({ error: { field: 'details', message: 'Details is required'}})
            errors.push('Details is required');
        }

        if ( !formData.article || !/^(http|https):\/\/[^ "]+$/.test(formData.article)){
            //return res.status(400).json({ error: { field: 'article', message: 'Article is required or you have entered an invalid value'}})
            errors.push('Article is required');
        }

        return errors;
    }


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {createLaunch, updateLaunch} = useContext(AppContext)
    if (req.method === 'POST') {
      const formData = req.body;
  
      const errors = validateForm(formData);
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }
  
      try {
        const newLaunch = await createLaunch(formData);
        return res.status(201).json(newLaunch);
      } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
      }
    }
  
    if (req.method === 'PUT') {
      const formData = req.body;
  
      const errors = validateForm(formData);
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }
  
      const { id }: any = req.query;
      try {
        const updatedLaunch = await updateLaunch(id, formData);
        return res.status(200).json(updatedLaunch);
      } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
      }
    }
  
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

