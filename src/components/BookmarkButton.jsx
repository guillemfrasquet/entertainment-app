import { ReactComponent as BookmarkEmptyIcon } from '../assets/icon-bookmark-empty.svg';
import { ReactComponent as BookmarkFullIcon } from '../assets/icon-bookmark-full.svg';

const BookmarkButton = ({ isBookmarked, setIsBookmarked, onClick }) => {
    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsBookmarked(!isBookmarked);
        if (onClick) onClick(e); // AÑADIDO: llama también a onClick si existe
    };

    return (
    <div className='absolute top-3 right-3 bg-[#10141e89] hover:bg-[#10141e] w-6 h-6 rounded-full flex items-center justify-center'
    onClick={handleClick}>
        {isBookmarked ? <BookmarkFullIcon /> : <BookmarkEmptyIcon />}
    </div>
    );
}


export default BookmarkButton;