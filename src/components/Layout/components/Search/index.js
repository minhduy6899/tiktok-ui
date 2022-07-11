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

const cx = className.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);

    const inputRef = useRef()

    useEffect(() => {
        setTimeout(() => {
            // Để set api xong gọi ra lịch sử khi tìm kiếm
            setSearchResult([1, 1, 1]);
        }, 0);
    }, []);

    const handleClear = () => {
        // nhấp nút xóa thì xóa các chữ đã nhập
        setSearchValue('')
        // nhấp nút xóa thì ẩn luôn phần lịch sử 
        setSearchResult([])
        // nhấp nút xóa thì focus lại o input
        inputRef.current.focus()
    }

    const handleHideResult = () => {
        setShowResult(false)
    }
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
                        <AccountItem />
                        <AccountItem />
                        <AccountItem />
                        <AccountItem />
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
                {!!searchValue && (
                    /* button clear */
                    <button className={cx('clear')} onClick={handleClear}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}
                {/* icon loading khi nhấp tìm kiếm */}
                {/* <FontAwesomeIcon className={cx('loading')} icon={faSpinner} /> */}
                {/* button tìm kiếm */}
                <button className={cx('search-btn')}>
                    <SearchIcon />
                </button>
            </div>
        </HeadlessTippy>
    );
}

export default Search;
