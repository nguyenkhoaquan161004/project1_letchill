import React, { useState } from 'react';
import styles from '../UploadSongBox/UploadSongBox.module.css';

const AddSingerBox = ({ isOpen, onClose, onSuccess }) => {
    const [form, setForm] = useState({ name: '', avatarUrl: '' });
    const [uploading, setUploading] = useState(false);

    if (!isOpen) return null;

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'playlistAvtUrl');
        try {
            const res = await fetch('https://api.cloudinary.com/v1_1/di4kdlfr3/image/upload', {
                method: 'POST',
                body: formData
            });
            const data = await res.json();
            if (data.secure_url) {
                const resizedUrl = data.secure_url.replace(
                    '/upload/',
                    '/upload/w_300,h_300,c_fill/'
                );
                setForm(f => ({ ...f, avatarUrl: resizedUrl }));
            }
            else alert('Upload ảnh thất bại');
        } catch {
            alert('Upload ảnh thất bại');
        }
        setUploading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);
        try {
            const res = await fetch('http://localhost:4000/api/singer/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(form)
            });
            if (res.ok) {
                alert('Thêm ca sĩ thành công!');
                onSuccess && onSuccess();
                onClose();
            } else {
                const data = await res.json();
                alert(data.error || 'Lỗi khi thêm ca sĩ');
            }
        } catch {
            alert('Lỗi khi thêm ca sĩ');
        }
        setUploading(false);
    };

    return (
        <div className={styles.overlay}>
            <form className={styles.box} onSubmit={handleSubmit}>
                <h3>Thêm ca sĩ</h3>
                <input name="name" placeholder="Tên ca sĩ" value={form.name} onChange={handleChange} required />
                <input type="file" accept="image/*" onChange={handleImageChange} />
                {form.avatarUrl && (
                    <img src={form.avatarUrl} alt="avatar" style={{ width: 80, height: 80, objectFit: 'cover', marginTop: 8, borderRadius: 8 }} />
                )}
                <div className={styles.actions}>
                    <button type="submit" disabled={uploading}>Thêm</button>
                    <button type="button" onClick={onClose}>Đóng</button>
                </div>
            </form>
        </div>
    );
};

export default AddSingerBox;