import { useEffect, useRef, useState } from "react";

export default function useInView(options) {
    const ref = useRef();
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new window.IntersectionObserver(
            ([entry]) => setIsInView(entry.isIntersecting),
            options
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [options]);

    return [ref, isInView];
}