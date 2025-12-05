import type { APIRoute } from 'astro';
import { getCollection, getEntries, getEntry } from 'astro:content';

export const prerender = false;

export const GET: APIRoute = async (request) => {
    const posts = await getCollection('blog');
    // console.log(posts)

    const url = new URL(request.url);
    const slug = url.searchParams.get('slug');
    // console.log(slug)

    const filteredPosts = posts.map(post => post.data);

    const postsFinal = slug ? posts.filter(post => post.id === slug) : filteredPosts;

    // console.log(request)


    // otra manera de hacerlo
    if(slug)   {
        const post = await getEntry('blog',slug)

        if (post) {
            return new Response(JSON.stringify(post), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }

    }

    // return new Response(JSON.stringify(postsFinal), {
    return new Response(JSON.stringify({msg: `Post ${slug} not found`}), {
        status: 400,
        headers: {
            'Content-Type': 'application/json'
        }
    })


}