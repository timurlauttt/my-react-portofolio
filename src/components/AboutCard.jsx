import React from 'react';

const defaultImages = ['me-600.webp', 'aku.webp', 'me2-600.webp'];
const AboutCard = ({ image, title, description, imageAlt, index = 0 }) => {
    // Tentukan gambar yang dipakai
    let imgSrc = image;
    if (!imgSrc || imgSrc === '' || imgSrc === undefined || imgSrc === null) {
        imgSrc = defaultImages[index] || 'me-600.webp';
    }
    return (
        <div className="p-5 bg-gray-100 border-4 border-black shadow-[8px_8px_0_#0f172a] hover:scale-105 hover:transition-all hover:border-[#0EA5E9] hover:shadow-[8px_8px_0_#0f172a] cursor-pointer">
            <img
                src={imgSrc}
                className="w-3/5 h-auto mx-auto shadow-[4px_4px_0_#0f172a] hover:scale-105 hover:transition-all hover:border-[#0EA5E9] hover:shadow-[8px_8px_0_#0f172a] cursor-pointer"
                alt={imageAlt}
                loading="lazy"
                decoding="async"
                onError={e => { e.target.src = defaultImages[index] || 'me-600.webp'; }}
            />
            <div className="mt-4">
                <h5 className="text-lg font-bold">{title}</h5>
                <p className="text-gray-700 mt-2">
                    {description}
                </p>
                <hr />
            </div>
        </div>
    );
};

export default React.memo(AboutCard);
