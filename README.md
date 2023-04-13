
# JOS for Trainz Simulator

![version](https://img.shields.io/badge/JOS-v.2.0-brightgreen)

JOS (Jomplangan Otomatis Sistem) atau perpalangan otomatis adalah sebuah sistem untuk mempermudah membuat sistem palang kereta api pada trainz simulator.

## Features

- 1 trigger/track system
- 1 channel/pjl
- Eliminasi penggunaan invisible train dan invisible track
- Sistem penunjuk arah datang kereta
- Open source
- Minus hanya membuat palang ATLS menjadi obsolote


## Installation
1. Pilih `Code > Download ZIP` Untuk Download.
2. Select folder `JOS Scanner, JOS Stopper, dan Kyosan Sample` kemudian `drag and drop` ke content manager
3. Untuk trainz android, copy folder `JOS Scanner, JOS Stopper, dan Kyosan Sample` ke `Android > data > com.n3vgames.android.trainz > files > userdata > original > hash-01` ( jika folder hash-01 belum ada kalian dapat membuatnya sendiri) kemudian hapus file `asset.tdx`

## Dependencies

Download ini hanya jika missing dependencies atau error (cara install sama) :

- AJS Traffic `<kuid2:122285:1122:1>`
- AJS Track Eraser `<kuid2:122285:1003:2>`
[Download dependencies disini](https://drive.google.com/file/d/13-RPChPTvMKVtvxhPYb3Jdg0HMCCQr8K/view?usp=sharing)



## How to Use
1. Pasang `JOS Track Scanner` pada track ditengah PJL. Perhatikan panah pada Track Scanner, Jika track lebih dari 2, pastikan `arah panah sejajar`.
2. Pada konfigurasi `JOS Track Scanner` pastikan setiap scanner pada PJL yang sama tidak memiliki nomer `No.Track` yang sama. Atur `No.Track` dengan konfigurasi 1,2,3,dst.
3. Pasang `JOS Traffic Stopper` sambungkan dengan jalan raya yang ingin dihentikan trafficnya.
4. Pasang Objek `JOS Palang Kyosan` atur sedemikian rupa.
5. Atur semua komponen yg telah ditambahkan diatas untuk memiliki `nomor channel yang sama`

### Object Properties
#### JOS Track Scanner

Properties    | Input                           | Fungsi
------------- | ------------------------------- | -------------------------
Channel       | Bilangan bulat                  | Input channel sebagai saluran komunikasi antar objek, 1 channel = 1 set PJL
No.Track      | Bilangan bulat (1-10)           | Nomer track pada PJL (jangan ada nomer yang sama dalam 1 set PJL)
Detection Distance O/C  | Bilangan bulat  | O : jarak terjauh kereta ketika PJL menutup, C : jarak terdekat kereta ketika PJL buka (dalam meter)


#### JOS Traffic Stopper

Properties    | Input                           | Fungsi
------------- | ------------------------------- | -------------------------
Channel       | Bilangan bulat                  | Input channel sebagai saluran komunikasi antar objek, 1 channel = 1 set PJL

#### JOS Palang Kyosan

Properties    | Input                           | Fungsi
------------- | ------------------------------- | -------------------------
Channel       | Bilangan bulat                  | Input channel sebagai saluran komunikasi antar objek, 1 channel = 1 set PJL
With Sound ?      | Yes / No         | Yes = Palang berbunyi ketika aktif, No = Palang tidak mengeluarkan suara
Penunjuk Arah Flip  | Yes / No       | Yes = Penunjuk arah pada palang akan dibalik, No = Default

### Video Tutorial
Menyusul


## Membuat Palang Anda Sendiri
1. Clone `JOS Palang Kyosan` atau copy/paste config.txt ke folder lain
2. Tambahkan mesh anda sendiri ke dalam folder konten yang baru
3. Mesh yang memiliki animasi palang (kin) diload ke mesh-table bagian `default` 
4. Mesh lampu utama dan penunjuk arah seharusnya terpisah. Mesh-mesh tersebut diload ke mesh-table dengan nama tertentu ` lihat gambar` 
5. Edit bell.wav untuk mengganti suara
6. Jika ingin menambahkan efek terang/menyala pada lampu, masukkan nama texture yang akan dinyalakan ke dalam extension. contoh texture dengan nama `lampu.texture.txt` dan `penunjuk.texture.txt` :

```trainzscript
extensions
{
  texture_bercahaya-501228-1            "lampu"
  texture_bercahaya-501228-2            "penunjuk"
}
```

![My Remote Image](https://cdn.discordapp.com/attachments/905419289601908749/1095992374355820634/kyosan_example.jpg)






## 🔗 Support Kreator
[![trakteer](https://img.shields.io/badge/JIRC%20Trainz-TRAKTEER-red)](https://trakteer.id/jirc-trainz/)
[![trakteer](https://img.shields.io/badge/BBR-TRAKTEER-red)](https://trakteer.id/bastiyanbr)


