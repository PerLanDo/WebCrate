$WshShell = New-Object -ComObject WScript.Shell
$Shortcut = $WshShell.CreateShortcut("$env:USERPROFILE\Desktop\WebCrate.lnk")
$Shortcut.TargetPath = "C:\Windows\System32\cmd.exe"
$Shortcut.Arguments = "/c `"cd /d `"$PSScriptRoot`" && npm start`""
$Shortcut.WorkingDirectory = $PSScriptRoot
$Shortcut.IconLocation = "shell32.dll,165"
$Shortcut.Description = "WebCrate - Your Personal Link Manager"
$Shortcut.Save()

Write-Host ""
Write-Host "✅ Desktop shortcut created successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "A 'WebCrate' shortcut has been added to your Desktop." -ForegroundColor Cyan
Write-Host "Double-click it to launch the app!" -ForegroundColor Cyan
Write-Host ""
Read-Host "Press Enter to exit"
