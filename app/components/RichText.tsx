import { StoryblokComponent } from '@storyblok/react';
import { Box, Text, Heading, Link, List, ListItem } from '@chakra-ui/react';
import React from "react";

type BlokType = {
  _uid: string;
  component: 'text' | 'heading' | 'link' | 'list' | string;
  level?: number;
  text?: string;
  url?: string;
  items?: string[];
  [key: string]: any;
};

type RichTextProps = {
  content: {
    body?: BlokType[];
  };
};

const RichText = ({ content }: RichTextProps) => {
  if (!content || !content.body) {
    return null; 
  }

  return (
    <>
      {content.body.map((blok) => (
        <Box key={blok._uid} mb={4}>
          {renderBlok(blok)}
        </Box>
      ))}
    </>
  );
};

const renderBlok = (blok: BlokType) => {
  switch (blok.component) {
    case 'text':
      return renderText(blok.text);
    case 'heading':
      return <Heading as={getHeadingAs(blok.level)} size={getHeadingAs(blok.level)}>{blok.text}</Heading>;
    case 'link':
      return (
        <Link href={blok.url} isExternal>
          {blok.text}
        </Link>
      );
    case 'list':
      return (
        <List>
          {blok.items?.map((item: string, index: number) => (
            <ListItem key={index}>{item}</ListItem>
          ))}
        </List>
      );
    default:
      return <StoryblokComponent blok={blok} />;
  }
};

const renderText = (text?: string) => {
  if (!text) return null;

  // Split text by double new lines (\n\n) to handle paragraphs
  const paragraphs = text.split('\n\n').map((paragraph, index) => (
    <Text key={index} mb={2}>
      {paragraph.split('\n').map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ))}
    </Text>
  ));

  return <>{paragraphs}</>;
};

const getHeadingAs = (level?: number) => {
  switch (level) {
    case 1:
      return 'h1';
    case 2:
      return 'h2';
    case 3:
      return 'h3';
    case 4:
      return 'h4';
    case 5:
      return 'h5';
    case 6:
      return 'h6';
    default:
      return 'h2'; 
  }
};

export default RichText;
