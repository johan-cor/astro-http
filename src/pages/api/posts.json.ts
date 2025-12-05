import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request }) => {
    // Obtener la URL de la solicitud
    const url = new URL(request.url);
    
    // Obtener los searchParams de la URL
    const searchParams = url.searchParams;
    
    // Obtener el parámetro 'slug' específicamente
    const slug = searchParams.get('slug');
    
    // Loguear en consola para ver el valor
    console.log('Slug recibido:', slug);
    console.log('Todos los searchParams:', Object.fromEntries(searchParams));
    
    // Retornar los datos en JSON
    return new Response(JSON.stringify({
        slug: slug,
        allParams: Object.fromEntries(searchParams),
        message: slug ? `Post encontrado: ${slug}` : 'No se proporcionó slug'
    }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
};
