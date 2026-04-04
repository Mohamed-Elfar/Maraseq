import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

const normalizeCaptions = (captions) => {
  if (!captions) {
    return null
  }

  if (typeof captions === 'string') {
    try {
      const parsed = JSON.parse(captions)
      return parsed && typeof parsed === 'object' ? parsed : null
    } catch {
      return null
    }
  }

  return typeof captions === 'object' ? captions : null
}

const normalizeService = (service) => {
  // Handle deleted/empty images with proper defaults
  const featuredImage = (service.featured_image && service.featured_image.trim() !== '') ? service.featured_image : "21.jpg"
  const mainImage = (service.img && service.img.trim() !== '') ? service.img : featuredImage

  return {
    ...service,
    shortDescription: service.meta_description || service.description || "",
    fullDescription: service.description || "",
    thumbImage: featuredImage,
    img: mainImage,
    buttonText: "Explore Path",
    coreFeature: false,
    active: true,
    category: service.categories?.name ? [service.categories.name] : [],
  }
}

const normalizeServiceCaptions = (service) => {
  // Create captions from database fields since captions column doesn't exist
  const detailImage1 = service.detail_image_1 && service.detail_image_1.trim() !== '' ? service.detail_image_1 : "31.jpg"
  const detailImage2 = service.detail_image_2 && service.detail_image_2.trim() !== '' ? service.detail_image_2 : "32.jpg"

  return {
    image1: detailImage1,
    image2: detailImage2,
    caption: service.title || "Service",
    captionFullDescription: service.description || "",
    captionShortDescription: service.meta_description || service.description || "",
  }
}

// Contact info functions
export const getContactInfo = async () => {
  try {
    const { data, error } = await supabase
      .from('contact_info')
      .select('*')
      .eq('visible', true)
      .order('order_index', { ascending: true })

    if (error) throw error

    // Group by type
    return {
      emails: data.filter(item => item.type === 'emails'),
      phones: data.filter(item => item.type === 'phones'),
      addresses: data.filter(item => item.type === 'addresses')
    }
  } catch (error) {
    console.error('Error fetching contact info:', error)
    return {
      emails: [],
      phones: [],
      addresses: []
    }
  }
}

// Form options functions
export const getFormOptions = async (type = null) => {
  try {
    let query = supabase
      .from('form_options')
      .select('*')
      .eq('active', true)
      .order('order_index', { ascending: true })

    if (type) {
      query = query.eq('type', type)
      const { data, error } = await query
      if (error) throw error
      return data
    }

    const { data, error } = await query
    if (error) throw error

    // Group by type
    return {
      locations: data.filter(item => item.type === 'locations'),
      propertyTypes: data.filter(item => item.type === 'property_types'),
      objectives: data.filter(item => item.type === 'objectives')
    }
  } catch (error) {
    console.error('Error fetching form options:', error)
    return {
      locations: [],
      propertyTypes: [],
      objectives: []
    }
  }
}

// Properties functions
export const getProperties = async () => {
  try {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('visible', true)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching properties:', error)
    return []
  }
}

// Categories functions
export const getCategories = async (type = null) => {
  try {
    let query = supabase
      .from('categories')
      .select('*')
      .eq('visible', true)
      .order('order_index', { ascending: true })

    if (type) {
      query = query.eq('type', type)
    }

    const { data, error } = await query
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

// News functions
export const getNews = async () => {
  try {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .eq('visible', true)
      .eq('published', true)
      .order('published_at', { ascending: false })

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching news:', error)
    return []
  }
}

// Services functions
export const getServices = async () => {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*, categories(name)')
      .eq('visible', true)
      .order('order_index', { ascending: true })

    if (error) throw error
    return (data || []).map((service) => {
      const normalized = normalizeService(service)
      return {
        ...normalized,
        captions: normalizeServiceCaptions(service),
      }
    })
  } catch (error) {
    console.error('Error fetching services:', error)
    return []
  }
}

// Portfolio functions
export const getPortfolio = async () => {
  try {
    const { data, error } = await supabase
      .from('portfolio')
      .select('*')
      .eq('visible', true)
      .eq('active', true) // Only fetch active portfolios
      .order('order_index', { ascending: true })

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching portfolio:', error)
    return []
  }
}

// Brands functions
export const getBrands = async () => {
  try {
    const { data, error } = await supabase
      .from('brands')
      .select('*')
      .eq('visible', true)
      .order('order_index', { ascending: true })

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching brands:', error)
    return []
  }
}

// Social links functions
export const getSocialLinks = async () => {
  try {
    const { data, error } = await supabase
      .from('social_links')
      .select('*')
      .eq('active', true)
      .order('order_index', { ascending: true })

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching social links:', error)
    return []
  }
}

// FAQ functions
export const getFaqs = async () => {
  try {
    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .eq('active', true)
      .order('order_index', { ascending: true })

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching FAQs:', error)
    return []
  }
}
