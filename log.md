# 开发中的问题
## node webkit 
1. 应该下载sdk版本不然没法调试 打不开F12
2. 远程错误监听(高级哦！)
3. node webkit在最外层使用margin 会导致页面出现滚动条
```cmd
nw.exe forCao.nw --remote-debugging-port=9222//cmd
```
## node
1. 退出命令行 .exit 或者ctrl+c
2. meteor.com 貌似是一个比较好的 快速开发框架
3. Socket Stream 应该是一个很好的多屏互动框架
4. supervisor node 运行
5. open.cmd 可以方便的在当前文件夹打开cmd
## js
1. 在手机上测试的时候 监听错误
```js
onerror=handleErr
var txt=""
function handleErr(msg,url,l)
{
txt="There was an error on this page.\n\n"
txt+="Error: " + msg + "\n"
txt+="URL: " + url + "\n"
txt+="Line: " + l + "\n\n"
txt+="Click OK to continue.\n\n"
alert(txt)
return true
}
``` 
## semantic-ui
	
## readme.md
[各种效果的具体写法](https://github.com/guodongxiaren/README)
## cmd
``` cmd
@echo off
echo 当前盘符：%~d0
echo 当前盘符和路径：%~dp0
echo 当前批处理全路径：%~f0
echo 当前盘符和路径的短文件名格式：%~sdp0
echo 当前CMD默认目录：%cd%
echo 目录中有空格也可以加入""避免找不到路径
echo 当前盘符："%~d0"
echo 当前盘符和路径："%~dp0"
echo 当前批处理全路径："%~f0"
echo 当前盘符和路径的短文件名格式："%~sdp0"
echo 当前CMD默认目录："%cd%"
pause
```