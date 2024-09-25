"use client"
import { getStoryblokApi, StoryblokComponent } from "@storyblok/react";
import { useEffect, useState } from "react";

const fetchTopicPage = async (slug: string) => {
    try {
        const client = getStoryblokApi();
        const response = await client.getStory(`topics/${slug}`, {
            version: 'draft',
        });
        return response.data.story;
    } catch (error) {
        console.error('Error fetching topic page:', error);
        return null;
    }
}

const TopicPage = ({ params: { slug } }: { params: { slug: string } }) => {
    // State to hold the fetched story
    const [story, setStory] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            const fetchedStory = await fetchTopicPage(slug);
            setStory(fetchedStory);
        };
        fetchData();
    }, [slug]);

    // Render null or loading UI if story is not fetched yet
    if (!story) return null;

    return (
        <div>
            <StoryblokComponent blok={story.content} />
        </div>
    );
};

export default TopicPage;
