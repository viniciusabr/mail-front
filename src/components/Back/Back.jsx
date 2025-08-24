import React from "react";
import { useNavigate } from "react-router-dom";
import { CircleArrowLeft } from "lucide-react";
import { ArrowIcon } from "./stylesBack";


export default function Back(){

    const navigate = useNavigate();

    return(
       <div style={{width:'10px'}}>
      <ArrowIcon  size={30} onClick={() => navigate(-1)} />
    </div>
    )
}