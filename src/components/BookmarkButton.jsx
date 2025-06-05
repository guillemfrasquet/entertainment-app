import { ReactComponent as BookmarkEmptyIcon } from '../assets/icon-bookmark-empty.svg';
import { ReactComponent as BookmarkFullIcon } from '../assets/icon-bookmark-full.svg';

const BookmarkButton = ({isSaved, setIsSaved}) => {
    const handleClick = (e) => {
        e.preventDefault(); // evita que se dispare el <Link>
        e.stopPropagation(); // detiene la propagación del clic
        setIsSaved(!isSaved);
    };

    return (
    <div className='absolute top-3 right-3 bg-[#10141e89] hover:bg-[#10141e] w-6 h-6 rounded-full flex items-center justify-center'
    onClick={handleClick}>
        {isSaved ? <BookmarkFullIcon /> : <BookmarkEmptyIcon />}
    </div>
    );
}


export default BookmarkButton;