
import classNames from 'classnames/bind'
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper'
import styles from './Menu.module.scss'
import MenuItem from './MenuItem';

const cx = classNames.bind(styles);

function Menu({ children, items = [] }) {

    const renderItems = () => {
        return items.map((item, index) => (
            <MenuItem key={index} data={item} />
        ))
    }

    return (
        <Tippy
            interactive
            // hover vào hiện ra liền, bỏ hover 800 mls sau ẩn
            delay={[0, 800]}
            // để element nằm sát mép dưới element trước
            placement='bottom-end'
            render={attrs => (
                // Hiển thị danh sách sổ xuống lịch sử tìm kiếm...
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <PopperWrapper className={cx('menu-popper')}>
                        {renderItems()}
                    </PopperWrapper>
                </div>
            )}
        >
            {children}
        </Tippy>
    );
}

export default Menu;