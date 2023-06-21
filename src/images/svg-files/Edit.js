export default function SvgEdit({ color }) {
    return (
        <svg fill={color} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 24 24">
            <path d="M18 10.5v8.625A1.875 1.875 0 0 1 16.125 21H4.875A1.875 1.875 0 0 1 3 19.125V7.875A1.875 1.875 0 0 1 4.875 6h7.85"></path>
            <path fill={color} stroke="none" d="M21.56 2.496a.754.754 0 0 0-1.09-.026l-.579.577a.375.375 0 0 0 0 .53l.532.53a.374.374 0 0 0 .531 0l.565-.562a.762.762 0 0 0 .04-1.049Z"></path>
            <path fill={color} stroke="none" d="m18.72 4.217-8.463 8.447a.42.42 0 0 0-.108.184l-.391 1.166a.183.183 0 0 0 .227.228l1.165-.392a.422.422 0 0 0 .184-.108l8.447-8.463a.422.422 0 0 0 0-.593l-.466-.47a.422.422 0 0 0-.596 0Z"></path>
        </svg>
    );
};
