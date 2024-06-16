import React, { useState } from "react";
import Icon from "../../Assets/Icon/Icon";
import Button from "../../Components/Button/Button";
import Footer from "../../Components/Footer/Footer";
import Layout from "../../Components/Layout/Layout";
import Navbar from "../../Components/Navbar/Navbar";

const TermsAndCondition = () => {
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
              <h1 className="text-2xl font-bold">Syarat & Ketentuan</h1>
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
                <section className="mb-4">
                  <h2 className="text-xl font-semibold mb-2">
                    1. Penerimaan Syarat
                  </h2>
                  <p>
                    Dengan mengakses atau menggunakan situs WOWtemplate, Anda
                    setuju untuk terikat oleh syarat dan ketentuan ini. Jika
                    Anda tidak setuju dengan syarat dan ketentuan ini, harap
                    jangan menggunakan situs web kami.
                  </p>
                </section>

                <section className="mb-4">
                  <h2 className="text-xl font-semibold mb-2">
                    2. Deskripsi Layanan
                  </h2>
                  <p>
                    WOWtemplate menyediakan berbagai template presentasi,
                    dokumen, dan excel yang dapat diakses secara gratis dan
                    tanpa perlu registrasi atau login. Template yang dipilih
                    akan diarahkan ke situs pihak ketiga seperti Canva, Google
                    Docs, Google Sheets, atau Google Slides untuk melihat detail
                    dan menduplikasi template tersebut untuk penggunaan pribadi
                    Anda.
                  </p>
                </section>

                <section className="mb-4">
                  <h2 className="text-xl font-semibold mb-2">
                    3. Penggunaan Layanan
                  </h2>
                  <p>
                    Anda setuju untuk menggunakan layanan kami hanya untuk
                    tujuan yang sah dan sesuai dengan syarat dan ketentuan ini.
                    Anda dilarang menggunakan situs kami untuk:
                    <ul className="list-disc list-inside ml-4">
                      <li>
                        Mengunggah atau mendistribusikan konten yang melanggar
                        hukum, merusak, atau tidak pantas.
                      </li>
                      <li>
                        Menyalin, mendistribusikan, atau menyalahgunakan konten
                        atau layanan kami untuk tujuan komersial tanpa izin
                        tertulis dari kami.
                      </li>
                    </ul>
                  </p>
                </section>

                <section className="mb-4">
                  <h2 className="text-xl font-semibold mb-2">
                    4. Hak Kekayaan Intelektual
                  </h2>
                  <p>
                    Semua konten yang terdapat di situs WOWtemplate, termasuk
                    namun tidak terbatas pada teks, grafis, logo, dan gambar,
                    dilindungi oleh hak cipta dan hak kekayaan intelektual
                    lainnya. Anda tidak diperbolehkan menyalin,
                    mendistribusikan, atau menggunakan konten kami tanpa izin
                    tertulis dari pemiliknya.
                  </p>
                </section>

                <section className="mb-4">
                  <h2 className="text-xl font-semibold mb-2">
                    5. Tautan ke Situs Pihak Ketiga
                  </h2>
                  <p>
                    Situs kami menyediakan tautan ke situs web pihak ketiga
                    seperti Canva, Google Docs, Google Sheets, dan Google
                    Slides. Kami tidak bertanggung jawab atas konten atau
                    kebijakan privasi situs web pihak ketiga tersebut. Anda
                    diharapkan untuk membaca dan memahami syarat dan ketentuan
                    serta kebijakan privasi dari situs pihak ketiga yang Anda
                    kunjungi.
                  </p>
                </section>

                <section className="mb-4">
                  <h2 className="text-xl font-semibold mb-2">6. Donasi</h2>
                  <p>
                    Anda dapat memberikan donasi melalui platform Saweria untuk
                    mendukung WOWtemplate dalam pembuatan template yang
                    dibutuhkan. Semua donasi yang diterima akan digunakan untuk
                    pengembangan dan pemeliharaan layanan kami.
                  </p>
                </section>

                <section className="mb-4">
                  <h2 className="text-xl font-semibold mb-2">
                    7. Pembatasan Tanggung Jawab
                  </h2>
                  <p>
                    WOWtemplate tidak bertanggung jawab atas kerugian atau
                    kerusakan yang timbul dari penggunaan layanan kami atau
                    ketidakmampuan untuk menggunakan layanan kami. Kami
                    menyediakan layanan ini "sebagaimana adanya" tanpa jaminan
                    apapun.
                  </p>
                </section>

                <section className="mb-4">
                  <h2 className="text-xl font-semibold mb-2">
                    8. Perubahan Syarat dan Ketentuan
                  </h2>
                  <p>
                    WOWtemplate berhak untuk mengubah atau memperbarui syarat
                    dan ketentuan ini kapan saja tanpa pemberitahuan terlebih
                    dahulu. Perubahan akan berlaku segera setelah dipublikasikan
                    di situs web kami. Anda disarankan untuk secara rutin
                    meninjau syarat dan ketentuan ini untuk memastikan Anda
                    memahami syarat dan ketentuan yang berlaku.
                  </p>
                </section>

                <section className="mb-4">
                  <h2 className="text-xl font-semibold mb-2">9. Kontak</h2>
                  <p>
                    Jika Anda memiliki pertanyaan atau masalah terkait syarat
                    dan ketentuan ini, silakan hubungi kami melalui
                    [email/contact form].
                  </p>
                </section>

                <p>
                  Dengan menggunakan layanan kami, Anda mengakui bahwa Anda
                  telah membaca, memahami, dan menyetujui syarat dan ketentuan
                  ini.
                </p>

                <p className="mt-6">
                  Terima kasih telah menggunakan WOWtemplate!
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

export default TermsAndCondition;
