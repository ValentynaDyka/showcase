"use client"
import { useEffect, useState } from 'react';
import { getStoryblokApi } from '@storyblok/react';
import { StoryblokComponent } from '@storyblok/react'; // Import StoryblokComponent
import {RecommendedTopic} from '../components/RecommendedTopic';
import { Box, Container } from "@chakra-ui/react";

const fetchTopicsPage = async () => {
  try {
    const client = getStoryblokApi();
    const response = await client.getStory('topics', {
      version: 'draft',
    });
    return response.data.story;
  } catch (error) {
    console.error('Error fetching topics page:', error);
    return null;
  }
};

const fetchAllTopics = async () => {
  try {
    const client = getStoryblokApi();
    const response = await client.getStories({
      content_type: 'topic',
      version: 'draft',
    });
    return response.data.stories;
  } catch (error) {
    console.error('Error fetching all topics:', error);
    return [];
  }
};

const TopicsPage = () => {
  const [story, setStory] = useState<any>(null);
  const [topics, setTopics] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedStory = await fetchTopicsPage();
      setStory(fetchedStory);

      const fetchedTopics = await fetchAllTopics();
      setTopics(fetchedTopics);
    };
    fetchData();
  }, []);

  if (!story || topics.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      {/* Render StoryblokComponent for story.content */}
      <StoryblokComponent blok={story.content} />

      {/* Render list of topics */}
      <Box maxW={"550px"} mx="auto" border='1px' borderColor='gray.200'>
      {topics.map((topic) => (
        <RecommendedTopic story={topic} key={topic.content._uid} />
      ))}
      </Box>
    </Container>
  );
};

export default TopicsPage;
