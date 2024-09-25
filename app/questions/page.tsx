"use client";
import { useEffect, useState } from 'react';
import { getStoryblokApi, StoryblokComponent, ISbStoryData } from '@storyblok/react';
import { Box, Container, Flex, Button, Text } from "@chakra-ui/react";
import { QuestionBox } from "../components/QuestionBox";

interface QuestionData extends ISbStoryData {
  _uid: string;
  content: {
    question: string;
    category: string;
    answear?: {
      type: string;
      content?: any[];
    };
    component: string; 
  };
}

const fetchQuestionsPage = async (accessToken: string) => {
  try {
    const client = getStoryblokApi();
    const response = await client.getStory('questions', {
      version: 'published',
      token: accessToken,
    });
    return response.data.story as ISbStoryData;
  } catch (error) {
    console.error('Error fetching questions page:', error);
    return null;
  }
};

const fetchAllQuestions = async (accessToken: string) => {
  try {
    const client = getStoryblokApi();
    const response = await client.getStories({
      content_type: 'interviewQ',
      version: 'published',
      token: accessToken,
    });
    return response.data.stories as QuestionData[];
  } catch (error) {
    console.error('Error fetching all questions:', error);
    return [];
  }
};

const QuestionsPage = () => {
  const [story, setStory] = useState<ISbStoryData | null>(null);
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN || '';
        const fetchedStory = await fetchQuestionsPage(accessToken);
        setStory(fetchedStory);

        const fetchedQuestions = await fetchAllQuestions(accessToken);
        setQuestions(fetchedQuestions);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const nextQuestion = () => {
    if (questions.length > 1) {
      let randomIndex = currentQuestionIndex;
      while (randomIndex === currentQuestionIndex) {
        randomIndex = Math.floor(Math.random() * questions.length);
      }
      setCurrentQuestionIndex(randomIndex);
    }
  };

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  if (!story || questions.length === 0) {
    return (
      <Container minHeight={["auto", "85vh"]}>
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
          Loading...
        </Box>
      </Container>
    );
  }

  return (
    <Container minHeight={["auto", "85vh"]} onContextMenu={handleContextMenu}>
      {/* Render StoryblokComponent for story.content */}
      <StoryblokComponent blok={story.content} />

      {/* Display question info */}
      <Flex direction="column" maxW={["100%", "550px"]} mx="auto">
        <Text align="center" mt={8}>
           {currentQuestionIndex + 1} / {questions.length}
        </Text>

        {/* Render current question */}
        <Box key={questions[currentQuestionIndex]._uid}>
          <QuestionBox blok={questions[currentQuestionIndex].content} />
        </Box>
        <Button onClick={nextQuestion} m={6} colorScheme="blue">Next Question</Button>
      </Flex>
    </Container>
  );
};

export default QuestionsPage;
