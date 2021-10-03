# Quote's Project

![Repository](https://img.shields.io/badge/github-quotes-brightgreen?logo=github&style=flat)
![PR Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)
![Issues](https://img.shields.io/github/issues/nyancodeid/quotes)
![Pull Request](https://img.shields.io/github/issues-pr/nyancodeid/quotes)

Website sederhana yang menampilkan Kutipan Inspirasional secara acak. Website ini menampilkan kutipan yang mengagumkan. Dapatkan kutipan harian anda dan tetap termotivasi!

## Contribute
Kami membuka peluang bagi kamu untuk saling berkontribusi untuk menambahkan fitur atau memperbaiki bug yang mungkin dilaporkan di-halaman issues repository ini, atau membantu kami dengan menambah daftar quotes. Untuk berkontribusi pada project ini kamu bisa clone repository ini terlebih dahulu. 

Kamu bisa mulai berkontribusi dengan membuat quotes atau menambahkan quotes yang kamu tau kedalam file `[your-github-username].yaml` (*nama file ini harus sesuai dengan username github kamu*) pada folder `quotes/`. Pastikan username github kamu ada dan tertulis dengan benar ya.

Format filenya kita menggunakan YAML, dan pastikan format penulisannya sama ya. Setiap user hanya diperbolehkan mengubah file miliknya sendiri. Jika ada kesalah penulisan milik user lain kamu bisa membuat `Issue`.

```yaml
username: nyancodeid
quotes:
  - text: 'Yang terbaik di antara kalian ialah mereka nan berakhlak paling mulia.'
    author: 'Ali bin Abi Thalib'
    created_at: '3 Oktober 2021'
  - text: 'Hiduplah dengan rendah hati, tidak peduli seberapa kekayaanmu.'
    author: 'Ali bin Abi Thalib'
    created_at: '3 Oktober 2021'
```

Agar quotes bisa dikonsumsi oleh website kita perlu men-*generate* quotes kita. Cara dengan menjalankan perintah `npm run generate:quotes`. Perintah ini diperlukan setiap kita mengubah file YAML kita. 

Untuk melihat versi webiste nya kamu bisa menjalankan perintah `npm run dev` untuk menjalankan web server dalam mode development yang berjalan pada port `localhost:3000`.

## Development
Untuk memulai development kita perlu install npm package yang dibutuhkan terlebih dahulu dengan cara `npm install` atau `yarn`.

```bash
# install package dependencies
$ npm install 

# Generate Quotes (Development Only) 
$ npm run generate:quotes 

# Run Development Server
$ npm run dev
```