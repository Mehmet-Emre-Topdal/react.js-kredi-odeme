# MET BANK — Kredi Geri Ödeme Planlayıcı

Kurum içi kullanım için geliştirilmiş, React tabanlı kredi geri ödeme hesaplama uygulaması.

<img width="1888" height="858" alt="kredi" src="https://github.com/user-attachments/assets/6ce8dea3-226d-4a9b-826e-7ebdd953b8af" />
<img width="1880" height="841" alt="kredi2" src="https://github.com/user-attachments/assets/e142c701-cc90-4362-a0f7-c55fe60119cf" />

## Özellikler

- Kredi tutarı, kar oranı ve taksit sayısına göre **geri ödeme planı** oluşturma
- **Aylık, yıllık ve günlük** taksit aralığı desteği
- Her taksit için **ana para, kar tutarı, KKDF ve BSMV** dökümü
- Konut kredisi dahil her kredi türü için **özelleştirilebilir vergi oranları**
- Toplam ödeme ve toplam vergi tutarı özeti

## Kullanılan Teknolojiler

| Teknoloji | Amaç |
|---|---|
| React 18 | UI framework |
| Material UI v5 | Bileşen kütüphanesi |
| Context API | Global state yönetimi |
| `useImperativeHandle` | Form ref API'si |

## Kurulum

```bash
npm install
npm start
```

Uygulama [http://localhost:3000](http://localhost:3000) adresinde açılır.

## Kullanım

1. **Kredi Tutarı** — Kullanmak istediğiniz kredi miktarını girin (₺)
2. **Kar Oranı** — Bankanın uyguladığı kar oranını girin (%)
3. **Taksit Aralığı** — Aylık, yıllık veya günlük seçin
4. **Taksit Sayısı** — Kaç taksitte ödeyeceğinizi girin
5. **BSMV / KKDF** — Standart oranlar önceden dolu gelir; konut kredisi için her ikisini de **0** yapın
6. **Hesapla** butonuna basın — geri ödeme planı tabloda görüntülenir

## Hesaplama Yöntemi

- **Taksit tutarı:** Bileşik faiz formülü ile toplam geri ödeme hesaplanır, taksit sayısına bölünür
- **Her taksit:** Kalan anapara üzerinden basit faiz ile kar hesaplanır; KKDF ve BSMV kar tutarı üzerinden ayrı ayrı işlenir
- **Kalan anapara:** Her taksitte ödenen anapara düşülerek güncellenir

## Proje Yapısı

```
src/
├── Components/
│   ├── FormComponent.js    # Ana form kartı
│   ├── FormInputs.js       # Giriş alanları (forwardRef)
│   ├── Info.js             # Bilgi paneli
│   ├── PayBackTable.js     # Geri ödeme planı tablosu
│   └── PlanComponent.js    # Plan modal dialog
└── store/
    ├── app-context.js      # Kredi verisi için Context
    └── dialog-context.js   # Modal açık/kapalı için Context
```

## Scriptler

| Komut | Açıklama |
|---|---|
| `npm start` | Geliştirme sunucusunu başlatır |
| `npm run build` | Production build oluşturur |
| `npm test` | Test runner'ı başlatır |
