import React, { useContext, useState } from 'react';
import styles from './UploadSongBox.module.css';
import axios from 'axios';
import { useCreator } from '../../../../contexts/CreatorContext';

const UploadSongBox = ({ isOpen, onClose, uid }) => {
    const [form, setForm] = useState({
        uid: '', name: '', avatarUrl: '', releaseDate: '', lyric: '', composer: '', artist: '', genre: '', link: '', download: ''
    });

    const { isCreator } = useCreator();
    const [uploading, setUploading] = useState(false);

    if (!isOpen) return null;

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Upload mp3 lên Cloudinary
    const handleMp3Change = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true);

        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'unsigned_mp3'); // Thay bằng upload preset của bạn
        data.append('resource_type', 'video'); // Bắt buộc với mp3

        try {
            const res = await fetch(
                'https://api.cloudinary.com/v1_1/di4kdlfr3/video/upload',
                {
                    method: 'POST',
                    body: data,
                }
            );
            const json = await res.json();
            const url = json.secure_url;
            const filename = file.name;

            setForm(f => ({
                ...f,
                link: url,
                download: `${url}?dl=${filename}`
            }));
        } catch (err) {
            alert('Upload mp3 thất bại');
        } finally {
            setUploading(false);
        }
    };

    // Upload ảnh đại diện lên Cloudinary
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'playlistAvtUrl');

        try {
            const res = await axios.post(
                'https://api.cloudinary.com/v1_1/di4kdlfr3/image/upload', formData
            );
            const data = res.data;
            if (data.secure_url) {
                setForm(f => ({ ...f, avatarUrl: data.secure_url }));
            } else {
                alert('Upload ảnh thất bại');
            }
        } catch (err) {
            alert('Upload ảnh thất bại');
        }
        setUploading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);
        try {
            // Kiểm tra đã có link mp3 chưa
            if (!form.link) {
                alert('Vui lòng upload file mp3 trước');
                setUploading(false);
                return;
            }

            // Định dạng lại ngày nếu có
            let formattedForm = { ...form };
            if (form.releaseDate) {
                const date = new Date(form.releaseDate);
                const yyyy = date.getFullYear();
                const mm = String(date.getMonth() + 1).padStart(2, '0');
                const dd = String(date.getDate()).padStart(2, '0');
                formattedForm.releaseDate = `${yyyy}-${mm}-${dd}`;
            }

            if (isCreator) {
                formattedForm.uid = uid;
            }

            // Gửi dữ liệu bài hát (chỉ gửi link mp3, không gửi file mp3)
            const response = await fetch('http://localhost:4000/api/song/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
                body: JSON.stringify(formattedForm),
            });
            const data = await response.json();

            if (response.ok) {
                alert('Upload thành công!');
                onClose();
            } else {
                alert(data.error);
            }
        } catch (error) {
            alert('Failed to upload song');
        }
        setUploading(false);
    };

    return (
        <div className={styles.overlay}>
            <form className={styles.box} onSubmit={handleSubmit}>
                <h3>Thêm bài hát</h3>
                {isCreator ? (
                    <input name="uid" placeholder={uid} value={form.uid} disabled />
                ) : (
                    <input name="uid" placeholder="UID người đăng" value={form.uid} onChange={handleChange} required />
                )}
                <input name="name" placeholder="Tên bài hát" value={form.name} onChange={handleChange} required />
                <input
                    type="file"
                    accept="audio/mp3"
                    onChange={handleMp3Change}
                    required
                />
                {form.link && (
                    // <div style={{ margin: '8px 0' }}>
                    //     <p><strong>🎵 Link nghe:</strong></p>
                    //     <audio controls src={form.link}></audio>
                    //     <p><strong>⬇️ Link tải:</strong></p>
                    //     <a href={form.download} download>Download MP3</a>
                    // </div>
                    <span style={{ color: '#1976d2' }}>Đã upload thành công</span>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <label>Ảnh đại diện:</label>
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    {uploading && <span style={{ color: '#1976d2' }}>Đang upload...</span>}
                    {form.avatarUrl && (
                        <img src={form.avatarUrl} alt="avatar" style={{ width: 80, height: 80, objectFit: 'cover', marginTop: 8, borderRadius: 8 }} />
                    )}
                </div>
                {/* <input type="date" name="releaseDate" value={form.releaseDate} onChange={handleChange} /> */}
                <input name="lyric" placeholder="Lời bài hát" value={form.lyric} onChange={handleChange} />
                <input name="composer" placeholder="Nhạc sĩ" value={form.composer} onChange={handleChange} />
                <input name="artist" placeholder="Nghệ sĩ" value={form.artist} onChange={handleChange} />
                <select name="genre" value={form.genre} onChange={handleChange}>
                    <option value="">Chọn thể loại</option>
                    <option value="Pop">Pop</option>
                    <option value="Rock">Rock</option>
                    <option value="Jazz">Jazz</option>
                    <option value="Classical">Classical</option>
                    <option value="Hip-Hop">Hip-Hop</option>
                </select>
                <div className={styles.actions}>
                    <button type="submit" disabled={uploading}>Upload</button>
                    <button type="button" onClick={onClose}>Đóng</button>
                </div>
            </form>
        </div>
    );
};

export default UploadSongBox;