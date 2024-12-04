import React from "react";

export default function PrevNextButtons({ onPrev, onNext }: { onPrev: () => void, onNext: () => void }) {
    return (
        <div>
            <button onClick={onPrev} type="button">Prev</button>
            <button onClick={onNext} type="button">Next</button>
        </div>
    );
}