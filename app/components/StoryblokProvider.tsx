"use client";
import type { PropsWithChildren } from "react";
import { storyblokInit, apiPlugin } from "@storyblok/react";
import {Topic} from "./Topic";
import {Page}  from "./Page";
import { Hero } from "./Hero"
import {Grid} from "./Grid";
import { Feature } from "./Feature";
import { RecommendedTopics } from "./RecommendedTopics";
import { WelcomeBox } from "./WelcomeBox";
import Footer from "./Footer";
import BlogPostSection from "./BlogPostSection"



storyblokInit({
    accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
    use: [apiPlugin],
    components: {
        topic: Topic,
        page: Page,
        hero: Hero,
        grid: Grid,
        feature: Feature,
        recommended_topics: RecommendedTopics,
        welcomeBox: WelcomeBox,
        footer: Footer,
        blogPostSection: BlogPostSection,
    },
    enableFallbackComponent: true,
});

export const StoryblokProvider = ({children}: PropsWithChildren) => {
    return <>{children}</>;
};