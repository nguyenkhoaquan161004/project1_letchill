import React, { useState } from 'react';
import { useReactTable, getCoreRowModel, getSortedRowModel, flexRender } from '@tanstack/react-table';
import styles from './UserManagerScreen.module.css';

const users = [
    { id: 1, username: 'nguyenvana', package: 'Premium', startDate: '2024-05-01', endDate: '2025-05-01' },
    { id: 2, username: 'tranthib', package: 'Free', startDate: '2024-01-10', endDate: '-' },
    { id: 3, username: 'lequocd', package: 'Family', startDate: '2023-12-20', endDate: '2024-12-20' },
    { id: 4, username: 'phamthanh', package: 'Premium', startDate: '2024-03-15', endDate: '2025-03-15' },
    { id: 5, username: 'ngocminh', package: 'Free', startDate: '2024-02-01', endDate: '-' },
    { id: 6, username: 'hoanglong', package: 'Premium', startDate: '2024-04-10', endDate: '2025-04-10' },
    { id: 7, username: 'buitran', package: 'Family', startDate: '2023-11-05', endDate: '2024-11-05' },
    { id: 8, username: 'nguyenthuy', package: 'Premium', startDate: '2024-06-01', endDate: '2025-06-01' },
    { id: 9, username: 'phamquang', package: 'Free', startDate: '2024-01-20', endDate: '-' },
    { id: 10, username: 'lethanh', package: 'Premium', startDate: '2024-07-12', endDate: '2025-07-12' },
    { id: 11, username: 'tranhoa', package: 'Family', startDate: '2023-10-18', endDate: '2024-10-18' },
    { id: 12, username: 'nguyenbao', package: 'Premium', startDate: '2024-08-01', endDate: '2025-08-01' },
    { id: 13, username: 'phamlinh', package: 'Free', startDate: '2024-03-22', endDate: '-' },
    { id: 14, username: 'hoangnam', package: 'Premium', startDate: '2024-09-10', endDate: '2025-09-10' },
    { id: 15, username: 'bichngoc', package: 'Family', startDate: '2023-09-25', endDate: '2024-09-25' },
    { id: 16, username: 'nguyetanh', package: 'Premium', startDate: '2024-10-01', endDate: '2025-10-01' },
    { id: 17, username: 'phuongthao', package: 'Free', startDate: '2024-04-15', endDate: '-' },
    { id: 18, username: 'hoangphuc', package: 'Premium', startDate: '2024-11-11', endDate: '2025-11-11' },
    { id: 19, username: 'lethao', package: 'Family', startDate: '2023-08-30', endDate: '2024-08-30' },
    { id: 20, username: 'trungkien', package: 'Premium', startDate: '2024-12-01', endDate: '2025-12-01' },
    { id: 21, username: 'ngocanh', package: 'Free', startDate: '2024-05-20', endDate: '-' },
    { id: 22, username: 'minhquan', package: 'Premium', startDate: '2025-01-01', endDate: '2026-01-01' },
    { id: 23, username: 'thanhdat', package: 'Family', startDate: '2023-07-12', endDate: '2024-07-12' }
];

const columns = [
    { accessorKey: 'id', header: '#' },
    { accessorKey: 'username', header: 'Tên tài khoản' },
    { accessorKey: 'package', header: 'Gói đang dùng' },
    { accessorKey: 'startDate', header: 'Ngày bắt đầu gói' },
    { accessorKey: 'endDate', header: 'Ngày kết thúc gói' },
];

const UserManagerScreen = () => {
    const [sorting, setSorting] = React.useState([]);
    const [search, setSearch] = useState('');
    const [filteredUsers, setFilteredUsers] = useState(users);

    const handleSearch = () => {
        const keyword = search.trim().toLowerCase();
        if (!keyword) {
            setFilteredUsers(users);
            return;
        }

        setFilteredUsers(
            users.filter(
                u =>
                    u.username.toLowerCase().includes(keyword) ||
                    u.package.toLowerCase().includes(keyword) ||
                    u.startDate.toLowerCase().includes(keyword) ||
                    u.endDate.toLowerCase().includes(keyword)
            )
        )
    }

    const table = useReactTable({
        data: filteredUsers,
        columns,
        state: { sorting },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <div style={{ overflowX: 'auto' }}>
            <div className={styles.header}>
                <input
                    className={styles.searchBox}
                    type="text"
                    placeholder="Tìm kiếm"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') handleSearch() }}
                />
                <div className={styles.filter}>
                    <button
                        className={styles.searchBtn}
                        onClick={handleSearch}
                    > <p className="uiSemibold">Tìm kiếm</p></button>
                </div>
            </div>
            <table className={styles.table}>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            <th>
                                <input type="checkbox" style={{ accentColor: "#fff", visibility: 'hidden' }} />
                            </th>
                            {headerGroup.headers.map(header => (
                                <th
                                    key={header.id}
                                    onClick={header.column.getToggleSortingHandler()}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <p className="uiMedium">
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </p>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            <td>
                                <input type="checkbox" />
                            </td>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id}>
                                    <p className="uiMedium">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </p>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserManagerScreen;