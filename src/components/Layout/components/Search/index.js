// import từ node module
import className from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';

// import từ source code
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import { useEffect, useState, useRef } from 'react';
import styles from './Search.module.scss';
import { SearchIcon } from '~/components/Icons';
import { useDebounce } from '~/hooks';

const cx = className.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const debounced = useDebounce(searchValue, 500);

    const inputRef = useRef();

    useEffect(() => {
        if(!debounced.trim()) {
            setSearchResult([])
            return
        }

        setLoading(true)

        // encodeURIComponent() là sẽ mã hóa những kí tự không hợp lệ thành hợp lệ
        fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(debounced)}&type=less`)
            .then((res) => res.json())
            .then((res) => {
                setSearchResult(res.data);
                setLoading(false)
            })
            .catch((err) => {
                setLoading(false)
            })
    }, [debounced]);

    const handleClear = () => {
        // nhấp nút xóa thì xóa các chữ đã nhập
        setSearchValue('');
        // nhấp nút xóa thì ẩn luôn phần lịch sử
        setSearchResult([]);
        // nhấp nút xóa thì focus lại o input
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };
    return (
        /* Tippp là khi trỏ vào sẽ hiện content ở placement */
        /* Ví dụ:<Tippy content="Tìm kiếm" placement='right'> */
        <HeadlessTippy
            interactive
            visible={showResult && searchResult.length > 0}
            render={(attrs) => (
                // Hiển thị danh sách sổ xuống lịch sử tìm kiếm...
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        <h4 className={cx('search-title')}>Accounts</h4>
                        {searchResult.map((result, index) => (
                            <AccountItem key={result.id} data={result}/>
                        ))}
                    </PopperWrapper>
                </div>
            )}
            onClickOutside={handleHideResult}
        >
            {/* Ô search */}
            <div className={cx('search')}>
                {/* input search */}
                <input
                    ref={inputRef}
                    value={searchValue}
                    placeholder="Search accounts and videos"
                    autocomplete="on"
                    spellCheck="false"
                    onChange={(e) => setSearchValue(e.target.value)}
                    onFocus={(e) => setShowResult(true)}
                />
                {!!searchValue && !loading && (
                    <button className={cx('clear')} onClick={handleClear}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}
                {/* icon loading khi nhấp tìm kiếm */}
                {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
                {/* button tìm kiếm */}
                <button className={cx('search-btn')}>
                    <SearchIcon />
                </button>
            </div>
        </HeadlessTippy>
    );
}

export default Search;
