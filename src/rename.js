// 本目录下所有 *.下载 文件都会被重命名为 *.src 文件
// 例如：a.下载 -> a.src

const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname);
const files = fs.readdirSync(dir);

files.forEach(file => {
    if (file.endsWith('.下载')) {
        const src = file.replace('.下载', '.src');
        fs.renameSync(path.join(dir, file), path.join(dir, src));
    }
    }
);
