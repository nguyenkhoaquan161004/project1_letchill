import React, { useState } from 'react';
import styles from './UploadSongBox.module.css';
import axios from 'axios';

const UploadSongBox = ({ isOpen, onClose, onUploadSong }) => {
    const [form, setForm] = useState({
        uid: '', name: '', link: '', download: '', avatarUrl: '', releaseDate: '', lyric: '', composer: '', artist: '', genre: ''
    });
    const [uploading, setUploading] = useState(false);

    if (!isOpen) return null;

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Upload ảnh đại diện lên Cloudinary
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'playlistAvtUrl'); // Replace 'ml_default' with your actual upload preset

        try {
            const res = await axios.post(
                'https://api.cloudinary.com/v1_1/di4kdlfr3/image/upload', formData
            );

            const data = res.data;
            if (data.secure_url) {
                setForm({ ...form, avatarUrl: data.secure_url });
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
            const response = await fetch('http://localhost:4000/api/song/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ADMIN'  // Ensure the token is correctly set
                },
                body: JSON.stringify(form),
            });
            const data = await response.json();
            if (response.ok) {
                onUploadSong(data);
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
                <input name="uid" placeholder="UID người đăng" value={form.uid} onChange={handleChange} required />
                <input name="name" placeholder="Tên bài hát" value={form.name} onChange={handleChange} required />
                <input name="link" placeholder="Link nghe" value={form.link} onChange={handleChange} required />
                <input name="download" placeholder="Link download" value={form.download} onChange={handleChange} required />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <label>Ảnh đại diện:</label>
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    {uploading && <span style={{ color: '#1976d2' }}>Đang upload...</span>}
                    {form.avatarUrl && (
                        <img src={form.avatarUrl} alt="avatar" style={{ width: 80, height: 80, objectFit: 'cover', marginTop: 8, borderRadius: 8 }} />
                    )}
                </div>
                <input type="date" name="releaseDate" value={form.releaseDate} onChange={handleChange} />
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