
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import Image from '~/components/Image'
import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles)

function AccountItem() {
    return (
        <div className={cx('wrapper')}>
            <Image
                className={cx('avatar')}
                src="http://tophinhanhdep.net/wp-content/uploads/2016/01/avatar-naruto.jpg"
                alt="Hoa"
            />
            <div className={cx('info')}>
                <p className={cx('name')}>
                    <span className={cx('fullname')}>Nguyễn Minh Duy</span>
                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                </p>
                <span className={cx('username')}>minhduy6899</span>
            </div>
        </div>
    );
}

export default AccountItem;