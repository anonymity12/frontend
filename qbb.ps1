# 删除 dist.zip 文件
if (Test-Path -Path "dist.zip") {
    Remove-Item -Path "dist.zip" -Force
}

# 输出构建开始信息
Write-Host "build start"

# 执行 npm 构建命令
try {
    Start-Process -FilePath "npm" -ArgumentList "run build" -Wait -NoNewWindow -ErrorAction Stop
    Write-Host "build success"
}
catch {
    Write-Host "build failed: $_"
    return
}

# 使用 PowerShell 的 Compress-Archive 命令压缩 dist 文件夹
Compress-Archive -Path .\dist\ -DestinationPath dist.zip -Force

# 使用 scp 命令将 dist.zip 上传到远程服务器
try {
    Start-Process -FilePath "scp" -ArgumentList "dist.zip root@117.72.82.4:/www/server/nginx/html/goodchild" -Wait -NoNewWindow -ErrorAction Stop
    Write-Host "Upload success"
}
catch {
    Write-Host "Upload failed: $_"
}