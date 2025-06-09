


const SearchBar = ({setTextSearched, searchType}) => {

    console.log("searchType:", searchType);
    const changeInputText = (e) => {
        const textSearched = e.target.value;
        setTextSearched(textSearched);
    }
    
    let placeholderText = "";

    if(searchType === "movies") {
        placeholderText = "Search for movies";
    } else if(searchType === "tv") {
        placeholderText = "Search for TV series";
    } else {
        placeholderText = "Search for movies or TV series";
    }

    return (
        <div className='search input-search-icon mb-10'>
                <input type="text" placeholder={placeholderText} onChange={changeInputText} className='input-name focus:outline-none w-full text-white bg-transparent h-10 text-xl'></input>
            </div>
    );
}

export default SearchBar;

