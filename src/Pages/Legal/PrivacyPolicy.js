import React, { useState } from "react";
import Icon from "../../Assets/Icon/Icon";
import Button from "../../Components/Button/Button";
import Footer from "../../Components/Footer/Footer";
import Layout from "../../Components/Layout/Layout";
import Navbar from "../../Components/Navbar/Navbar";

const PrivacyPolicy = () => {
  const [accordionLegal, setAccordionLegal] = useState(false);
  return (
    <>
      <Navbar />
      <Layout className={"mb-8"}>
        <div className="flex flex-col gap-4">
          <div className="w-full rounded-lg border border-gray-300 overflow-hidden shadow-md">
            <div
              className="flex w-full items-center justify-between px-4 py-2 bg-gray-100 cursor-pointer font-custom"
              onClick={() => setAccordionLegal(!accordionLegal)}
            >
              <h1 className="text-2xl font-bold">Kebijakan Privasi</h1>
              <Button type={"icon"} className={"!p-0"}>
                {accordionLegal ? (
                  <Icon name={"chevronDown"} className={"h-6 w-6"} />
                ) : (
                  <Icon name={"chevronUp"} className={"h-6 w-6"} />
                )}
              </Button>
            </div>
            {!accordionLegal && (
              <div className="p-8 font-custom">
                <p className="mb-4">
                  Terima kasih telah mengunjungi WOWtemplate. Kami menghargai
                  privasi Anda dan berkomitmen untuk melindungi data pribadi
                  Anda. Kebijakan Privasi ini menjelaskan bagaimana kami
                  mengumpulkan, menggunakan, dan melindungi informasi yang Anda
                  berikan saat menggunakan situs web kami.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-4">
                  1. Informasi yang Kami Kumpulkan
                </h2>
                <ul className="list-disc list-inside mb-4">
                  {/* <li>
            <strong>Informasi Pribadi</strong>: Nama, alamat email, dan
            informasi kontak lainnya yang Anda berikan secara sukarela saat
            menghubungi kami atau berlangganan newsletter.
          </li> */}
                  <strong>Informasi Penggunaan</strong>: Data mengenai bagaimana
                  Anda menggunakan situs web kami, termasuk halaman yang Anda
                  kunjungi, waktu akses, dan informasi teknis lainnya.
                </ul>

                <h2 className="text-xl font-semibold mt-6 mb-4">
                  2. Penggunaan Informasi
                </h2>
                <p className="mb-4">
                  Kami menggunakan informasi yang kami kumpulkan untuk:
                </p>
                <ul className="list-disc list-inside mb-4">
                  <li>Menyediakan dan memelihara layanan kami.</li>
                  <li>Meningkatkan pengalaman pengguna dan layanan kami.</li>
                  <li>
                    Mengirimkan informasi terkait layanan kami, seperti
                    pembaruan dan penawaran promosi.
                  </li>
                  <li>Menjawab pertanyaan atau permintaan Anda.</li>
                </ul>

                <h2 className="text-xl font-semibold mt-6 mb-4">
                  3. Berbagi Informasi
                </h2>
                <p className="mb-4">
                  Kami tidak akan menjual, menyewakan, atau menukar informasi
                  pribadi Anda kepada pihak ketiga. Namun, kami dapat membagikan
                  informasi Anda dengan pihak ketiga yang membantu kami dalam
                  menjalankan layanan kami, seperti penyedia layanan hosting,
                  dengan ketentuan bahwa pihak ketiga tersebut setuju untuk
                  menjaga kerahasiaan informasi Anda.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-4">
                  4. Keamanan Informasi
                </h2>
                <p className="mb-4">
                  Kami menerapkan berbagai langkah keamanan untuk melindungi
                  informasi pribadi Anda. Namun, harap diingat bahwa tidak ada
                  metode transmisi data melalui internet atau metode penyimpanan
                  elektronik yang 100% aman. Oleh karena itu, kami tidak dapat
                  menjamin keamanan absolut dari informasi pribadi Anda.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-4">
                  5. Tautan ke Situs Web Lain
                </h2>
                <p className="mb-4">
                  Situs web kami mungkin mengandung tautan ke situs web pihak
                  ketiga seperti Canva, Google Docs, Google Sheets, dan Google
                  Slides. Kebijakan Privasi ini hanya berlaku untuk informasi
                  yang dikumpulkan oleh situs kami. Kami tidak bertanggung jawab
                  atas kebijakan privasi dan konten dari situs pihak ketiga
                  tersebut.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-4">
                  6. Perubahan Kebijakan Privasi
                </h2>
                <p className="mb-4">
                  Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke
                  waktu. Perubahan akan diumumkan melalui situs web kami, dan
                  tanggal efektif dari kebijakan yang diperbarui akan
                  dicantumkan di bagian atas Kebijakan Privasi ini. Kami
                  mendorong Anda untuk meninjau Kebijakan Privasi ini secara
                  berkala.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-4">
                  7. Hubungi Kami
                </h2>
                <p className="mb-4">
                  Jika Anda memiliki pertanyaan atau kekhawatiran mengenai
                  Kebijakan Privasi ini, silakan hubungi kami melalui email di
                  [alamat email Anda].
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-4">
                  8. Donasi melalui Saweria
                </h2>
                <p className="mb-4">
                  Kami menyediakan opsi bagi pengguna untuk memberikan donasi
                  melalui Saweria. Informasi yang Anda berikan kepada Saweria
                  akan diatur oleh kebijakan privasi Saweria. Kami tidak
                  menyimpan informasi pembayaran Anda.
                </p>

                <p className="mt-6">
                  Dengan menggunakan WOWtemplate, Anda menyetujui pengumpulan
                  dan penggunaan informasi sesuai dengan Kebijakan Privasi ini.
                  Terima kasih telah mempercayai WOWtemplate.
                </p>
              </div>
            )}
          </div>
        </div>
      </Layout>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
