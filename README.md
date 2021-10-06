# Quote's Project

![Repository](https://img.shields.io/badge/github-quotes-brightgreen?logo=github&style=flat)
![PR Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)
![Issues](https://img.shields.io/github/issues/nyancodeid/quotes)
![Pull Request](https://img.shields.io/github/issues-pr/nyancodeid/quotes)

Website sederhana yang menampilkan Kutipan Inspirasional secara acak. Website ini menampilkan kutipan yang submit oleh para kontributor terbuka dan para peserta event Hacktoberfest 2021. Dapatkan kutipan yang membuatmu tetap termotivasi!

## Screenshot

<p  align="center">
<img src="./public/screenshot.png" alt="Quote's project">
</p>

## Contribute

Kami membuka peluang untuk memeriahkan event Hacktoberfest 2021 dengan cara berkontribusi menambahkan fitur dan memperbaiki bug yang mungkin dilaporkan di halaman issues repository ini, atau membantu kami dengan menambah quotes milikmu.

Kamu bisa mulai berkontribusi dengan membuat quotes atau menambahkan quotes tokoh yang kamu sukai kedalam file `[your-github-username].yaml` (_nama file ini harus sesuai dengan username github kamu_) pada folder `quotes/`. Pastikan username github kamu ada dan tertulis dengan benar ya.

Untuk format filenya kita menggunakan YAML, dan pastikan format penulisannya sama ya. Setiap user hanya diperbolehkan mengubah file miliknya sendiri. Jika terdapat kesalahan penulisan pada file pengguna lain kamu bisa membantunya dengan membuatkan `issue`.

```yaml
username: nyancodeid
quotes:
  - text: "Yang terbaik di antara kalian ialah mereka nan berakhlak paling mulia."
    author: "Ali bin Abi Thalib"
    created_at: "3 Oktober 2021"
  - text: "Hiduplah dengan rendah hati, tidak peduli seberapa kekayaanmu."
    author: "Ali bin Abi Thalib"
    created_at: "3 Oktober 2021"
```

Agar quotes bisa digunakan atau dikonsumsi oleh website, kita perlu meng-_generate_ quotes kita. Caranya dengan menjalankan perintah `npm run generate:quotes`. Perintah ini diperlukan setiap kita mengubah file YAML kita.

Untuk melihat versi website nya kamu bisa menjalankan perintah `npm run dev` untuk menjalankan web server dalam mode development yang berjalan pada port `localhost:3000`.

## Development

Untuk memulai development kita perlu install npm package yang dibutuhkan terlebih dahulu dengan cara `npm install` atau `yarn`.

```bash
# install package dependencies
$ npm install

# generate the quotes (local development only)
$ npm run generate:quotes

# run development server
$ npm run dev
```
