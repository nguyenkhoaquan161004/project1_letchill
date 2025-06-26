import React, { useEffect, useState } from 'react';
import styles from './ReportManagerScreen.module.css';

const mockReports = [
    {
        id: 1,
        songId: 'S001',
        songName: 'Em của ngày hôm qua',
        artist: 'Sơn Tùng M-TP',
        email: 'user1@gmail.com',
        type: 'Đạo nhái',
        content: 'Bài hát này có dấu hiệu đạo nhạc.',
    },
    {
        id: 2,
        songId: 'S002',
        songName: 'Nơi này có anh',
        artist: 'Sơn Tùng M-TP',
        email: 'user2@gmail.com',
        type: 'Nội dung phản cảm',
        content: 'Lời bài hát không phù hợp.',
    },
    // ... thêm dữ liệu mẫu nếu muốn
];

const ReportManagerScreen = () => {
    const [reports, setReports] = useState([]);
    const [selectedReports, setSelectedReports] = useState([]);
    const [viewReport, setViewReport] = useState(null);

    useEffect(() => {
        // // TODO: fetch dữ liệu thực tế từ API
        // setReports(mockReports);
        fetchReports();
    }, []);

    const fetchReports = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/report/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            // Fetch thông tin bài hát cho từng report
            const reportsWithSongInfo = await Promise.all(
                data.map(async (report) => {
                    try {
                        const songRes = await fetch(`http://localhost:4000/api/song/${report.MaBaiHat}/RFxF2oSzqZgWw1IFgbdSawJeEiX2`);
                        if (!songRes.ok) throw new Error();
                        const songData = await songRes.json();
                        return {
                            ...report,
                            songName: songData.name || 'Không rõ',
                            artist: songData.artist || 'Không rõ',
                        };
                    } catch {
                        return {
                            ...report,
                            songName: 'Không rõ',
                            artist: 'Không rõ',
                        };
                    }
                })
            );

            setReports(reportsWithSongInfo);
            console.log(reports)
        } catch (error) {
            console.error('Error fetching reports:', error);
        }
    };


    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedReports(reports.map(r => r.id));
        } else {
            setSelectedReports([]);
        }
    };

    const handleSelect = (id, checked) => {
        if (checked) {
            setSelectedReports(prev => [...prev, id]);
        } else {
            setSelectedReports(prev => prev.filter(rid => rid !== id));
        }
    };

    const handleView = (report) => {
        setViewReport(report);
        console.log(viewReport);
    };

    const handleReject = async (report) => {
        const confirmReject = window.confirm('Bạn có chắc chắn muốn từ chối báo cáo này?');
        if (!confirmReject) return;

        try {
            const res = await fetch(`http://localhost:4000/api/report/${report}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Không thể xóa báo cáo.');
            }

            // Cập nhật lại danh sách báo cáo
            setReports((prev) => prev.filter((r) => r.id !== report.id));
            setSelectedReports((prev) => prev.filter((rid) => rid !== report.id));
            setViewReport(null);

            alert('Đã từ chối và xóa báo cáo thành công!');
        } catch (error) {
            console.error('Lỗi khi từ chối báo cáo:', error);
            alert('Đã xảy ra lỗi khi từ chối báo cáo!');
        }
    };

    const handleDeleteSong = async (report) => {
        const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa bài hát này và báo cáo liên quan?');
        if (!confirmDelete) return;

        try {
            // Sau khi xóa bài hát, tiếp tục xóa báo cáo
            const resReport = await fetch(`http://localhost:4000/api/report/${report.MaBaoCao}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!resReport.ok) {
                const errorData = await resReport.json();
                throw new Error(errorData.message || 'Không thể xóa báo cáo.');
            }

            const resSong = await fetch(`http://localhost:4000/api/song/${report.MaBaiHat}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!resSong.ok) {
                const errorData = await resSong.json();
                throw new Error(errorData.message || 'Không thể xóa bài hát.');
            }

            setReports((prev) => prev.filter((r) => r.id !== report.id));
            setSelectedReports((prev) => prev.filter((rid) => rid !== report.id));
            setViewReport(null);

            alert('Đã xóa bài hát và báo cáo liên quan thành công!');
        } catch (error) {
            console.error('Lỗi khi xóa bài hát và báo cáo:', error);
            alert('Đã xảy ra lỗi khi xóa bài hát và báo cáo!');
        }
    };


    return (
        <div className={styles.container}>
            <h3>QUẢN LÝ BÁO CÁO BÀI HÁT</h3>
            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>
                                <input
                                    type="checkbox"
                                    checked={reports.length > 0 && selectedReports.length === reports.length}
                                    onChange={handleSelectAll}
                                />
                            </th>
                            <th>STT</th>
                            <th>Mã bài hát</th>
                            <th>Tên bài hát</th>
                            <th>Nghệ sĩ</th>
                            <th>Email</th>
                            <th>Loại báo cáo</th>
                            <th>Nội dung</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map((report, idx) => (
                            <tr key={report.id}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedReports.includes(report.id)}
                                        onChange={e => handleSelect(report.id, e.target.checked)}
                                    />
                                </td>
                                <td>{idx + 1}</td>
                                <td>{report.MaBaiHat}</td>
                                <td>{report.songName}</td>
                                <td>{report.artist}</td>
                                <td>{report.Email}</td>
                                <td>{report.LoaiBaoCao}</td>
                                <td style={{ maxWidth: 500, textOverflow: 'ellipsis' }}>
                                    {report.LyDo}
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleView(report)}
                                        className={`${styles.button} ${styles.viewButton}`}
                                    >
                                        Xem
                                    </button>

                                    <button
                                        onClick={() => handleReject(report.MaBaoCao)}
                                        className={`${styles.button} ${styles.deleteButton}`}
                                    >
                                        Từ chối
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Modal xem chi tiết */}
            {viewReport && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
                    background: 'rgba(0,0,0,0.3)', zIndex: 999,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <div style={{
                        background: '#222', color: '#fff', borderRadius: 12, padding: 32, minWidth: 340, maxWidth: 480,
                        boxShadow: '0 2px 16px rgba(0,0,0,0.2)'
                    }}>
                        <h3 style={{ marginBottom: 16 }}>Chi tiết báo cáo</h3>
                        <div style={{ marginBottom: 12, marginTop: 6 }}>
                            <b>Mã bài hát:</b> {viewReport.MaBaiHat}
                        </div>
                        <div style={{ marginBottom: 12, marginTop: 6 }}>
                            <b>Tên bài hát:</b> {viewReport.songName}
                        </div>
                        <div style={{ marginBottom: 12, marginTop: 6 }}>
                            <b>Nghệ sĩ:</b> {viewReport.artist}
                        </div>
                        <div style={{ marginBottom: 12, marginTop: 6 }}>
                            <b>Email:</b> {viewReport.Email}
                        </div>
                        <div style={{ marginBottom: 12, marginTop: 6 }}>
                            <b>Loại báo cáo:</b> {viewReport.LoaiBaoCao}
                        </div>
                        <div style={{ marginBottom: 12, marginTop: 6 }}>
                            <b>Nội dung:</b> {viewReport.LyDo}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 24 }}>
                            <button
                                onClick={() => handleReject(viewReport.MaBaoCao)}
                                className={`${styles.button} ${styles.deleteButton}`}
                            >
                                Từ chối
                            </button>
                            <button
                                onClick={() => handleDeleteSong(viewReport)}
                                className={`${styles.button} ${styles.deleteButton}`}
                                style={{ background: '#d32f2f', color: '#fff' }}
                            >
                                Xóa bài hát
                            </button>
                            <button
                                onClick={() => setViewReport(null)}
                                className={styles.button}
                                style={{ background: '#888', color: '#fff' }}
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReportManagerScreen;