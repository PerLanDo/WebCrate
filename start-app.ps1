Write-Host ""
Write-Host "========================================"
Write-Host "   Starting WebCrate Desktop App"
Write-Host "========================================"
Write-Host ""

# Start the server
node serve-dist.js

# Keep the window open if there's an error
Read-Host "Press Enter to exit"
