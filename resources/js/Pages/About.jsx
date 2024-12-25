import HomeLayout from '@/Layouts/HomeLayout';
import ReactMarkdown from 'react-markdown';

const markdownContent = `
# About SiBolang

**SiBolang** adalah platform digital yang dirancang untuk membantu memperkenalkan dan melestarikan seni budaya di Indonesia. Dengan tujuan untuk mendokumentasikan kekayaan budaya Indonesia agar tidak luntur oleh zaman, SiBolang menyediakan berbagai fitur untuk pengguna yang ingin berkontribusi dalam pelestarian budaya tradisional.

## Visi dan Misi
Visi dari **SiBolang** adalah menjadi wadah digital yang mudah diakses oleh semua kalangan, guna memperkenalkan, melestarikan, dan mengembangkan seni budaya Indonesia. Melalui platform ini, kami berharap dapat menjaga warisan budaya Indonesia tetap hidup dan berkembang di era digital yang serba cepat.

## Fitur Utama SiBolang

1. **Login dan Logout, serta Delete Account**
  Pengguna dapat dengan mudah login untuk mengakses akun mereka. Jika pengguna memutuskan untuk berhenti menggunakan aplikasi, mereka juga dapat menghapus akun mereka dengan mudah.

2. **Manajemen Data Pengguna**
  Setiap pengguna dapat mengelola data profil mereka, termasuk foto profil, informasi akun, dan daftar seni budaya yang mereka bookmark untuk referensi lebih lanjut.

3. **Katalog Seni Budaya**
   - **Entri Data**: Pengguna terdaftar (seperti komunitas budaya, seniman, atau peneliti) dapat mengisi formulir untuk mendata berbagai jenis seni budaya (seperti tari, musik, kriya, kuliner, dll.) lengkap dengan deskripsi, asal daerah, sejarah, foto, dan video. Admin akan melakukan verifikasi dan moderasi data yang dimasukkan.
   - **Pencarian dan Filter**: Fitur pencarian canggih yang memudahkan pengguna untuk mencari informasi spesifik berdasarkan kategori, daerah, kata kunci, dan lainnya.

4. **Fitur Multi-Factor Authentication (MFA)**
   Keamanan akun pengguna sangat penting. Oleh karena itu, **SiBolang** menerapkan sistem multi-factor authentication (MFA), yang mengirimkan kode OTP ke email pengguna untuk memastikan keamanan akses ke akun mereka.

5. **Forum Diskusi**
  SiBolang menyediakan ruang komunitas online bagi para penggunanya untuk berdiskusi, berbagi pengetahuan, dan bertukar informasi mengenai seni budaya tradisional Indonesia. Forum ini juga memiliki sistem penilaian dengan fitur upvote dan downvote, yang memungkinkan pengguna memberikan penilaian terhadap kualitas thread yang ada. Admin aplikasi akan memoderasi forum ini untuk menjaga kualitas diskusi dan memastikan tidak ada informasi yang salah.

## Analisis Keunggulan SiBolang
SiBolang memiliki keunggulan sebagai platform yang tidak hanya menyediakan dokumentasi seni budaya, tetapi juga memperkenalkan interaksi sosial yang lebih aktif melalui forum diskusi dan fitur komunitas. Dengan akses yang terbuka untuk kontribusi dari seniman dan peneliti, SiBolang juga memberikan kesempatan bagi setiap individu untuk turut serta dalam pelestarian budaya Indonesia.

SiBolang hadir untuk memenuhi kebutuhan digitalisasi budaya, dengan sistem yang mudah digunakan dan memberikan informasi yang terverifikasi. Dibandingkan dengan platform lain, SiBolang memadukan elemen edukasi, komunitas, dan keamanan, memastikan bahwa setiap kontribusi dan diskusi yang dilakukan membawa dampak positif bagi pelestarian budaya Indonesia.
`;

export default function About() {
  return (
    <HomeLayout>
      <div className="flex flex-col justify-center items-center">
        <div className="max-w-3xl w-full flex flex-col">
          <ReactMarkdown
            components={{
              h1: ({ node, ...props }) => (
                <h1
                  className="text-3xl font-bold text-gray-900 my-4"
                  {...props}
                />
              ),
              h2: ({ node, ...props }) => (
                <h2
                  className="text-2xl font-semibold text-gray-800 my-3"
                  {...props}
                />
              ),
              p: ({ node, ...props }) => (
                <p
                  className="text-lg text-gray-700 leading-relaxed mb-4"
                  {...props}
                />
              ),
              ul: ({ node, ...props }) => (
                <ul className="list-disc pl-5 space-y-2" {...props} />
              ),
              li: ({ node, ...props }) => (
                <li className="text-gray-700" {...props} />
              ),
              strong: ({ node, ...props }) => (
                <strong className="font-semibold text-gray-900" {...props} />
              ),
              em: ({ node, ...props }) => (
                <em className="italic text-gray-700" {...props} />
              ),
              blockquote: ({ node, ...props }) => (
                <blockquote
                  className="border-l-4 border-gray-500 pl-4 italic text-gray-700 mb-4"
                  {...props}
                />
              ),
            }}
          >
            {markdownContent}
          </ReactMarkdown>
        </div>
      </div>
    </HomeLayout>
  );
}
