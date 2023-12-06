import presetWeapp from 'unocss-preset-weapp'
import {defaultAttributes, extractorAttributify, transformerClass} from 'unocss-preset-weapp/transformer'

// 增加自定义属性b 书写border属性
const {presetWeappAttributify, transformerAttributify} = extractorAttributify({
    attributes: [...defaultAttributes, 'b'],
})
export default {
    presets: [
        // https://github.com/MellowCo/unocss-preset-weapp
        presetWeapp({
            // whRpx: false,
        }),
        // attributify autocomplete
        presetWeappAttributify(),
    ],
    theme: {
        width: {
            all: '100%',
        },
        height: {
            all: '100%',
        },
        colors: {
            base: '#fff', // 白色
            df: '#F9F9F9',// 默认背景颜色
            login: '#1571F4',
            line: '#C2C2C2',
            goods: '#F5F5F5',
            top: '#5798FD', // 顶部背景
            line1: '#F0F0F0', // 订单详情页面line
            line2: '#E4E4E4', // 账单详情页面line
            repayPlan: '#F3F3F3', // 还款列表背景颜色
            goRepay: '#087FFF', // 去还款按钮背景颜色
            spxq: 'linear-gradient(NaNdeg, #6298FF 0%, #A8D5FF 0%)', // 商品详情
        },
        boxShadow: {
            '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
            'goods': '0 3px 8px rgba(0, 0, 0, .15)',
        },
        borderRadius: {
            'circle': '50%',
            'sm': '15rpx',
            'lg': '25rpx',
            'pgxl': '0 0 25rpx 25rpx', // 苹果系列
            'spxq': '3rpx',// 商品详情
            'xzgg': '35rpx',
            'cs': '20rpx', // 商品成色
            'order-qd': '44rpx' // 确定订单
        },
        lineHeight: {
            address: '29rpx',
            number: '5rpx'
        },
    },
    rules: [
        [/^m-(\d*)$/, ([, d]) => ({margin: `${d}`})],
        [/^p-(\d*)$/, ([, d]) => ({padding: `${d}rpx`})],
        [/^mx-(\d*)$/, ([, d]) => ({margin: `0 ${d}rpx 0 ${d}rpx`})],
        [/^my-(\d*)$/, ([, d]) => ({margin: `${d}rpx 0 ${d}rpx 0`})],
        [/^px-(\d*)$/, ([, d]) => ({padding: `0 ${d}rpx 0 ${d}rpx`})],
        [/^py-(\d*)$/, ([, d]) => ({padding: `${d}rpx 0 ${d}rpx 0`})],

        // 设置margin-top不会自动 10rpx -> 80rpx
        [/^m(t|b|l|r*)-(\d*)$/, ([, t, d]) => {
            const map = {
                t: 'top',
                b: 'bottom',
                l: 'left',
                r: 'right',
            }
            return ({[t ? `margin-${map[t]}` : 'margin']: `${d}rpx`})
        }],
        // 设置margin-top不会自动 10rpx -> 80rpx
        [/^p(t|b|l|r*)-(\d*)$/, ([, t, d]) => {
            const map = {
                t: 'top',
                b: 'bottom',
                l: 'left',
                r: 'right',
            }
            return ({[t ? `padding-${map[t]}` : 'padding']: `${d}rpx`})
        }],
    ],
    shortcuts: [
        // position
        ['pr', 'relative'],
        ['pa', 'absolute'],
        ['pf', 'fixed'],
        ['ps', 'sticky'],
        // display:flex;align-items:center
        [
            'f-1',
            'flex-1'
        ],
        // display:flex;align-items:center
        [
            'f-c',
            'flex items-center'
        ],
        // flex-direction: column;
        [
            'f-col',
            'flex-col flex'
        ],
        // flex-wrap: wrap
        [
            'f-w',
            'flex-wrap flex'
        ],
        // min-w min-h
        [
            'min-w-h',
            'min-w-screen min-h-screen'
        ],
        // justify-content: space-between
        [
            'j-c-b',
            'justify-between'
        ],
        // justify-content: space-around
        [
            'j-c-a',
            'justify-around'
        ],
        // justify-content: space-center
        [
            'j-c-c',
            'justify-center'
        ],
        // flex动态样式布局
        [
            /^f-((c|s|e)(-(c|s|e|b|a))*)$/,
            ([, , g1, , g2]) => {
                let style = ``;
                const temps = [
                    {k: "c", v: "center"},
                    {k: "s", v: "start"},
                    {k: "e", v: "end"},
                    {k: "b", v: "between"},
                    {k: "a", v: "around"}
                ];

                const r1 = temps.find(i => i.k == g1);
                style = `flex items-${r1?.v || "center"} content-${r1?.v || "center"}`;

                if (g2) {
                    const r2 = temps.find(i => i.k == g2);
                    style += ` justify-${r2?.v || "center"}`;
                }

                return style;
            }
        ]
    ],
    transformers: [
        // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerAttributify
        transformerAttributify(),

        // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerClass
        transformerClass(),
    ]
}
