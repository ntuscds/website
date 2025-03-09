import { Box, Grid, GridItem, Heading, Text, VStack } from "@chakra-ui/react";
import { ButtonLink } from "ui";
import Image from "next/image";

export const PYPSection = () => {
  const modules: Array<string> = [
    "CE3006",
    "CE3007",
    "CE/CZ4022",
    "CE/CZ4023",
    "CE/CZ4064",
    "CE/CZ4015",
  ];

  return (
    <VStack mx={{ base: 0, lg: 10 }} mb={12} p={5} spacing={5}>
      <Heading p={5}>LINKS TO PYPs</Heading>

      <Grid
        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
        gap={5}
        width={{ base: "100%", md: "auto" }}
      >
        <GridItem>
          <ButtonLink
            label="PYP QUESTIONS"
            href="https://ts.ntu.edu.sg/sites/lib-repository/exam-question-papers/_layouts/15/start.aspx#/Shared%20Documents/Forms/AllItems.aspx"
            width={{ base: "100%", md: "auto" }}
            size="lg"
          />
        </GridItem>
        <GridItem>
          <ButtonLink
            label="PYP SOLUTIONS"
            href="https://scds.cc/pastyearpapers"
            variant="primary-black"
            size="lg"
            width={{ base: "100%", md: "auto" }}
          />
        </GridItem>
      </Grid>
      <Grid
        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
        gap={5}
        width={{ base: "100%", md: "auto" }}
      >
        <GridItem justifySelf={{ base: "center", md: "flex-end" }}>
          <Box>
            <Image
              src="/neve-web-design-studio-06.jpg"
              alt="employees working in a studio"
              width={530}
              height={530}
            />
          </Box>
        </GridItem>
        <GridItem maxWidth={530}>
          <Text mb={30}>
            To provide you with better support in the midst of the Covid-19
            situation, we will be providing the PYP solutions online.
            Moreover, we would like your support for the following modules:
          </Text>
          {modules.map((module) => (
            <Text key={module} mb={30}>
              – {module}
            </Text>
          ))}
          <Text mb={30}>
            Currently we are not able to provide the complete softcopy version
            for those modules. If you possess a hardcopy of any of the
            modules, please contact us for further details on how you can
            help.
          </Text>
        </GridItem>
      </Grid>
    </VStack>
  );
};
