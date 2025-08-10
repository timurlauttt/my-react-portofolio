# Firebase Setup Script untuk Development
# Jalankan script ini untuk setup Firebase rules development

Write-Host "Installing Firebase CLI..." -ForegroundColor Green
npm install -g firebase-tools

Write-Host "Logging in to Firebase..." -ForegroundColor Green
firebase login

Write-Host "Initializing Firebase project..." -ForegroundColor Green
firebase init

Write-Host "Deploying Firestore rules..." -ForegroundColor Green
firebase deploy --only firestore:rules

Write-Host "Deploying Storage rules..." -ForegroundColor Green
firebase deploy --only storage

Write-Host "Setup complete!" -ForegroundColor Green
Write-Host "Your Firebase project should now allow development access." -ForegroundColor Yellow
