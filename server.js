const http = require('http')
const fs = require('fs')

const urlArr = [
'http://img.zcool.cn/community/01e505554437be0000019ae95582a2.jpg@900w_1l_2o_100sh.jpg',
'http://static.pig66.com/uploadfile/2017/1102/20171102095531217.png',
]

urlArr.forEach(url => {
    getImg(url)
})

function getImg(url, name) {
    http.get(url, {encoding: null}, res => {
        let img = []
        let size = 0
        // 将图片地址以【.】符号分割，取最后一项，即为格式后缀
        const _arr = url.split('.')
        const format = _arr[_arr.length - 1]
        // 如果没有传入图片名字，则使用随机数
        const _name = name ? name : 'image-' + Math.floor(Number(new Date()) * Number(Math.random()))
        res.on('data', chunk => {
            img.push(chunk)
            size += chunk.length
        })
        res.on('end', (data) => {
            console.log(data)
            // 合并 Buffer
            const buffer = Buffer.concat(img, size)
            fs.writeFile(`img/${_name}.${format}`, buffer, (err) => {
                if (err) {
                    return console.error(err);
                }
                console.log("数据写入成功！");
            })
        })
    })
}
