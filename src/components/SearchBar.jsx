


const SearchBar = ({setTextSearched}) => {

    const changeInputText = (e) => {
        const textSearched = e.target.value;
        setTextSearched(textSearched);
    }

    return (
        <div className='search input-search-icon'>
                <input type="text" placeholder="Search for movies or TV series" onChange={changeInputText} className='input-name focus:outline-none w-full text-white bg-transparent h-10 text-xl'></input>
            </div>
    );
}

export default SearchBar;

