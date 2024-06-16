import React, { useState, useEffect } from "react";
import Label from "./Label";

const AnimatedTextList = () => {
  const textItems = [
    'Kumpulan <span class="text-5xl font-custom font-extrabold underline decoration-8 decoration-sky-500 ">Template</span> Terbaik <span class="text-5xl font-custom font-bold bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-2">#1</span> di Indonesia',
    'Temukan template <span class="text-5xl font-custom font-extrabold underline decoration-8 decoration-blue-500 ">Dokumen</span> yang <span class="text-5xl font-custom font-bold bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-2">WOW</span> disini!',
    'Temukan template <span class="text-5xl font-custom font-extrabold underline decoration-8 decoration-orange-500 ">Presentasi</span> yang <span class="text-5xl font-custom font-bold bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-2">WOW</span> disini!',
    'Temukan template <span class="text-5xl font-custom font-extrabold underline decoration-8 decoration-green-500 ">Excel</span> yang <span class="text-5xl font-custom font-bold bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-2">WOW</span> disini!',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % textItems.length);
        setIsVisible(true);
      }, 1000); // Delay setting the new text for 1 second to ensure hide animation is completed
    }, 5000); // Change text every 3 seconds

    return () => clearInterval(interval);
  }, [textItems.length]);

  return (
    <div className="relative mx-auto w-full h-full">
      <div className=" h-14">
        {textItems.map((item, index) => (
          <div
            key={index}
            style={{
              transition: "opacity 1s, transform 1s",
              opacity: index === currentIndex ? (isVisible ? 1 : 0) : 0,
              transform:
                index === currentIndex
                  ? isVisible
                    ? "translateY(0)"
                    : "translateY(-20px)"
                  : "translateY(20px)",
            }}
            className={`absolute w-full ${
              index === currentIndex ? "z-10" : "z-0"
            }`}
          >
            <Label type={"headline"} className={"text-center py-2"}>
              <p dangerouslySetInnerHTML={{ __html: item }} />
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedTextList;
