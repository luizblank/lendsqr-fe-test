import styles from './style.module.scss';
import * as React from 'react';

import DashboardCard from "../../components/DashboardCard";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faEllipsisVertical, faHandHoldingDollar, faPersonCircleCheck, faPersonCircleMinus, faPersonCircleXmark, faUserGroup, faUsers, faFilter } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-regular-svg-icons';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Pagination from '@mui/material/Pagination';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import TextField from '@mui/material/TextField';

import userData from '../../data/example.json';

interface Column {
    id: 'organization' | 'username' | 'email' | 'phoneNumber' | 'dateJoined' | 'status';
    label: string;
    minWidth?: number;
    align?: 'right' | 'left' | 'center';
}

const columns: readonly Column[] = [
    { id: 'organization', label: 'ORGANIZATION', minWidth: 140 },
    { id: 'username', label: 'USERNAME', minWidth: 120 },
    { id: 'email', label: 'EMAIL', minWidth: 150 },
    { id: 'phoneNumber', label: 'PHONE NUMBER', minWidth: 140 },
    { id: 'dateJoined', label: 'DATE JOINED', minWidth: 160 },
    { id: 'status', label: 'STATUS', minWidth: 100 },
];

const statusClassMap: Record<string, string> = {
    'Active': styles.status_active,
    'Inactive': styles.status_inactive,
    'Pending': styles.status_pending,
    'Blacklisted': styles.status_blacklisted,
};

interface FilterState {
    organization: string;
    username: string;
    email: string;
    date: string;
    phoneNumber: string;
    status: string;
}

interface User {
    organization: string;
    username: string;
    email: string;
    phoneNumber: string;
    dateJoined: string;
    status: string;
}

export default function Dashboard() {
    const getInitialFilters = (): FilterState => {
        const saved = localStorage.getItem('userFilters');
        if (saved) return JSON.parse(saved);
        return { organization: '', username: '', email: '', date: '', phoneNumber: '', status: '' };
    };

    const getInitialTableData = () => {
    const savedData = localStorage.getItem('userTableData');
    if (savedData) return JSON.parse(savedData);
        return userData;
    };

    const [tableData, setTableData] = React.useState(getInitialTableData);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    
    const [actionAnchorEl, setActionAnchorEl] = React.useState<null | HTMLElement>(null);
    const [activeUserEmail, setActiveUserEmail] = React.useState<string | null>(null);
    const actionMenuOpen = Boolean(actionAnchorEl);
    
    const [filterAnchorEl, setFilterAnchorEl] = React.useState<null | HTMLElement>(null);
    const filterOpen = Boolean(filterAnchorEl);

    const [filters, setFilters] = React.useState<FilterState>(getInitialFilters);
    const [tempFilters, setTempFilters] = React.useState<FilterState>(filters);

    const handleChangePage = (event: unknown, newPage: number) => setPage(newPage);
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handlePaginationChange = (event: React.ChangeEvent<unknown>, value: number) => setPage(value - 1);

    const handleActionClick = (event: React.MouseEvent<HTMLButtonElement>, userEmail: string) => {
        setActionAnchorEl(event.currentTarget);
        setActiveUserEmail(userEmail);
    };
    
    const handleActionClose = () => {
        setActionAnchorEl(null);
        setActiveUserEmail(null);
    };

    const handleStatusChange = (newStatus: string) => {
        if (activeUserEmail) {
            const updatedData = tableData.map((user : User) => 
                user.email === activeUserEmail ? { ...user, status: newStatus } : user
            );
            
            setTableData(updatedData);
            
            localStorage.setItem('userTableData', JSON.stringify(updatedData));
        }
        handleActionClose();
    };

    const handleFilterClick = (event: React.MouseEvent<HTMLElement | SVGSVGElement>) => {
        setTempFilters(filters);
        setFilterAnchorEl(event.currentTarget as HTMLElement);
    };
    const handleFilterClose = () => setFilterAnchorEl(null);

    const applyFilters = () => {
        setFilters(tempFilters);
        localStorage.setItem('userFilters', JSON.stringify(tempFilters));
        setPage(0);
        handleFilterClose();
    };

    const resetFilters = () => {
        const emptyFilters = { organization: '', username: '', email: '', date: '', phoneNumber: '', status: '' };
        setTempFilters(emptyFilters);
        setFilters(emptyFilters);
        localStorage.removeItem('userFilters');
        setPage(0);
        handleFilterClose();
    };

    const handleFilterChange = (field: keyof FilterState) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setTempFilters({ ...tempFilters, [field]: event.target.value });
    };

    const filteredData = React.useMemo(() => {
        return tableData.filter((user : User) => {
            const matchOrg = filters.organization === '' || user.organization.toLowerCase() === filters.organization.toLowerCase();
            const matchUser = filters.username === '' || user.username.toLowerCase().includes(filters.username.toLowerCase());
            const matchEmail = filters.email === '' || user.email.toLowerCase().includes(filters.email.toLowerCase());
            const matchPhone = filters.phoneNumber === '' || user.phoneNumber.includes(filters.phoneNumber);
            const matchStatus = filters.status === '' || user.status.toLowerCase() === filters.status.toLowerCase();
            const matchDate = filters.date === '' || user.dateJoined.includes(filters.date); 

            return matchOrg && matchUser && matchEmail && matchPhone && matchStatus && matchDate;
        });
    }, [tableData, filters]);

    const activeUser = tableData.find((user : User) => user.email === activeUserEmail);
    const currentStatus = activeUser?.status;

    return (
        <>
            <Navbar />

            <div className={styles.container}>
                <Sidebar />
                <div className={styles.selected_screen}>
                    <h1 className={styles.title}>Users</h1>

                    <div className={styles.cards}>
                        <DashboardCard icon={faUserGroup} label='USERS' color='rgba(223, 24, 255, 1)' bgColor='rgba(223, 24, 255, 0.1)' numbers={1200} />
                        <DashboardCard icon={faUsers} label='ACTIVE USERS' color='rgba(87, 24, 255, 1)' bgColor='rgba(87, 24, 255, 0.1)' numbers={1200} />
                        <DashboardCard icon={faHandHoldingDollar} label='USERS WITH LOANS' color='rgba(245, 95, 68, 1)' bgColor='rgba(245, 95, 68, 0.1)' numbers={1200} />
                        <DashboardCard icon={faCoins} label='USERS WITH SAVINGS' color='rgba(255, 51, 102, 1)' bgColor='rgba(255, 51, 102, 0.1)' numbers={1200} />
                    </div>

                    <div className={styles.table_container}>
                        <Paper className={styles.table}>
                            <TableContainer>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            {columns.map((column) => (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                    sx={{ minWidth: column.minWidth }}
                                                    className={styles.table_head}
                                                >
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                        {column.label}
                                                        <FontAwesomeIcon 
                                                            icon={faFilter} 
                                                            style={{ cursor: 'pointer', color: '#545F7D' }} 
                                                            onClick={handleFilterClick} 
                                                        />
                                                    </div>
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {filteredData
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row : User, index : number) => {
                                                const buttonId = `${index}-button`;
                                                return (
                                                    <TableRow className={styles.table_row} hover role="checkbox" tabIndex={-1} key={index}>
                                                        {columns.map((column) => {
                                                            const value = row[column.id];
                                                            return (
                                                                <TableCell
                                                                    key={column.id}
                                                                    align={column.align}
                                                                    className={styles.table_cell}
                                                                >
                                                                    {
                                                                        column.id === 'status' ?
                                                                            <div className={`${styles.status_pill} ${statusClassMap[value as string] || ''}`}>
                                                                                {value as React.ReactNode}
                                                                            </div>
                                                                            : value as React.ReactNode
                                                                    }
                                                                </TableCell>
                                                            );
                                                        })}

                                                        <TableCell key='button' className={styles.table_cell}>
                                                            <Button
                                                                className={styles.sidebar_dropdown}
                                                                id={buttonId}
                                                                aria-controls={actionMenuOpen ? 'action-menu' : undefined}
                                                                aria-haspopup="true"
                                                                aria-expanded={actionMenuOpen}
                                                                onClick={(e) => handleActionClick(e, row.email)}
                                                            >
                                                                <FontAwesomeIcon icon={faEllipsisVertical} />
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>

                        <div className={styles.pagination_container}>
                            <TablePagination
                                className={styles.table_pagination}
                                rowsPerPageOptions={[10, 25, 100]}
                                component="div"
                                count={filteredData.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={() => null}
                                labelRowsPerPage="Showing"
                                labelDisplayedRows={({ count }) => `out of ${count}`}
                            />
                            <Pagination
                                className={styles.pagination}
                                count={Math.ceil(filteredData.length / rowsPerPage) || 1}
                                page={page + 1}
                                onChange={handlePaginationChange}
                                color="primary"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <Menu
                className={styles.dropdown_menu}
                id="action-menu"
                anchorEl={actionAnchorEl}
                open={actionMenuOpen}
                onClose={handleActionClose}
                slotProps={{ paper: { className: styles.dropdown_menu } }}
            >
                <MenuItem onClick={handleActionClose}>
                    <FontAwesomeIcon className={styles.menu_icon} icon={faEye} />View Details
                </MenuItem>

                {currentStatus !== 'Blacklisted' && (
                    <MenuItem onClick={() => handleStatusChange('Blacklisted')}>
                        <FontAwesomeIcon className={styles.menu_icon} icon={faPersonCircleXmark} />Blacklist User
                    </MenuItem>
                )}

                {currentStatus !== 'Active' && (
                    <MenuItem onClick={() => handleStatusChange('Active')}>
                        <FontAwesomeIcon className={styles.menu_icon} icon={faPersonCircleCheck} />Activate User
                    </MenuItem>
                )}

                {currentStatus !== 'Inactive' && (
                    <MenuItem onClick={() => handleStatusChange('Inactive')}>
                        <FontAwesomeIcon className={styles.menu_icon} icon={faPersonCircleMinus} />Deactivate User
                    </MenuItem>
                )}
            </Menu>

            <Popover
                open={filterOpen}
                anchorEl={filterAnchorEl}
                onClose={handleFilterClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                slotProps={{ paper: { className: styles.filterPaper } }}
                elevation={0}
            >
                <div className={styles.filter_form}>
                    <div className={styles.input_group}>
                        <label>Organization</label>
                        <TextField
                            className={styles.textfield}
                            select
                            size="small"
                            fullWidth
                            value={tempFilters.organization}
                            onChange={handleFilterChange('organization')}
                            placeholder='Select'
                            slotProps={{ select: { displayEmpty: true } }}
                            sx={{
                                color: 'rgba(84, 95, 125, 1)',
                                fontSize: '0.875rem',
                                fontWeight: 400
                            }} 
                        >
                            <MenuItem value="">Select</MenuItem>
                            <MenuItem value="lendsqr">Lendsqr</MenuItem>
                            <MenuItem value="irorun">Irorun</MenuItem>
                            <MenuItem value="lendstar">Lendstar</MenuItem>
                        </TextField>
                    </div>

                    <div className={styles.input_group}>
                        <label>Username</label>
                        <TextField className={styles.textfield} placeholder="User" size="small" fullWidth value={tempFilters.username} onChange={handleFilterChange('username')} />
                    </div>

                    <div className={styles.input_group}>
                        <label>Email</label>
                        <TextField className={styles.textfield} type="email" placeholder="Email" size="small" fullWidth value={tempFilters.email} onChange={handleFilterChange('email')} />
                    </div>

                    <div className={styles.input_group}>
                        <label>Date</label>
                        <TextField className={styles.textfield} type="date" size="small" fullWidth value={tempFilters.date} onChange={handleFilterChange('date')} />
                    </div>

                    <div className={styles.input_group}>
                        <label>Phone Number</label>
                        <TextField className={styles.textfield} placeholder="Phone Number" size="small" fullWidth value={tempFilters.phoneNumber} onChange={handleFilterChange('phoneNumber')} />
                    </div>

                    <div className={styles.input_group}>
                        <label>Status</label>
                        <TextField
                            className={styles.textfield}
                            select
                            size="small"
                            fullWidth
                            value={tempFilters.status}
                            onChange={handleFilterChange('status')}
                            placeholder='Select'
                            slotProps={{ select: { displayEmpty: true } }}
                        >
                            <MenuItem value="">Select</MenuItem>
                            <MenuItem value="active">Active</MenuItem>
                            <MenuItem value="pending">Pending</MenuItem>
                            <MenuItem value="blacklisted">Blacklisted</MenuItem>
                            <MenuItem value="inactive">Inactive</MenuItem>
                        </TextField>
                    </div>

                    <div className={styles.button_group}>
                        <button className={styles.reset} onClick={resetFilters}>Reset</button>
                        <button className={styles.filter_submit} onClick={applyFilters}>Filter</button>
                    </div>
                </div>
            </Popover>
        </>
    )
}