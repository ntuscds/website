import { Flex, VStack, Box, Text, Stack, Link, Icon } from "@chakra-ui/react";
import { FooterLinkGroup, FooterLinkGroupProps } from "./FooterLink";
import { Image, VercelPowered, VercelPoweredProps } from "ui";
import { LogoProps } from "../navbar/Logo";

export interface FooterProps {
  logoProps: LogoProps;
  socialLinks: Array<{
    name: string;
    icon: any;
    href: string;
  }>;
  studentLinksGroup: FooterLinkGroupProps;
  companyLinksGroup?: FooterLinkGroupProps;
  vercelPoweredProps: VercelPoweredProps;
}

export const Footer = (props: FooterProps) => {
  const {
    logoProps,
    socialLinks,
    studentLinksGroup,
    companyLinksGroup,
    vercelPoweredProps,
  } = props;

  return (
    <VStack
      bg="brand.navy.dark"
      px={{ base: "5px", md: "8px", lg: "75px" }}
      pt={{ base: "50px", md: "48px" }}
      pb={{ base: "32px", md: "5px" }}
    >
      {/* Main Footer */}
      <Flex
        w={{ base: "100%", md: "90%" }}
        py="10px"
        flexDir={{ base: "column", lg: "row" }}
        justifyContent="space-between"
        alignItems={{ base: "flex-start", lg: "center" }}
      >
        <Flex
          color="white"
          w={{ base: "100%", lg: "40%" }}
          px={{ base: "24px", lg: "0px" }}
          flexDir="column"
          gap={4}
        >
          {/* Logo and Club Name */}
          <Box>
            <Link href="/" _hover={{ textDecoration: "none" }}>
              <Stack
                align="center"
                justify="flex-start"
                direction="row"
                gap={2}
              >
                <Box
                  minWidth={{ base: 50, md: 75 }}
                  maxWidth={{ base: 50, md: 75 }}
                  transitionDuration="200ms"
                >
                  <Image
                    src={logoProps.src}
                    alt={logoProps.alt}
                    width={100}
                    height={100}
                  />
                </Box>
                <Text
                  fontSize={{ base: "18px", md: "22px" }}
                  fontWeight="semibold"
                  _hover={{ color: "brand.red.medium" }}
                >
                   Students&apos; Computing and Data Science Club
                </Text>
              </Stack>
            </Link>
          </Box>

          {/* Club Description */}
          <Box fontWeight="light">
            <Text>
              SCDS Club is an academic club in Nanyang Technological
              University. It serves the the CCDS students and allow them to have
              a safe space to&nbsp;
              <Text as="span" color="brand.red.medium" fontWeight="semibold">
                experience
              </Text>
              ,&nbsp;
              <Text as="span" color="brand.red.medium" fontWeight="semibold">
                share
              </Text>
              , and&nbsp;
              <Text as="span" color="brand.red.medium" fontWeight="semibold">
                grow
              </Text>
              .
            </Text>
          </Box>

          {/* Social Links */}
          <Flex flexWrap="wrap" gap={6}>
            {socialLinks.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                display="flex"
                flexDir="row"
                alignItems="center"
                justifyContent="center"
                gap={1}
              >
                {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
                <Icon as={social.icon} />
                <Text>{social.name}</Text>
              </Link>
            ))}
          </Flex>
          <Box>
            <Text as="span" fontWeight="light">
              Email:&nbsp;
            </Text>
            <Link
              href="mailto:scds-club@e.ntu.edu.sg"
              fontWeight="semibold"
              textDecor="underline"
              _hover={{ color: "brand.red.medium" }}
            >
              scds-club@e.ntu.edu.sg
            </Link>
          </Box>
        </Flex>

        {/* Footer Links Container */}
        <Flex
          alignSelf={{ md: "center" }}
          justifySelf={{ md: "flex-end" }}
          flexDir={{ base: "column", md: "row" }}
          mt={{ base: "32px", md: "0px" }}
        >
          {/* Footer Links for Students */}
          <FooterLinkGroup
            links={studentLinksGroup.links}
            header={studentLinksGroup.header}
          />
          {/* Footer Links for Companies */}
          {companyLinksGroup && (
            <FooterLinkGroup
              links={companyLinksGroup.links}
              header={companyLinksGroup.header}
            />
          )}
        </Flex>
      </Flex>

      {/* Credits  */}
      <Flex
        flexDir={{ base: "column", lg: "row" }}
        justifyContent="flex-end"
        alignItems="center"
        gap={6}
        width="100%"
        py="24px"
        pb={{ base: "0px", md: "24px" }}
      >
        {/* Vercel Tag */}
        <VercelPowered {...vercelPoweredProps} />
        {/* Copyright */}
        <Text color="white" fontSize="12px" fontWeight="light">
          Copyright &#169; 2024 - SCDS Club
        </Text>
      </Flex>
    </VStack>
  );
};
