import React from 'react';
import * as FiIcons from 'react-icons/fi';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri'

export const SidebarData = [
    {
        title: 'Profile',
        path: '#',
        icon: <AiIcons.AiOutlineUser/>,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,

        subNav: [
            {
                title: 'Update Email',
                path: '/getEmail',
                // icon: <IoIcons.IoIosPaper />
            },
            {
                title: 'Update Password',
                path: '/updatepassword',
                // icon: <IoIcons.IoIosPaper />
            }
            
        ]
    },
    {
        title: 'Organization',
        path: '#',
        icon: <FaIcons.FaSitemap />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,

        subNav: [
            {
                title: 'Profile',
                path: '/orgprofile',
                // icon: <IoIcons.IoIosPaper />,
                cName: 'sub-nav'
            },
            {
                title: 'Add Location',
                path: '/locationprofile',
                // icon: <IoIcons.IoIosPaper />,
                cName: 'sub-nav'
            },

            {
                title: 'All Locations',
                path: '/alllocations',
                // icon: <IoIcons.IoIosPaper />,
                cName: 'sub-nav'
            },
            {
                title: 'Add Department',
                path: '/departmentprofile',
                // icon: <IoIcons.IoIosPaper />,
                cName: 'sub-nav'
            },
            {
                title: 'All Department',
                path: '/alldepartments',
                // icon: <IoIcons.IoIosPaper />,
                cName: 'sub-nav'
            },
            {
                title: 'Add Medical Procedure',
                path: '/medicalprocedure',
                // icon: <IoIcons.IoIosPaper />,
                cName: 'sub-nav'
            },
            {
                title: 'All Medical Procedures',
                path: '/allmedicalprocedure',
                // icon: <IoIcons.IoIosPaper />,
                cName: 'sub-nav'
            },


        ]
    },
    {
        title: 'Access Control',
        path: '#',
        icon: <AiIcons.AiOutlineControl />,

        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,

        subNav: [
            {
                title: 'Policy Group',
                path: '/policygroup',
                //icon: <IoIcons.IoIosPaper />
            },
            {
                title: 'All Policy Group',
                path: '/allpolicygroup',
                //icon: <IoIcons.IoIosPaper />
            },
            {
                title: 'Access Limit',
                path: '/alllimits',
               // icon: <IoIcons.IoIosPaper />
            }
        ]
    },
    {
        title: 'Users',
        path: '#',
        icon: <FiIcons.FiUsers />,

        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,

        subNav: [
            {
                title: 'Add Users',
                path: '/addusers',
                //icon: <IoIcons.IoIosPaper />
            },
            {
                title: 'All Users',
                path: '/allusers',
               // icon: <IoIcons.IoIosPaper />
            }
        ]
    }
  
        
    
];