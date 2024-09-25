import { Box, Container, Flex, Link, Text } from "@chakra-ui/react";
import { StoryblokComponent } from "@storyblok/react";

interface FooterProps {
  blok: {
    menu: {
      _uid: string;
      linkName: string;
      linkUrl: {
        cached_url: string; 
      };
    }[];
  };
}

const Footer = ({ blok }: FooterProps) => {
  const date = new Date();
  const year = date.getFullYear();


  return (
    <Box as="footer" pt={10}>
      <Container>
        <Flex
          flexDirection={["column", "row"]}
          justifyContent="space-between"
          py={10}
          gap={8}
          borderTop="1px"
          borderColor="gray.200"
          alignItems={["center", "inherit"]}
        >
           <Text size={'small'}>© {year} <Link href="https://vel-dyka.tech/">Valentyna Dyka.</Link> All rights reserved.</Text>
          <Flex
            flexWrap={["nowrap", "wrap"]}
            alignItems="center"
            gap="1rem"
            fontSize="small"
          >
            
            {blok.menu.map((item) => (
                <Text key={item._uid}>
                  <Link
                    href={item.linkUrl.cached_url}
                    sx={{
                      "&:hover": {
                        color: "gray.500",
                        textDecoration: "none",
                      },
                    }}
                  >
                    {item.linkName}
                  </Link>
                </Text>
              )
            )}
          </Flex>
        </Flex>
      </Container>
      <script data-name="BMC-Widget" data-cfasync="false" src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js" data-id="veldyka1604" data-description="Support me on Buy me a coffee!" data-message="Сказати дякую" data-color="#5F7FFF" data-position="Right" data-x_margin="18" data-y_margin="18"></script>
    </Box>
  );
};

export default Footer;




