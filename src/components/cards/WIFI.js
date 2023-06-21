export default function SvgWIFI({ color, isDot, is4 }) {
    return (
        <svg fill={color} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" viewBox="0 0 24 24">
            <path fill={color} d="M15.582 14.557a5.39 5.39 0 0 0-10.162 0"></path>
            <path fill={color} d="M18.444 11.7a9.434 9.434 0 0 0-15.887 0"></path>
            <path fill={color} d="M20.987 8.535a13.5 13.5 0 0 0-20.973 0"></path>
            {is4 ? <path fill={color} d="M22.987 4.535a12.5 5.5 0 0 0-25.973 0"></path> : <></>}
            {isDot ? <path fill={color} stroke="none" d="M10.3 17.8a1 1 0 1 1 0-2 1.5 1.5 0 0 1 0 3Z"></path> : <></>}
        </svg>
    );
};
