import React, { useEffect, useState } from 'react';
import styles from '../UploadSongBox/UploadSongBox.module.css';

const UpdateSingerBox = ({ isOpen, onClose, selectedSinger, setSelectedSinger, onSuccess }) => {
    const [form, setForm] = useState({ name: '', avatarUrl: '' });
    const [uploading, setUploading] = useState(false);
    const [artist, setArtist] = useState(null);

    // Fetch artist data khi selectedSinger thay đổi
    useEffect(() => {
        if (!isOpen || !selectedSinger || !selectedSinger[0]) return;
        const fetchArtistData = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/singer/${selectedSinger[0]}`);
                if (!response.ok) throw new Error('Error fetching artist data');
                const data = await response.json();
                setArtist(data);
                setForm({ name: data.name || '', avatarUrl: data.avatarUrl || '' });
            } catch (error) {
                setArtist(null);
                setForm({ name: '', avatarUrl: '' });
                console.error('Error fetching artist data:', error);
            }
        };
        fetchArtistData();
    }, [isOpen, selectedSinger]);

    if (!isOpen || !selectedSinger || !selectedSinger[0] || !artist) return null;

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true);

        try {
            // 1. Đọc ảnh thành URL
            const img = new Image();
            const reader = new FileReader();

            reader.onload = () => {
                img.src = reader.result;
            };
            reader.readAsDataURL(file);

            await new Promise((resolve) => (img.onload = resolve)); // Đợi ảnh load

            // 2. Tạo canvas để resize
            const maxSize = 800; // Max chiều rộng hoặc chiều cao
            let { width, height } = img;

            if (width > maxSize || height > maxSize) {
                if (width > height) {
                    height = (height * maxSize) / width;
                    width = maxSize;
                } else {
                    width = (width * maxSize) / height;
                    height = maxSize;
                }
            }

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            // 3. Convert canvas to Blob
            const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.8)); // 0.8 = chất lượng nén

            // 4. Upload to Cloudinary
            const formData = new FormData();
            formData.append('file', blob, 'resized.jpg');
            formData.append('upload_preset', 'playlistAvtUrl');

            const res = await fetch('https://api.cloudinary.com/v1_1/di4kdlfr3/image/upload', {
                method: 'POST',
                body: formData
            });

            const data = await res.json();
            if (data.secure_url) {
                setForm(f => ({ ...f, avatarUrl: data.secure_url }));
            } else {
                alert('Upload ảnh thất bại');
            }
        } catch (err) {
            console.error(err);
            alert('Upload ảnh thất bại');
        }

        setUploading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);
        try {
            // So sánh với dữ liệu gốc, chỉ gửi trường thay đổi
            const changedFields = {};
            if (form.name !== artist.name) changedFields.name = form.name;
            if (form.avatarUrl !== artist.avatarUrl) changedFields.avatarUrl = form.avatarUrl;

            if (Object.keys(changedFields).length === 0) {
                alert('Không có thay đổi nào để cập nhật!');
                setUploading(false);
                return;
            }

            const res = await fetch(`http://localhost:4000/api/singer/${artist.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(changedFields)
            });

            if (res.ok) {
                alert('Cập nhật ca sĩ thành công!');
                onSuccess && onSuccess();
                setSelectedSinger([]);
                onClose();
            } else {
                const data = await res.json();
                console.error(data.error || 'Lỗi khi cập nhật ca sĩ');
            }
        } catch (err) {
            alert('Lỗi khi cập nhật ca sĩ');
        }
        setUploading(false);
    };

    return (
        <div className={styles.overlay}>
            <form className={styles.box} onSubmit={handleSubmit}>
                <h3>Cập nhật ca sĩ</h3>
                <input
                    name="name"
                    placeholder={artist.name}
                    value={form.name}
                    onChange={handleChange}
                />
                <input type="file" accept="image/*" onChange={handleImageChange} />
                {form.avatarUrl && (
                    <img src={form.avatarUrl} alt="avatar" style={{ width: 80, height: 80, objectFit: 'cover', marginTop: 8, borderRadius: 8 }} />
                )}
                <div className={styles.actions}>
                    <button type="submit" disabled={uploading}>Cập nhật</button>
                    <button type="button" onClick={onClose}>Đóng</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateSingerBox;