import React from "react";
import CheckIcon from '@mui/icons-material/Check';
import DoneAllIcon from '@mui/icons-material/DoneAll';

const DeliveredIcon = ({ chatIcon }) => {
  switch (chatIcon) {
    case 'check':
      return <CheckIcon />
    case 'done_all':
      return <DoneAllIcon />
    default:
      return null
  }
};

export default DeliveredIcon;
