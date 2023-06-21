export default function SvgReload({ color }) {
    return (
        <svg fill={color} stroke="currentColor" strokeLinecap="round" strokeWidth="1" viewBox="0 0 24 24">
            <path d="m18.75 6.938-.99-1.152A8.973 8.973 0 0 0 11.25 3c-4.969 0-9 4.031-9 9s4.031 9 9 9a9.004 9.004 0 0 0 8.488-6"></path>
            <path fill={color} stroke="none" d="M21.75 4.565v5.183a.75.75 0 0 1-.75.75h-5.184a.75.75 0 0 1-.53-1.28l5.184-5.184a.75.75 0 0 1 1.28.53Z"></path>
        </svg>
    );
};
