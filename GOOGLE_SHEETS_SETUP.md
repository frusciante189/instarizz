# Google Sheets E-posta Kaydetme Kurulumu

Bu rehber, success sayfasında e-posta adreslerini Google Sheets'e kaydetmek için gerekli adımları açıklar.

## 📋 Gereksinimler

- Google hesabı
- Google Cloud Console erişimi

## 🚀 Kurulum Adımları

### 1. Google Cloud Console'da Proje Oluşturma

1. [Google Cloud Console](https://console.cloud.google.com/) adresine gidin
2. Sağ üstten **"Select a project"** > **"New Project"** seçeneğini tıklayın
3. Proje adı girin (örn: "instarizz-emails")
4. **"Create"** butonuna tıklayın

### 2. Google Sheets API'yi Etkinleştirme

1. Sol menüden **"APIs & Services"** > **"Enable APIs and Services"** seçeneğine tıklayın
2. Arama kutusuna **"Google Sheets API"** yazın
3. **"Google Sheets API"** seçeneğini tıklayın
4. **"Enable"** butonuna tıklayın

### 3. Service Account Oluşturma

1. Sol menüden **"APIs & Services"** > **"Credentials"** seçeneğine tıklayın
2. Üst kısımdan **"Create Credentials"** > **"Service Account"** seçeneğini tıklayın
3. Service account adı girin (örn: "sheets-writer")
4. **"Create and Continue"** butonuna tıklayın
5. Role kısmını boş bırakabilirsiniz, **"Continue"** > **"Done"** tıklayın

### 4. JSON Key Oluşturma

1. Oluşturduğunuz service account'a tıklayın
2. Üst kısımdan **"Keys"** sekmesine gidin
3. **"Add Key"** > **"Create new key"** seçeneğini tıklayın
4. **"JSON"** formatını seçin ve **"Create"** butonuna tıklayın
5. JSON dosyası bilgisayarınıza indirilecek

### 5. Google Sheet Oluşturma

1. [Google Sheets](https://sheets.google.com/) adresine gidin
2. Yeni bir spreadsheet oluşturun
3. İlk satıra başlıklar ekleyin:
   - **A1**: Email
   - **B1**: Tarih/Saat
4. URL'den Sheet ID'yi kopyalayın:
   ```
   https://docs.google.com/spreadsheets/d/BURASI_SHEET_ID/edit
   ```

### 6. Sheet'i Service Account ile Paylaşma

1. Google Sheet'inizde sağ üstteki **"Share"** butonuna tıklayın
2. İndirdiğiniz JSON dosyasındaki **"client_email"** değerini kopyalayın
   - Şuna benzer olacak: `your-service-account@your-project.iam.gserviceaccount.com`
3. Bu e-postayı Share dialoguna yapıştırın
4. **"Editor"** yetkisi verin
5. **"Send"** butonuna tıklayın

### 7. Environment Variables Ayarlama

1. Proje ana dizininde `.env.local` dosyası oluşturun:
   ```bash
   cp .env.local.example .env.local
   ```

2. İndirdiğiniz JSON dosyasını açın ve aşağıdaki değerleri `.env.local` dosyasına kopyalayın:

   ```env
   GOOGLE_SHEETS_CLIENT_EMAIL=client_email-değeri-buraya
   GOOGLE_SHEETS_PRIVATE_KEY="private_key-değeri-buraya"
   GOOGLE_SHEETS_SHEET_ID=sheet-id-buraya
   ```

   **ÖNEMLİ:**
   - `GOOGLE_SHEETS_PRIVATE_KEY` değerini çift tırnak içinde yazın
   - `\n` karakterlerini olduğu gibi bırakın
   - Private key şuna benzer: `"-----BEGIN PRIVATE KEY-----\nMIIE...\n-----END PRIVATE KEY-----\n"`

## ✅ Test Etme

1. Development sunucusunu başlatın:
   ```bash
   npm run dev
   ```

2. Uygulamayı kullanarak checkout işlemini tamamlayın
3. Success sayfasına ulaştığınızda e-posta otomatik olarak Google Sheets'e kaydedilecek
4. Google Sheets'i kontrol edin - yeni bir satır görmelisiniz

## 🔧 Sorun Giderme

### "Server configuration error" hatası
- `.env.local` dosyasının doğru konumda olduğundan emin olun
- Tüm environment variables'ların ayarlandığını kontrol edin
- Development sunucusunu yeniden başlatın

### "Permission denied" hatası
- Service account email'inin Google Sheet'te Editor yetkisine sahip olduğundan emin olun
- Sheet ID'nin doğru olduğunu kontrol edin

### E-postalar kaydedilmiyor
- Browser console'da hata mesajlarını kontrol edin
- Network sekmesinde `/api/save-email` endpoint'ine istek gittiğinden emin olun
- Server logs'larını kontrol edin

## 📊 Google Sheet Formatı

Sheet'inizde şu sütunlar olacak:
- **Sütun A (Email)**: Kullanıcı e-posta adresi
- **Sütun B (Tarih/Saat)**: Türkiye saati ile kayıt zamanı

## 🔒 Güvenlik Notları

- `.env.local` dosyası Git'e commit edilmemelidir (zaten `.gitignore`'da var)
- JSON key dosyanızı güvenli bir yerde saklayın
- Production ortamında environment variables'ları hosting platformunuza ekleyin (Vercel, Netlify, etc.)

## 📝 Ek Notlar

- Her success sayfası ziyaretinde e-posta otomatik kaydedilir
- Aynı e-posta birden fazla kez kaydedilebilir (her işlem için)
- Sheet'in ilk sayfası (Sheet1) kullanılır
- Tarih formatı: Türkiye saati (Europe/Istanbul)
