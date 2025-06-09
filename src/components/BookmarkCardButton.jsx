import { ReactComponent as BookmarkEmptyIcon } from '../assets/icon-bookmark-empty.svg';
import { ReactComponent as BookmarkFullIcon } from '../assets/icon-bookmark-full.svg';

const BookmarkCardButton = ({ isBookmarked, setIsBookmarked, onClick }) => {
    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsBookmarked(!isBookmarked);
        if (onClick) onClick(e); // AÑADIDO: llama también a onClick si existe
    };

    return (
    <div className='absolute top-3 right-3 bg-[#10141e89] hover:bg-[#10141e] w-6 h-6 rounded-full flex items-center justify-center cursor-pointer select-none'
    onClick={handleClick}>
        {isBookmarked ? <BookmarkFullIcon width={12} height={14} /> : <BookmarkEmptyIcon width={12} height={14} />}
    </div>
    );
}


export default BookmarkCardButton;