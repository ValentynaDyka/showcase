"use client";
import { useEffect, useState } from 'react';
import { ISbStoriesParams, ISbStoryData, StoryblokComponent } from "@storyblok/react";
import { StoryblokProvider } from "../components/StoryblokProvider";
import { Box, Container } from "@chakra-ui/react";

const isDraftModeEnabled = process.env.NEXT_PUBLIC_IS_PREVIEW === "true";
export const dynamic = isDraftModeEnabled ? "force-dynamic" : "error";

const fetchStoryBySlug = async (slug?: string[]): Promise<{ story: ISbStoryData | null }> => {
  const contentVersion = isDraftModeEnabled ? "draft" : "published";

  const searchParamsData: ISbStoriesParams = {
    token: process.env.NEXT_PUBLIC_SB_PREVIEW_TOKEN!,
    version: contentVersion,
  };

  const searchParams = new URLSearchParams(searchParamsData as Record<string, string>);
  const url = `https://api.storyblok.com/v2/cdn/stories/${slug?.join("/") || ""}?${searchParams.toString()}`;

  // console.log('Fetch URL Page:', url);

  try {
    const response = await fetch(url, {
      headers: {
        next: JSON.stringify({
          tags: ["page"],
        }),
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const { story } = await response.json();

    // Verify that the fetched component type is "page"
    if (story && story.content.component === "page") {
      return {
        story: story || null,
      };
    } else {
      console.error('Fetched component is not of type "page":', story);
      return { story: null };
    }
  } catch (error) {
    console.error('Error fetching Storyblok content:', error);
    return { story: null };
  }
};

type Props = {
  params: { slug?: string[] };
};

const Home = ({ params }: Props) => {
  // console.log('params.slug Page:', params.slug); // Log params to check if slug is undefined or empty
  const correctPath = params?.slug ?? ["home"];
  const [story, setStory] = useState<ISbStoryData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      const { story } = await fetchStoryBySlug(correctPath);

      if (!story) {
        console.error('Failed to fetch story for slug:', correctPath);
      } else {
        console.log('Story fetched successfully:', story);
        setStory(story);
      }
      setIsLoading(false);
    }

    fetchData();
  }, [correctPath]);

  if (isLoading) {
    return null; // Return null to avoid displaying the Loading message
  }

  if (!story) {
    return (
      <Container  minHeight={["auto", "85vh"]}>
        <Box
          px={16}
          boxShadow={"0px 20px 40px 0px rgba(0, 0, 0, .3)"}
          p="6"
          rounded="md"
          bg="white"
          mx={'auto'}
          maxW={["100%", "550px"]}
          my={6}
        >
          No content available.
        </Box>
      </Container>
    );
  }

  if (isDraftModeEnabled) {
    return (
      <StoryblokProvider>
        <StoryblokComponent blok={story.content} />
      </StoryblokProvider>
    );
  }

  return <StoryblokComponent blok={story.content} />;
};

export default Home;
