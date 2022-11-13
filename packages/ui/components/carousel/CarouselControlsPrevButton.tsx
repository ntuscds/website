import { Box, IconButton } from "@chakra-ui/react";
import { ArrowLeftIcon } from "@chakra-ui/icons";

export const CarouselControlsPrevButton = () => {
    return (
        <Box>
            <IconButton
                aria-label={'Previous'}
                bg={'grey'}
                className={"carousel-control left"}
                display={'inline-block'}
                position={'absolute'}
                cursor={'pointer'}
                left={'2'}
                top={'45%'}
                rounded={20}
                opacity={'0.8'}
                icon={<ArrowLeftIcon/>}>
                Prev</IconButton>
        </Box>
    )
}