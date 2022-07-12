// * là lấy tất cả, ở đây lấy get, put, post,...
import * as request from '~/utils/request';

export const search = async (q, type = 'less') => {
    try {
        // encodeURIComponent() là sẽ mã hóa những kí tự không hợp lệ thành hợp lệ
        const res = await request.get('users/search', {
            params: {
                q,
                type,
            },
        });
        return res.data
    } catch (error) {
        console.log(error);
    }
};

