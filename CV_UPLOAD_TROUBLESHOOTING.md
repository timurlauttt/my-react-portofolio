# 🔧 CV Upload Troubleshooting Guide

## ✅ Checklist Sebelum Upload CV

### 1. **Aktifkan Firebase Storage**
- Buka: https://console.firebase.google.com
- Pilih project Anda
- Menu **Storage** (ikon folder)
- Klik **Get Started**
- Pilih lokasi (misalnya: asia-southeast1)
- Klik **Done**

### 2. **Setup Storage Rules**
- Di halaman Storage, klik tab **Rules**
- Copy-paste rules ini:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /cv/{filename} {
      allow read: if true;
      allow write, delete: if request.auth != null;
    }
    match /{allPaths=**} {
      allow read, write: if false;
    }
  }
}
```

- Klik **Publish**

### 3. **Setup Firestore Rules**
- Menu **Firestore Database**
- Klik tab **Rules**
- Copy-paste rules ini:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /settings/{document=**} {
      allow read: if true;
      allow write, delete: if request.auth != null;
    }
  }
}
```

- Klik **Publish**

### 4. **Pastikan Login Sebagai Admin**
- Login di `/admin/login` dengan email/password yang sudah terdaftar di Firebase Authentication
- Jangan gunakan bypass mode

### 5. **Check Environment Variables**
Pastikan file `.env` memiliki:
```
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
```

## 🐛 Error yang Mungkin Muncul

### Error: "Permission denied"
**Solusi:**
1. Pastikan Storage Rules sudah di-publish
2. Pastikan Anda sudah login sebagai admin
3. Tunggu 1-2 menit untuk propagasi rules
4. Clear cache browser (Ctrl+Shift+R)

### Error: "Storage bucket not configured"
**Solusi:**
1. Check `.env` file ada `VITE_FIREBASE_STORAGE_BUCKET`
2. Restart dev server: `npm run dev`
3. Aktifkan Storage di Firebase Console

### Error: "Failed to upload"
**Solusi:**
1. Check file size (max 5MB)
2. Check file type (hanya PDF, DOC, DOCX)
3. Check internet connection
4. Check browser console untuk error detail

### Error: "Auth required"
**Solusi:**
1. Logout dari admin
2. Login kembali dengan email/password yang benar
3. Jangan gunakan bypass mode

## 🧪 Cara Test Upload CV

1. **Login ke Admin:**
   ```
   http://localhost:5173/admin/login
   ```

2. **Buka Halaman CV:**
   - Klik menu **CV** di sidebar

3. **Upload File:**
   - Drag & drop file PDF/DOC/DOCX
   - Atau klik "browse" untuk pilih file
   - Pastikan ukuran < 5MB
   - Klik "Upload CV"

4. **Check Console:**
   - Buka Developer Tools (F12)
   - Tab Console
   - Lihat log:
     ```
     Uploading file to: cv/cv_123456_filename.pdf
     Upload successful: ...
     Download URL: https://...
     Metadata saved to Firestore
     ```

5. **Verify:**
   - File muncul di "Current CV"
   - Button download berfungsi
   - CV muncul di floating button website

## 📝 Manual Workaround (Jika Upload Gagal)

Jika upload tetap gagal, Anda bisa tambah CV manual:

1. **Upload file ke Google Drive:**
   - Set sharing: "Anyone with the link can view"
   - Copy direct download link

2. **Tambah ke Firestore Manual:**
   - Firebase Console → Firestore Database
   - Collection: `settings`
   - Document ID: `cv`
   - Add fields:
     ```
     downloadURL: "https://drive.google.com/uc?id=YOUR_FILE_ID"
     fileName: "CV_Urip.pdf"
     uploadedAt: (timestamp - now)
     ```

3. **Save** dan test download button di website

## 🆘 Masih Gagal?

Cek log error di browser console dan kirim ke developer dengan info:
- Error message lengkap
- Screenshot console
- Screenshot Storage Rules
- Screenshot Firestore Rules
