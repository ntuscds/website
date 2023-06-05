import React from "react";
import { NavBarContainer } from "./NavBarContainer";
import { Logo, LogoProps } from "./Logo";
import { MenuToggle } from "./MenuToggle";
import { MenuItems } from "./MenuItems";
import { NavDrawer } from "./NavDrawer";
import { HStack, useDisclosure } from "@chakra-ui/react";
import { MenuLinkProps } from "./MenuLink";

export interface NavBarProps {
  links: Array<MenuLinkProps>;
  logoProps: LogoProps;
}

export const NavBar = ({ links, logoProps }: NavBarProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <NavBarContainer>
      <HStack columnGap="25px" minW={{ base: "auto", xl: "100%" }}>
        <Logo src={logoProps.src} alt={logoProps.alt} />
        <MenuItems links={links} />
      </HStack>

      {/* For small screen sizes */}
      <MenuToggle toggle={onOpen} isOpen={isOpen} />
      <NavDrawer isOpen={isOpen} onClose={onClose} links={links} />
    </NavBarContainer>
  );
};
