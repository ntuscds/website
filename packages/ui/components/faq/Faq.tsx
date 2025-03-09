import { Qna, QnaProps } from "./Qna";
import { Grid, Center, Heading, Flex, GridItem } from "@chakra-ui/react";

export interface FaqProps {
  heading: string;
  qnaList: Array<QnaProps>;
}

export const Faq = ({ heading, qnaList }: FaqProps) => {
  return (
    <Center
      paddingLeft={{ base: "5px", lg: "20px" }}
      paddingRight={{ base: "5px", lg: "20px" }}
      paddingTop={{ base: "20px", lg: "80px" }}
      paddingBottom={{ base: "20px", md: "80px" }}
    >
      <Flex
        borderColor="red"
        flexDirection="column"
        padding={{ base: "5px", lg: "10px" }}
        marginLeft={{ base: "0%", md: "5%" }}
        marginRight={{ base: "0%", md: "5%" }}
      >
        <Heading
          textAlign="center"
          padding="20px"
          marginBottom="20px"
          fontSize="3xl"
          as="b"
        >
          {heading}
        </Heading>
        <Grid
          justifyItems="flex-start"
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
        >
          {qnaList.map((qna,idx) => (
            <GridItem key={idx}>
              <Qna question={qna.question} answer={qna.answer} />
            </GridItem>
          ))}
        </Grid>
      </Flex>
    </Center>
  );
};
