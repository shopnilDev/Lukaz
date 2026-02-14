
const baseUrl = process.env.BASE_URL; 



export async function getMenus() {
  const API_URL = `${baseUrl}/api/categories/with/childs`;

  try {
    const res = await fetch(API_URL, {
      next: { revalidate: 30 }, 
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch menus: ${res.statusText}`);
    }

    const json = await res.json();
    // console.log("get menus res:", json);
    return json?.data || [];
  } catch (error) {
    console.error("Error fetching menus:", error);
    return []; 
  }
}

export async function getProducts() {
  const API_URL = `${baseUrl}/api/products`;

  try {
    const res = await fetch(API_URL, {
      next: { revalidate: 30 }, 
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.statusText}`);
    }

    const json = await res.json();
    // console.log("get cat res:", json);
    return json?.data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; 
  }
}

export async function getSingleOrder(id) {
  const API_URL = `${baseUrl}/api/order/${id}`;

  try {
    const res = await fetch(API_URL, {
      next: { revalidate: 30 }, 
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch single order: ${res.statusText}`);
    }

    const json = await res.json();
    // console.log("get single order res:", json);
    return json?.data || [];
  } catch (error) {
    console.error("Error fetching single order:", error);
    return []; 
  }
}

export async function getBrands() {
  const API_URL = `${baseUrl}/api/brand`;

  try {
    const res = await fetch(API_URL, {
      next: { revalidate: 30 }, 
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch brands: ${res.statusText}`);
    }

    const json = await res.json();
    // console.log("get brands res:", json);
    return json || [];
  } catch (error) {
    console.error("Error fetching brands:", error);
    return []; 
  }
}



export async function getShopByGender() {
  const API_URL = `${baseUrl}/api/shop-by`;

  try {
    const res = await fetch(API_URL, {
      next: { revalidate: 30 }, 
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch brands: ${res.statusText}`);
    }
    
    const json = await res.json();

    return json || [];
  } catch (error) {
    console.error("Error fetching brands:", error);
    return []; 
  }
}


export async function getOutlets() {
  const API_URL = `${baseUrl}/api/outlates`;

  try {
    const res = await fetch(API_URL, {
      next: { revalidate: 30 }, 
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch outlates: ${res.statusText}`);
    }

    const json = await res.json();
    // console.log("get outlates res:", json);
    return json || [];
  } catch (error) {
    console.error("Error fetching outlates:", error);
    return []; 
  }
}

export async function getReviews() {
  const API_URL = `${baseUrl}/api/customer/reviews`;

  try {
    const res = await fetch(API_URL, {
      next: { revalidate: 30 }, 
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch reviews: ${res.statusText}`);
    }

    const json = await res.json();
    // console.log("get reviews res:", json);
    return json || [];
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return []; 
  }
}

export async function getCategories() {
// const baseUrl = process.env.BASE_URL; 
  // console.log("baseUrl from getCategories", baseUrl)
  const API_URL = `${baseUrl}/api/categories`;

  try {
    const res = await fetch(API_URL, {
      next: { revalidate: 30 }, 
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch categories: ${res.statusText}`);
    }

    const json = await res.json();
    // console.log("get cat res:", json);
    return json?.data || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return []; 
  }
}

export async function getNotices() {
  const API_URL = `${baseUrl}/api/notices`;

  try {
    const res = await fetch(API_URL, {
      next: { revalidate: 30 }, 
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch notices: ${res.statusText}`);
    }

    const json = await res.json();
    // console.log("get notices res:", json);
    return json?.data || [];
  } catch (error) {
    console.error("Error fetching notices:", error);
    return []; 
  }
}

export async function getProductByCategory(id) {
  const API_URL = `${baseUrl}/api/products?category_id=${id}`;

  try {
    const res = await fetch(API_URL, {
      next: { revalidate: 30 }, 
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch products by cat: ${res.statusText}`);
    }

    const json = await res.json();
    // console.log("get single order res:", json);
    return json?.data || [];
  } catch (error) {
    console.error("Error fetching products by cat:", error);
    return []; 
  }
}

export async function getBanners() {
  const API_URL = `${baseUrl}/api/banners`;

  try {
    const res = await fetch(API_URL, {
      next: { revalidate: 30 }, 
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch banners: ${res.statusText}`);
    }

    const json = await res.json();
    // console.log("get banners res:", json);
    return json || [];
  } catch (error) {
    console.error("Error fetching banners:", error);
    return []; 
  }
}


export async function getVideos() {
  const API_URL = `${baseUrl}/api/video/feature`;

  try {
    const res = await fetch(API_URL, {
      next: { revalidate: 30 }, 
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch videos: ${res.statusText}`);
    }

    const json = await res.json();
    // console.log("get videos res:", json);
    return json || [];
  } catch (error) {
    console.error("Error fetching videos:", error);
    return []; 
  }
}

