import { StoryblokComponent } from "@storyblok/react";

export const Page = (params: any) =>{
    return <main>
        {params.blok.body.map((blok: any) => 
        (
            <StoryblokComponent blok={blok} key={blok._uid} />
        )
        )}
    </main>;
};
