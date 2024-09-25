import { getStoryblokApi } from "@storyblok/react";
import StoryblokClient from 'storyblok-js-client';

export const cachedFetch = (input: any, init?: any): Promise<Response> => {
  return fetch(input, {
    ...init,
    cache: process.env.NODE_ENV === "development" ? "no-store" : "force-cache",
  });
};

const Storyblok = new StoryblokClient({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
  fetch: cachedFetch,
});

Storyblok.get('cdn/spaces/me', {})
.then(response => {
  console.log("response", response)
}).catch(error => { 
  console.log(error)
})

// export const fetchHeaderContent = async () => {
//   try {
//     const response = await Storyblok.get('cdn/stories/header', { version: 'published' });
//     return response.data.story.content;
//   } catch (error) {
//     console.error('Error fetching header content:', error);
//     return null;
//   }
// };

export const fetchFooterContent = async () => {
  try {
    const response = await Storyblok.get('cdn/stories/footer', { version: 'published' });
    return response.data.story.content;
  } catch (error) {
    console.error('Error fetching footer content:', error);
    return null;
  }
};


type StoryblokVersion = "published" | "draft";

export const fetchPageContent = async (slug: string, version: StoryblokVersion = "published") => {
  try {
    console.log(`Fetching Storyblok content for slug: ${slug}, version: ${version}`);
    const client = getStoryblokApi();
    const normalizedSlug = slug === '/' ? 'home' : slug;
    const response = await client.get(`cdn/stories/${normalizedSlug}`, { version });
    console.log('Storyblok content fetched successfully:', response.data.story);
    return response.data.story;
  } catch (error) {
    console.error('Error fetching Storyblok content:', error);
    return null;
  }
};