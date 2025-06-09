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
    <div className='bg-[#5A698F] w-14 h-14 rounded-full flex items-center justify-center cursor-pointer select-none'
    onClick={handleClick}>
        {isBookmarked ? <BookmarkFullIcon width={24} height={24} /> : <BookmarkEmptyIcon width={24} height={24} />}
    </div>
    );
}


export default BookmarkCardButton;