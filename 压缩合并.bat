cd /d  "%~dp0"
winrar a -ep1 -o+ -cfg- -ai  -ibck  D:\public\nodepage\nwjs-v0.20.3-win-x64\forCao.zip  index.html "%~dp0"/css  package.json "%~dp0"/js  
cd /d  D:\public\nodepage\nwjs-v0.20.3-win-x64
ren   forCao.zip  forCao.nw
copy /b nw.exe+forCao.nw forCao.exe
pause 