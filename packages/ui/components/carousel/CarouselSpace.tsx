import { Flex, Heading, Divider } from "@chakra-ui/react";
import { ChakraUICarousel } from "./ChakraUICarousel";
import { ChakraUICarouselProps } from "./ChakraUICarousel"

export interface CarouselProps extends ChakraUICarouselProps {
    heading?: string;
}

export const CarouselSpace = ({ heading, carouselItems }: CarouselProps) => {
    return (
        <Flex
            bg={'#e6e3e3'}
            paddingTop={'20px'}
            paddingBottom={'60px'}
            borderColor={'purple'}
            justifyContent={'center'}
            alignItems={'center'}
            paddingLeft={0}
            paddingRight={0}
            flexDirection={'column'}
            width={{ base: '90vw', md: '80vw', lg: '80vw' }}
        >
            { heading && <Heading fontSize={'4xl'} as={'b'} lineHeight={'1.1em'} textAlign={'center'}>{ heading }</Heading> }
            { heading && <Divider width={'50%'} marginTop={'15px'} marginBottom={'15px'} borderTop={'1px'} borderBottom={'0px'} borderColor={'black'}></Divider> }

            <Flex paddingLeft={'10%'}
                  paddingRight={'10%'}
                >
                <ChakraUICarousel carouselItems={ carouselItems } />
            </Flex>
        </Flex>
    )
}