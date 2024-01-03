import React from 'react';
import { useColorMode, useColorModeValue, IconButton ,Button, HStack} from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

export const ColorModeSwitcher = props => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <Button 
      size="sm"
       borderRadius={"50%"}
       px={"0px"}
      aria-label={`Switch to ${text} mode`}
     
      color= {text!=="dark"?"black":"white"}
      marginLeft="2"
      onClick={toggleColorMode}
      colorScheme={"purple"}
    
      {...props}
      
     >  <SwitchIcon fontSize="15px"  />  </Button>
  );
};
