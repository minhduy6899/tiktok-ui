
import styles from './Header.module.scss'
import className from 'classnames/bind'
import images from '~/assets/images'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faSpinner, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const cx = className.bind(styles)

function Header() {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <img src={images.logo} alt='tiktok logo' />
                </div>
                <div className={cx('search')}>
                    <input placeholder='Search accounts and videos' autocomplete="on" spellCheck='false' />
                    <button className={cx('clear')}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                    <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
                    <button className={cx('search-btn')}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>
                <div className={cx('actions')}>
                    Đăng nhập/ Đăng kí
                    {/* Chỗ đăng nhập */}
                </div>
            </div>
        </header>
    )
}

export default Header;