const express = require('express');
const puppeteer = require('puppeteer');

const app = express();

// 指定Chromium浏览器路径 
const browser = await puppeteer.launch({
    // 根据实际路径进行更改
     executablePath: '/chrome-win'  
    
    });
app.get('/get-web-page-content', async (req, res) => {
    try {
        // 获取从 PHP 发送过来的网址
        const url = req.query.url;

        // 启动 Puppeteer 浏览器
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // 跳转到指定网址
        await page.goto(url);

        // 等待页面的 JavaScript 加载完成
        await page.waitForNavigation({ waitUntil: 'networkidle2' });

        // 获取页面的 HTML 内容
        const content = await page.content();

        // 关闭浏览器
        await browser.close();

        // 发送页面内容给客户端
        res.send(content);
    } catch (error) {
        // 如果发生错误，发送 500 错误给客户端
        res.status(500).send('Failed to get web page content' + error);
    }
});

app.listen(3000, () => {
    console.log(`Server is running at http://localhost:3000`);
});


// const express = require('express');
// const puppeteer = require('puppeteer');

// const app = express();

// let browser; // 声明一个变量以保存浏览器实例

// // 在应用程序启动时启动浏览器
// (async () => {
//     browser = await puppeteer.launch();
// })();

// app.get('/get-web-page-content', async (req, res) => {
//     try {
//         // 获取从 PHP 发送过来的网址
//         const url = req.query.url;

//         // 使用之前启动的浏览器实例创建页面
//         const page = await browser.newPage();

//         // 跳转到指定网址
//         await page.goto(url);

//         // 等待页面的 JavaScript 加载完成
//         await page.waitForNavigation({ waitUntil: 'networkidle2' });

//         // 获取页面的 HTML 内容
//         const content = await page.content();

//         // 关闭页面
//         await page.close();

//         // 发送页面内容给客户端
//         res.send(content);
//     } catch (error) {
//         // 如果发生错误，发送 500 错误给客户端
//         res.status(500).send('Failed to get web page content' + error);
//     }
// });

// app.listen(3000, () => {
//     console.log(`Server is running at http://localhost:3000`);
// });
