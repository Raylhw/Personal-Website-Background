// 工具库
export function formatTimes(timestamp) {
    let time = new Date(timestamp);

    // 年 月 日
    const year = time.getFullYear();
    const month = (time.getMonth() + 1).toString().padStart(2, '0');
    const day = (time.getDate()).toString().padStart(2, '0');

    // 时 分 秒
    const hour = (time.getHours()).toString().padStart(2, '0');
    const minute = (time.getMinutes()).toString().padStart(2, '0');
    const second = (time.getSeconds()).toString().padStart(2, '0');

    // 星期
    const weeks = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    const week = weeks[time.getDay()];

    return `${year}-${month}-${day} ${hour}:${minute}:${second} ${week}`;
}