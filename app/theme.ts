import { extendTheme } from '@chakra-ui/react';

const theme = {
   fonts: {
       heading: 'Poppins,sans-serif',
       body: 'Lato,sans-serif',

   },
   colors: {
       tagText: '#b9b9b9',
       brand: {
           bg: '#9747FF',
           text: '#fff',
           card: '#0A99FF',
          
       },
   },
   global: {
    "html, body": {
        maxWidth: "1200px",
        width: "100%",
        margin: "0 auto", // Center the content horizontally
        padding: "0 20px",
        color: "gray.700",  // Add some padding to the sides
      },
  },
   sizes: {
       xl: {
           h: '56px',
           fontSize: 'lg',
           px: '32px',
           bg: '#9747FF'
       },
   },
   components: {
    Container: {
      baseStyle: {
        maxW: "1200px",
        width: "100%",
        mx: "auto",
        px: "20px",
      },
    },
    Link: {
        // Default styles
        baseStyle: {
          color: "gray.700", 
          width: "50",
          height: "50"
        },
      },
      Heading:{
        h3:{
          fontSize: "24px",
        }
      },
      Text: {
        // Default styles
        baseStyle: {
          color: "gray.700", 
          fontWeight: 500, 
        },
      },
}

}

export default extendTheme(theme);