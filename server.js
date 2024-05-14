const express = require('express');
const puppeteer = require('puppeteer');

const app = express();

app.get('/chrome', async (req, res) => {
    try {
        // 获取从 PHP 发送过来的网址
        const url = req.query.url;

        // 启动 Puppeteer 浏览器
        // const browser = await await puppeteer.launch({
        //     // 根据实际路径进行更改
        //      executablePath: './chrome-win/chrome.exe'  
            
        //     });
        const browser = await puppeteer.launch();
        
            const page = await browser.newPage();

            // 跳转到指定网址
            await page.goto(url, { waitUntil: 'load' });

        // 跳转到指定网址
        await page.goto(url);

        // 等待页面的 JavaScript 加载完成
        // await page.waitForNavigation({ waitUntil: 'networkidle2' });

        // 获取页面的 HTML 内容
        const content = await page.content();

        // 关闭浏览器
        await browser.close();

        // 发送页面内容给客户端
        res.send(content);
    } catch (error) {
        // 如果发生错误，发送 500 错误给客户端
        res.status(500).send('Failed to get web page content'+error);
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
