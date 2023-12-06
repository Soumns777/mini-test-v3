import dayjs from "dayjs";


/**
 * @desc format时间 [年-月-日,'周几']
 */
export const handleFormatDate = () => {
    let date = new Date()

    let datetime;
    let nowDate;
    let nowYear;
    let nowWeek;
    // 获取时间：时分秒
    const hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
    const minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
    const secound = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()
    datetime = hour + ':' + minute + ':' + secound

    // 获取日期：年月日
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = (date.getDate()).toString().padStart(2, '0')
    nowDate = month + "-" + day
    nowYear = year + "-"

    // 获取星期几
    const weeks = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六");
    nowWeek = weeks[new Date().getDay()];
    return [`${nowYear}${nowDate}`, nowWeek]
}


/**
 * @desc format时间 ['年','月','日']
 */
export const handleYearMonthDay = () => {
    const date = new Date()
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return [year, month, day]
}


/**
 * @desc 数组对象去重
 */

export const handleNewSet = (arr, key) => {
    let obj = {}
    return arr.reduce((item, next) => {
        obj[next.id] ? '' : obj[next.id] = true && item.push(next);
        return item;
    }, []);
}


/**
 * @desc 计算两段时间之间相差时间-以及到五分钟的时候提示倒计时
 */
export const handleFormatTimeStamp = (shangzhongTime, nowTime, shichang) => {

    // 上钟时间转化为时间戳
    let shangzhongTimeUnix = dayjs(shangzhongTime).valueOf()

// 当前时间
    const nowTimeUnix = (new Date(handleFormatDate1(nowTime))).valueOf()

// 获取两段时间戳相差的秒数
    const dynamicUnix = Number(nowTimeUnix) - Number(shangzhongTimeUnix)
    let dynamicShichang = Math.round(new Date(dynamicUnix) / 1000)


    let dynamicSeconds = Number(shichang) - Number(dynamicShichang)
// 项目时长 单位:分钟
    if (dynamicSeconds > 0) {

        if (dynamicSeconds <= 5 * 60) {
            console.log("💙💛到五分钟了")
            return [true, dynamicSeconds, false]
        } else {
            console.log("💙💛还没到五分钟呢", dynamicSeconds)
            return [false, dynamicSeconds, false]
        }

    } else {
        console.log("💙💛时间结束了")
        return [false, '', true]
    }
}

// 3600秒 --> 01:00:00
function handleFormatSeconds(seconds) {
    let hour = Math.floor(seconds / 3600) >= 10 ? Math.floor(seconds / 3600) : '0' + Math.floor(seconds / 3600);
    seconds -= 3600 * hour;
    let min = Math.floor(seconds / 60) >= 10 ? Math.floor(seconds / 60) : '0' + Math.floor(seconds / 60);
    seconds -= 60 * min;
    let sec = seconds >= 10 ? seconds : '0' + seconds;
    return hour + ':' + min + ':' + sec;
}

// 108184184 --> 2022-11-10 10:00:00
function handleFormatDate1(date) {
    let datetime;
    let nowDate;
    let nowYear;
    let nowWeek;
    // 获取时间：时分秒
    const hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
    const minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
    const second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()
    datetime = hour + ':' + minute + ':' + second

    // 获取日期：年月日
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = (date.getDate()).toString().padStart(2, '0')
    nowDate = month + "-" + day
    nowYear = year + "-"

    return `${nowYear}${nowDate} ${hour}:${minute}:${second}`
}


