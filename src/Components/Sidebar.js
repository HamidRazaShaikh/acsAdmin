import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu';
import { IconContext } from 'react-icons/lib';


const Nav = styled.div`
//horizental bar
  background: white;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow: auto;
`;
const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: black;
`;
const SidebarNav = styled.nav`
  background: #151B26;
  width: 300px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: .7s;
  z-index: 10;
  overflow: auto;
`;
const SidebarWrap = styled.div`
  width: 100%;
  overflow: auto;

`;
const Sidebar = () => {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    return (
        <div>

            <IconContext.Provider value={{ color: '//#endregion' }}>
                <Nav>
                    <NavIcon to='#'>
                        <FaIcons.FaBars onClick={showSidebar} />
                    </NavIcon>
                   < a href="/"><img className="logo ml-5" src="./images/Clogo.png" alt="Clogo" /></a> 
                    <p className="pull-right text-dark font-weight-bolder h3 ml-5">Organization</p>
                </Nav>
                <SidebarNav sidebar={sidebar}>
                    <SidebarWrap>
                        <NavIcon to='#'>
                            <AiIcons.AiOutlineClose onClick={showSidebar} />
                        </NavIcon>
                        {SidebarData.map((item, index) => {
                            return <SubMenu item={item} key={index}  />;
                        })}
                    </SidebarWrap>
                </SidebarNav>
            </IconContext.Provider>
        </div>
    );
};
export default Sidebar;