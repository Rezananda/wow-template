// errorUtils.js
export const getErrorMessage = (err) => {
  if (err.response) {
    // HTTP response errors
    return `Server merespon dengan status ${err.response.status}: ${
      err.response.data.message || err.response.data
    }`;
  } else if (err.request) {
    // No response received
    return "Tidak ada respon dari server. Silakan periksa koneksi jaringan Anda.";
  } else if (err.code === "ECONNABORTED") {
    // Timeout error
    return "Permintaan waktu habis. Silakan coba lagi nanti.";
  } else if (err.message.includes("Network Error")) {
    // Network error
    return "Terjadi kesalahan jaringan. Silakan periksa koneksi internet Anda.";
  } else {
    // Other errors
    return `Kesalahan: ${err.message}`;
  }
};
