import React from "react";
import { Box, BoxProps } from "@chakra-ui/react";

type SizeOptionType = BoxProps & {
  active: string;
  disabled?: boolean;
  onClick: (param: any) => void;
};

export const SizeOption: React.FC<SizeOptionType> = (props) => {
  const { active = false.toString(), disabled = false, children } = props;
  return (
    <Box
      display="inline-block"
      userSelect="none"
      minWidth="40px"
      maxWidth="120px"
      height="40px"
      pl="10px"
      pr="10px"
      textAlign="center"
      fontWeight={500}
      lineHeight={10}
      opacity={disabled ? 0.4 : 1}
      pointerEvents={disabled ? "none" : "all"}
      cursor={disabled ? "not-allowed" : "pointer"}
      borderWidth={1}
      borderColor="secondary.400"
      color={active == "true" ? "#FFF" : "secondary.400"}
      backgroundColor={active == "true" ? "red.600" : "#FFF"}
      {...props}
    >
      {children}
    </Box>
  );
};
