# ForCao	
## 功能
计算器 用来计算 部分数据		
### 内容
使用 semantic-ui, jquery ,node , node webkit, enigmavb(打包)
### 打包流程
1. 把全部文件压缩成zip 重名为xxx.nw
2. 与下载好的node webkit 中的nw.exe 通过 copy b 命令打包为一个文件
``` cmd
copy /b nw.exe+app.nw app.exe
```
3. 使用 enigmavb 吧所有库文件与 上一步打包好的文件打包为一个完整的 exe 
4. ok！
5. 关于打包工具的说明
	1. 先进入当前项目目录
	2. 打包/css /js package.json index.html 并移动到nw解压目录
	3. 进入nw解压目录合并 forCao.nw、nw.exe 为forCao.exe
	4. 使用enigmavb吧所需要的dll 打包到一起
	5. 完成
