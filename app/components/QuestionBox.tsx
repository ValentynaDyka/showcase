"use client";

import { Box, Text, Progress } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import RichText from "../components/RichText";
import { BlokType } from "../types";

type QuestionBoxProps = {
  blok: {
    question: string;
    category: string;
    answear?: {
      type: string;
      content?: any[];
    };
  };
};

export const QuestionBox = ({ blok }: QuestionBoxProps) => {
  console.log('QuestionBox Blok:', JSON.stringify(blok, null, 2));

  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    setShowAnswer(false);
    const timer = setTimeout(() => {
      setShowAnswer(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [blok]);

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  const { question, category, answear } = blok;
  
  console.log('Question:', question);
  console.log('Category:', category);
  console.log('Answer:', answear);

  if (!answear || !answear.content || answear.content.length === 0) {
    return <Text>No answer available</Text>;
  }

  const transformedContent: { body: BlokType[] } = {
    body: answear.content.map((item: any, index: number) => {
      
      if (!item.content) return null;
      switch (item.type) {
        case 'paragraph':
          return {
            _uid: `paragraph-${index}`,
            component: 'text',
            text: item.content.map((content: any) => content.text).join(''),
          } as BlokType;
          
        default:
          return null;
      }
    }).filter((item: BlokType | null): item is BlokType => !!item) || [],
  };

  console.log('Transformed Content:', transformedContent);

  return (
    <Box
      px={[6, 16]}
      boxShadow={"0px 20px 40px 0px rgba(0, 0, 0, .3)"}
      py={[10, 24]}
      rounded="lg"
      bg="white"
      m={6}
      position="relative"
      onContextMenu={handleContextMenu}
    >
      <Text as={"p"} color="gray.400" fontSize={"12px"} textTransform={"uppercase"} mb={4}>
        {category}
      </Text>
      <Text fontSize={["24px", "32px"]} fontWeight="black" mb={3}>
        {question}
      </Text>
      {showAnswer && (
        <Box
          boxShadow='inner'
          p='6'
          rounded='md'
          bg='gray.50'
          fontSize={"18px"}
          userSelect="none"
        >
          <RichText content={transformedContent} />
        </Box>
      )}
      {!showAnswer && (
        <Box position="absolute" bottom={0} left={0} right={0}>
          <Progress size="xs" isIndeterminate />
        </Box>
      )}
    </Box>
  );
};
