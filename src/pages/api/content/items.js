import { supabase } from '@/lib/supabase';

export default async function handler(req, res) {
  const { method, query } = req;
  const { type } = query;

  try {
    if (method === 'GET') {
      console.log('API GET - Method: GET, Type:', type);

      // Fetch items based on type
      let tableName, selectQuery;

      switch (type) {
        case 'news':
          console.log('API GET - Processing news type');
          tableName = 'news';
          selectQuery = `
            *,
            categories(name, slug)
          `;
          break;
        case 'portfolio':
          tableName = 'portfolio';
          selectQuery = `
            *,
            categories(name, slug)
          `;
          break;
        case 'services':
          tableName = 'services';
          selectQuery = `
            *,
            categories(name, slug)
          `;
          break;
        case 'faq':
          tableName = 'faqs';
          selectQuery = '*';
          break;
        case 'social':
          tableName = 'social_links';
          selectQuery = '*';
          break;
        default:
          return res.status(400).json({ error: 'Invalid item type' });
      }

      let queryBuilder = supabase
        .from(tableName)
        .select(selectQuery)
        .eq('visible', true)
        .order('order_index', { ascending: true });

      const { data, error } = await queryBuilder;

      console.log('API GET - Database query result:', { data, error });

      if (error) throw error;

      // Transform data to match dashboard expectations
      let transformedData = data || [];
      console.log('API GET - About to transform data, type:', type, 'data length:', data?.length);

      if (type === 'news') {
        transformedData = data.map(item => {
          // Debug logging for individual item
          console.log('News API GET - Processing item:', item);

          const transformed = {
            ...item,
            // Map database fields to dashboard expected fields
            shortDescription: item.excerpt || '',
            fullDescription: item.content || '',
            category: item.categories?.name || item.category_name || '', // Use category name
            category_id: item.category_id || '', // Keep ID for saving
            type: 'news', // Add type field
            author: {
              name: 'Maraseq Team',
              img: '/img/logo.svg',
              description: 'Real estate experts providing insights and updates'
            }
          };

          console.log('News API GET - Transformed item:', transformed);
          return transformed;
        });

        console.log('News API GET - Raw data:', data);
        console.log('News API GET - Final transformed data:', transformedData);
      }

      return res.status(200).json({
        success: true,
        [type]: transformedData
      });
    }

    if (method === 'POST') {
      // Create new item
      const requestBody = req.body;
      const itemData = requestBody.item || requestBody; // Handle both formats
      let tableName;

      // Transform data for database
      let transformedItemData = itemData;
      if (type === 'news') {
        // Convert category name back to ID
        let categoryId = null;
        if (itemData.category) {
          // This is a simplified approach - in production you'd want to look up the ID by name
          // For now, we'll use the category_id if it exists, otherwise try to match by name
          categoryId = itemData.category_id || itemData.category;
        }

        transformedItemData = {
          title: itemData.title,
          excerpt: itemData.shortDescription || '',
          content: itemData.fullDescription || '',
          category_id: categoryId,
          featured_image: itemData.featured_image || '',
          published: itemData.published !== false,
          featured: itemData.featured || false,
          visible: itemData.visible !== false,
          order_index: itemData.order_index || 0,
          meta_title: itemData.meta_title || itemData.title,
          meta_description: itemData.meta_description || itemData.shortDescription || ''
        };

        // Debug logging
        console.log('News API - Original data:', itemData);
        console.log('News API - Transformed data:', transformedItemData);
      }

      switch (type) {
        case 'news':
          tableName = 'news';
          break;
        case 'services':
          tableName = 'services';
          break;
        case 'faq':
          tableName = 'faqs';
          break;
        case 'social':
          tableName = 'social_links';
          break;
        default:
          return res.status(400).json({ error: 'Invalid item type' });
      }

      // Handle both create and update based on whether ID is provided
      let result;
      if (itemData.id) {
        // Update existing item
        result = await supabase
          .from(tableName)
          .update(transformedItemData)
          .eq('id', itemData.id)
          .select()
          .single();
      } else {
        // Create new item
        result = await supabase
          .from(tableName)
          .insert([transformedItemData])
          .select()
          .single();
      }

      const { data, error } = result;

      if (error) throw error;

      return res.status(itemData.id ? 200 : 201).json({
        success: true,
        [type]: data
      });
    }

    if (method === 'PUT') {
      // Update item
      const requestBody = req.body;
      const { id, item } = requestBody;
      const updateData = item || requestBody; // Handle both formats
      let tableName;

      // Transform data for database
      let transformedUpdateData = updateData;
      if (type === 'news') {
        // Convert category name back to ID
        let categoryId = null;
        if (updateData.category) {
          // Use the category_id if it exists, otherwise try to match by name
          categoryId = updateData.category_id || updateData.category;
        }

        transformedUpdateData = {
          title: updateData.title,
          excerpt: updateData.shortDescription || '',
          content: updateData.fullDescription || '',
          category_id: categoryId,
          featured_image: updateData.featured_image || '',
          published: updateData.published !== false,
          featured: updateData.featured || false,
          visible: updateData.visible !== false,
          order_index: updateData.order_index || 0,
          meta_title: updateData.meta_title || updateData.title,
          meta_description: updateData.meta_description || updateData.shortDescription || ''
        };
      }

      switch (type) {
        case 'news':
          tableName = 'news';
          break;
        case 'portfolio':
          tableName = 'portfolio';
          break;
        case 'services':
          tableName = 'services';
          break;
        case 'faq':
          tableName = 'faqs';
          break;
        case 'social':
          tableName = 'social_links';
          break;
        default:
          return res.status(400).json({ error: 'Invalid item type' });
      }

      const { data, error } = await supabase
        .from(tableName)
        .update(transformedUpdateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return res.status(200).json({
        success: true,
        [type]: data
      });
    }

    if (method === 'DELETE') {
      // Delete item
      const { id } = req.query;
      let tableName;

      switch (type) {
        case 'news':
          tableName = 'news';
          break;
        case 'portfolio':
          tableName = 'portfolio';
          break;
        case 'services':
          tableName = 'services';
          break;
        case 'faq':
          tableName = 'faqs';
          break;
        case 'social':
          tableName = 'social_links';
          break;
        default:
          return res.status(400).json({ error: 'Invalid item type' });
      }

      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', id);

      if (error) throw error;

      return res.status(200).json({
        success: true,
        message: 'Item deleted successfully'
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
