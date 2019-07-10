function loadScript(url, callback) {
    const script = document.createElement('script')
    script.type = 'text/javascript';
    // 处理IE
    if (script.readyState) {
        script.onreadystatechange = function () {
            if (script.readyState === 'loaded' || script.readyState === 'complete') {
                script.onreadystatechange = null;
                callback();
            }
        }
    } else {
        // 处理其他浏览器的情况
        script.onload = function () {
            callback();
        }
    }
    script.src = url;
    document.body.append(script);
}

// 动态加载js
loadScript('file.js', function () {
    console.log('加载完成');
})

