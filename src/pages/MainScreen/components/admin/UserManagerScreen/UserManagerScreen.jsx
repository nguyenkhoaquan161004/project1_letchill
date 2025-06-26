import React, { useEffect, useState } from 'react';
import { useReactTable, getCoreRowModel, getSortedRowModel, flexRender } from '@tanstack/react-table';
import styles from './UserManagerScreen.module.css';

// Dữ liệu mẫu ca sĩ
const singers = [
    { id: 1, name: 'Sơn Tùng M-TP', songCount: 25, followers: 1000000, avatarUrl: 'https://i.imgur.com/1.jpg' },
    { id: 2, name: 'Mỹ Tâm', songCount: 40, followers: 900000, avatarUrl: 'https://i.imgur.com/2.jpg' },
    { id: 3, name: 'Đen Vâu', songCount: 18, followers: 800000, avatarUrl: 'https://i.imgur.com/3.jpg' },
    { id: 4, name: 'Noo Phước Thịnh', songCount: 30, followers: 700000, avatarUrl: 'https://i.imgur.com/4.jpg' },
    { id: 5, name: 'Min', songCount: 22, followers: 600000, avatarUrl: 'https://i.imgur.com/5.jpg' },
];

const columns = [
    { accessorKey: 'id', header: '#' },
    {
        accessorKey: 'avatarUrl',
        header: 'Avatar',
        cell: info => (
            <img
                src={info.getValue()}
                alt="avatar"
                style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }}
            />
        )
    },
    { accessorKey: 'name', header: 'Tên ca sĩ' },
    { accessorKey: 'songCount', header: 'Số lượng bài hát' },
    { accessorKey: 'followers', header: 'Số lượng người theo dõi' },
];

const SingerManagerScreen = ({ singerChanged, selectedSinger, setSelectedSinger, setSingerChanged }) => {
    const [sorting, setSorting] = useState([]);
    const [search, setSearch] = useState('');
    const [singers, setSingers] = useState([]);
    const [filteredSingers, setFilteredSingers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchSingers = async () => {
            setLoading(true);
            setError('');
            try {
                const res = await fetch('http://localhost:4000/api/singer'); // Đổi lại endpoint nếu cần
                if (!res.ok) throw new Error('Lỗi khi lấy dữ liệu ca sĩ');
                const data = await res.json();
                setSingers(data);
                setFilteredSingers(data);
            } catch (err) {
                setError(err.message || 'Lỗi không xác định');
            } finally {
                setLoading(false);
            }
        };
        fetchSingers();
    }, [singerChanged]);

    const handleSearch = () => {
        const keyword = search.trim().toLowerCase();
        if (!keyword) {
            setFilteredSingers(singers);
            return;
        }
        setFilteredSingers(
            singers.filter(
                s =>
                    s.name.toLowerCase().includes(keyword)
            )
        );
    };
    const table = useReactTable({
        data: filteredSingers,
        columns,
        state: { sorting },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    useEffect(() => {
        console.log('selectedSinger:', selectedSinger);
    }, [selectedSinger]);

    return (
        <div style={{ overflowX: 'auto' }}>
            <div className={styles.header}>
                <input
                    className={styles.searchBox}
                    type="text"
                    placeholder="Tìm kiếm ca sĩ"
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
                                <input
                                    type="checkbox"
                                    checked={filteredSingers.length > 0 && selectedSinger.length === filteredSingers.length}
                                    onChange={e => {
                                        if (e.target.checked) {
                                            setSelectedSinger(filteredSingers.map(s => s.id));
                                        } else {
                                            setSelectedSinger([]);
                                        }
                                    }}
                                />
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
                                <input
                                    type="checkbox"
                                    checked={Array.isArray(selectedSinger) && selectedSinger.includes(row.original.id)}
                                    onChange={e => {
                                        if (e.target.checked) {
                                            setSelectedSinger(prev => Array.isArray(prev) ? [...prev, row.original.id] : [row.original.id]);
                                        } else {
                                            setSelectedSinger(prev => Array.isArray(prev) ? prev.filter(id => id !== row.original.id) : []);
                                        }
                                    }}
                                />
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

export default SingerManagerScreen;