"use client";
import { useState, useEffect } from "react";

export default function FoodSprites({
    images = [
        "/food-icons/hotdog.png",
        "/food-icons/pie.png",
        "/food-icons/ramen.png",
        "/food-icons/taco.png",
        "/food-icons/takoyaki.png",
    ],
    count = 10,
    className = "",
}) {
    const [sprites, setSprites] = useState([]);

    useEffect(() => {
        const pageHeight = document.body.scrollHeight; // Make the food dynamically fit the page height

        const newSprites = Array.from({ length: count }).map((_, i) => {
            const xvw = Math.random() * 100;
            const ypx = Math.random() * pageHeight;

            const size = Math.floor(24 + Math.random() * 40);
            const dx = `${(Math.random() * 12 - 6).toFixed(2)}vw`;
            const dy = `${(Math.random() * 10 - 5).toFixed(2)}vh`;

            const duration = (8 + Math.random() * 6).toFixed(1);
            const delay = Math.random().toFixed(1) * 10;

            const alpha = (Math.random() * 0.1 + 0.3).toFixed(2);
            const spinDeg = `${Math.random() < 0.5 ? "-" : ""
                }${180 + Math.floor(Math.random() * 180)}deg`;

            const src = images[i % images.length];

            return {
                key: `spr-${i}`,
                outerStyle: {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: `${size}px`,
                    height: `${size}px`,
                    transform: `translate3d(${xvw}vw, ${ypx}px, 0)`,
                    opacity: 0,
                    animation: `spriteFade ${duration}s ease-in-out ${delay}s infinite both`,
                    ["--dx"]: dx,
                    ["--dy"]: dy,
                    ["--alpha"]: alpha,
                },
                drifterStyle: {
                    animation: `spriteDrift ${duration}s ease-in-out ${delay}s infinite both`,
                    width: "100%",
                    height: "100%",
                },
                imgStyle: {
                    animation: `spriteSpin ${duration}s linear ${delay}s infinite`,
                    ["--spinDeg"]: spinDeg,
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    display: "block",
                },
                src,
            };
        });

        setSprites(newSprites);
    }, [count]);

    return (
        <div
            className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
            aria-hidden="true"
        >
            {sprites.map(({ key, outerStyle, drifterStyle, imgStyle, src }) => (
                <div key={key} className="ambient-sprite" style={outerStyle}>
                    <div className="drifter" style={drifterStyle}>
                        <img src={src} alt="" style={imgStyle} />
                    </div>
                </div>
            ))}
        </div>
    );
}
