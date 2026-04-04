import { supabase } from '@/lib/supabase';

export default async function handler(req, res) {
  const { method, query } = req;
  const { type } = query;

  try {
    if (method === 'GET') {
      // Fetch categories based on type
      let queryBuilder = supabase
        .from('categories')
        .select('*')
        .eq('visible', true)
        .order('order_index', { ascending: true });

      // Filter by type if specified
      if (type) {
        queryBuilder = queryBuilder.eq('type', type);
      }

      const { data, error } = await queryBuilder;

      if (error) throw error;

      return res.status(200).json({ 
        success: true,
        categories: data || [] 
      });
    }

    if (method === 'POST') {
      // Create new category
      const categoryData = req.body;
      
      const { data, error } = await supabase
        .from('categories')
        .insert([categoryData])
        .select()
        .single();

      if (error) throw error;

      return res.status(201).json({ 
        success: true,
        category: data 
      });
    }

    if (method === 'PUT') {
      // Update category
      const { id, ...updateData } = req.body;
      
      const { data, error } = await supabase
        .from('categories')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return res.status(200).json({ 
        success: true,
        category: data 
      });
    }

    if (method === 'DELETE') {
      // Delete category
      const { id } = req.query;
      
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

      if (error) throw error;

      return res.status(200).json({ 
        success: true,
        message: 'Category deleted successfully' 
      });
    }

    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    return res.status(405).json({ error: 'Method not allowed' });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      success: false,
      error: error.message || 'Internal server error' 
    });
  }
}
