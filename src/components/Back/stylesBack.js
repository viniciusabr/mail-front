import styled from "styled-components";
import { CircleArrowLeft } from 'lucide-react';

export const ArrowIcon = styled(CircleArrowLeft)`
  position: fixed;
  cursor: pointer;
  color: #512DA8;
  transition: color 0.2s ease;

  &:hover {
    color: #ff7c00;
    width: 35px;
    height: 35px;
    size: 35px;
  }
`