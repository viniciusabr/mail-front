import React, {useState} from "react";

import SidebarAdm from "../../components/Sidebar/SidebarAdm"

export default function Dashboard(){
const [isOpen, setIsOpen] = useState(false);
    return (
        <div>
            <SidebarAdm isOpen={isOpen} setIsOpen={setIsOpen} />
            Dashboard em construção
            
        </div>
    )
}