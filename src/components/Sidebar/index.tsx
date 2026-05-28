import SidebarButton from '../SidebarButton';
import styles from './style.module.scss';

import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightArrowLeft, faBriefcase, faBuildingColumns, faChartColumn, faChevronDown, faClipboardList, faCoins, faHandHoldingDollar, faPiggyBank, faSackDollar, faScrewdriverWrench, faScroll, faSliders, faTag, faUserCheck, faUserGear, faUserGroup, faUsers, faUserXmark } from '@fortawesome/free-solid-svg-icons';
import { faHandshake } from '@fortawesome/free-regular-svg-icons';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function Sidebar() {
    const id = React.useId();
    const buttonId = `${id}-button`;
    const menuId = `${id}-menu`;
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <div className={styles.container}>
                <div>
                    <Button
                        className={styles.sidebar_dropdown}
                        id={buttonId}
                        aria-controls={open ? menuId : undefined}
                        aria-haspopup="true"
                        aria-expanded={open}
                        onClick={handleClick}
                    >
                        <FontAwesomeIcon className={styles.icon} icon={faBriefcase} />
                        <span>Switch Organization</span>
                        <FontAwesomeIcon className={styles.icon} icon={faChevronDown} />
                    </Button>
                    <Menu
                        id={menuId}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        slotProps={{
                            list: {
                                'aria-labelledby': buttonId,
                            },
                        }}
                    >
                        <MenuItem onClick={handleClose}><FontAwesomeIcon className={styles.menu_icon} icon={faBuildingColumns}/>Sterlink Bank</MenuItem>
                        <MenuItem onClick={handleClose}><FontAwesomeIcon className={styles.menu_icon} icon={faBuildingColumns}/>Kredi Bank</MenuItem>
                        <MenuItem onClick={handleClose}><FontAwesomeIcon className={styles.menu_icon} icon={faCoins}/>Paycient Finance</MenuItem>
                    </Menu>
                </div>

                <SidebarButton icon={faUserGroup} label={"Dashboard"} active/>
                
                <div className={styles.section_divider} id='customers'>
                    <h1 className={styles.title}>CUSTOMERS</h1>
                    <SidebarButton icon={faUserGroup} label={"Users"}/>
                    <SidebarButton icon={faUsers} label={"Guarantors"} />
                    <SidebarButton icon={faSackDollar} label={"Loans"} />
                    <SidebarButton icon={faHandshake} label={"Decision Models"} />
                    <SidebarButton icon={faPiggyBank} label={"Savings"} />
                    <SidebarButton icon={faHandHoldingDollar} label={"Loan Requsts"} />
                    <SidebarButton icon={faUserCheck} label={"Whitelist"} />
                    <SidebarButton icon={faUserXmark} label={"Karma"} />
                </div>
                
                <div className={styles.section_divider} id='businesses'>
                    <h1 className={styles.title}>BUSINESSES</h1>
                    <SidebarButton icon={faBriefcase} label={"Organization"} />
                    <SidebarButton icon={faHandHoldingDollar} label={"Loan Products"} />
                    <SidebarButton icon={faBuildingColumns} label={"Savings Products"} />
                    <SidebarButton icon={faCoins} label={"Fees and Charges"} />
                    <SidebarButton icon={faArrowRightArrowLeft} label={"Transactions"} />
                    <SidebarButton icon={faScrewdriverWrench} label={"Services"} />
                    <SidebarButton icon={faUserGear} label={"Service Account"} />
                    <SidebarButton icon={faScroll} label={"Settlements"} />
                    <SidebarButton icon={faChartColumn} label={"Reports"} />
                </div>
                
                <div className={styles.section_divider} id='settings'>
                    <h1 className={styles.title}>SETTINGS</h1>
                    <SidebarButton icon={faSliders} label={"Preferences"} />
                    <SidebarButton icon={faTag} label={"Fees and Pricing"} />
                    <SidebarButton icon={faClipboardList} label={"Audit Logs"} />
                </div>
            </div>
        </>
    )
}