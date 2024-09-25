"use client";
import { Box, Button, Link, Text } from "@chakra-ui/react";
import { renderRichText } from "@storyblok/react";

export const WelcomeBox = (params: any) => {
    const stripHtmlTags = (htmlString: string) => {
        const doc = new DOMParser().parseFromString(htmlString, "text/html");
        return doc.body.textContent || "";
    };
    return (
        <Box  my={6} maxW={["100%", "550px"]} mx="auto" px={6}>
        <Box
            px={16}
            boxShadow={"0px 20px 40px 0px rgba(0, 0, 0, .3)"}
            py={24}
            rounded="lg"
            bg="white"
             marginX={'auto'}
            position="relative" 
        >
            <Text
                fontSize={["24px", "32px"]}
                fontWeight="black"
                mb={3}
            >
                {params.blok.title}
            </Text>

                <Box fontSize={"18px"}>
                    {stripHtmlTags(renderRichText(params.blok.content))}
                </Box>

        </Box>
                        <Box m={6}>
                            <Link  href={params.blok.buttonLink.cached_url} > 
                            <Button width={"100%"}  colorScheme="blue">{params.blok.button}</Button>
                            </Link>
                            </Box>
                         </Box>
    );
};