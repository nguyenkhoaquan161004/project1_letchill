import React, { useState } from 'react';
import clsx from 'clsx';
import { FaCircle } from 'react-icons/fa';

const Comment = ({ name, numberOfStar, comment }) => {
    const [rating, setRating] = useState(numberOfStar); // Bắt đầu từ 0
    const [selectedStars, setSelectedStars] = useState(numberOfStar);

    const handleRating = (currentRate) => {
        setRating(currentRate);
        setSelectedStars(currentRate);
    }

    return (
        <div>
            <p className={clsx('uiMedium')}>{name}</p>

            {/* Vòng lặp tạo biểu tượng sao */}
            {[...Array(5)].map((_, index) => {
                const currentRate = index + 1;

                return (
                    <label key={index} style={{ marginRight: 3 }}>
                        {/* <input
                            type="radio"
                            name="rate"
                            value={currentRate}
                            style={{ display: 'none' }}
                            onClick={() => handleRating(currentRate)} // Cập nhật trạng thái rating
                        /> */}

                        <FaCircle
                            size={12}
                            style={{
                                backgroundColor: 'transparent',
                                fill: currentRate <= rating ? "#296265" : "#D9D9D9", // Thay đổi màu của <path>
                                transition: 'fill 0.1s ease-in-out', // Hiệu ứng chuyển màu
                            }}
                        />
                    </label>
                );
            })}

            <p className={clsx('p3', 'o75')}>{comment}</p>

        </div>
    );
};

export default Comment;
