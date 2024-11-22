import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { FaCircle } from 'react-icons/fa';

const CommentCanChange = ({ stars, onStarsChange }) => {
    const [rating, setRating] = useState(stars); // Bắt đầu từ 0

    const handleRating = (stars) => {
        setRating(stars);
        onStarsChange(stars);
    }

    // Cập nhật số sao cho tương thích 
    useEffect(() => {
        setRating(stars)
    }, [stars])

    return (
        <div>
            {/* Vòng lặp tạo biểu tượng sao */}
            {[...Array(5)].map((_, index) => {
                const stars = index + 1;

                return (
                    <label key={index} style={{ marginRight: 12 }}>
                        <input
                            type="radio"
                            name="rate"
                            value={stars}
                            style={{ display: 'none' }}
                            stars
                            onClick={() => handleRating(stars)} // Cập nhật trạng thái rating
                        />

                        <FaCircle
                            size={36}
                            style={{
                                backgroundColor: 'transparent',
                                fill: stars <= rating ? "#296265" : "#fff", // Thay đổi màu của <path>
                                transition: 'fill 0.1s ease-in-out', // Hiệu ứng chuyển màu
                            }}
                        />
                    </label>
                );
            })}
        </div>
    );
};

export default CommentCanChange;