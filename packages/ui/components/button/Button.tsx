import { Button as BaseButton, Link, Text } from "@chakra-ui/react";
import { HTMLChakraProps, ThemingProps } from "@chakra-ui/system";
import { ButtonOptions } from "@chakra-ui/button";

export interface ButtonProps extends HTMLChakraProps<"button">, ButtonOptions, ThemingProps<"Button"> {
    label: string
    href: string
    size?: 'xs' | 'sm' | 'md' | 'lg'
    buttonType?: 'primary.blue' | 'primary.black'
}

export const Button = ({ buttonType='primary.blue', ...props }: ButtonProps) => {
    let button;
    switch (buttonType) {
        case 'primary.black':
            button = <PrimaryBlackButton {...props} />
            break
        default:
            button = <PrimaryBlueButton {...props} />
  }

  return button
}

// Different Button Styles
const PrimaryBlueButton = ({ label, href, size='lg', ...props }: ButtonProps) => {
  return (
      <BaseButton
          key={label}
          size={size}
          rounded={'none'}
          bg={'blue.600'}
          color={'white'}
          _hover={{ bg: 'white', color: 'black' }}
          fontFamily={"Verdana Light"}
          px={12}
          py={8}
          {...props}>
          <Link href={href} _hover={{textDecoration: 'none'}}>
              <Text>{label}</Text>
          </Link>
      </BaseButton>
  )
}
const PrimaryBlackButton = ({ label, href, size='lg', ...props }: ButtonProps) => {
  return (
      <BaseButton
          key={label}
          size={size}
          rounded={'none'}
          bg={'black'}
          color={'white'}
          _hover={{ bg: 'white', color: 'black' }}
          fontFamily={"Verdana Light"}
          px={12}
          py={8}
          {...props}>
          <Link href={href} _hover={{textDecoration: 'none'}}>
            <Text>{label}</Text>
          </Link>
      </BaseButton>
  )
}