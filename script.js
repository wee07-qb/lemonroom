function filterCards() {
  const input = document.querySelector('input[type="search"]').value.trim().toLowerCase();
  const cards = document.querySelectorAll('.col');

  cards.forEach(card => {
    const code = card.getAttribute('data-title')?.toLowerCase() || '';

    if (input === '') {
      // ถ้าค้นหาว่าง → แสดงทุกการ์ด
      card.style.display = 'block';
    } else {
      // ถ้ามีคำค้นหา → แสดงเฉพาะที่ตรงกับรหัส
      card.style.display = code.includes(input) ? 'block' : 'none';
    }
  });
}

  function isAndroid() {
    return /Android/i.test(navigator.userAgent);
  }

  function isIOS() {
    return /iPhone|iPad|iPod/i.test(navigator.userAgent);
  }

  function openInBrowserIntent() {
    const fallbackUrl = window.location.href;

    if (isAndroid()) {
      try {
        // พยายามใช้ intent:// ก่อน
        const intentUrl = `intent://${fallbackUrl.replace(/^https?:\/\//, '')}#Intent;scheme=https;package=com.android.chrome;end`;
        window.location.href = intentUrl;

        // เผื่อแอปบล็อคหรือไม่ทำงาน → Fallback สำรอง
        setTimeout(() => {
          // แจ้งเตือนให้ Copy ลิงก์เอง ถ้าไม่ได้เปลี่ยนหน้า
          if (document.visibilityState === 'visible') {
            promptCopyFallback(fallbackUrl);
          }
        }, 1500);
      } catch (e) {
        promptCopyFallback(fallbackUrl);
      }

    } else if (isIOS()) {
      document.getElementById("iosNote").style.display = "block";
      alert("📱 iPhone: ให้กดปุ่มแชร์ แล้วเลือก 'เปิดใน Safari'");
    } else {
      // Desktop
      window.open(fallbackUrl, "_blank");
    }
  }

  function promptCopyFallback(url) {
    const dummy = document.createElement("textarea");
    dummy.value = url;
    document.body.appendChild(dummy);
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    alert("❗ ไม่สามารถเปิดในเบราว์เซอร์ได้ อัตโนมัติ\n\nลิงก์ถูกคัดลอกแล้ว\n👉 กรุณาวางไปเปิดใน Chrome เอง");
  }

  document.getElementById("openInBrowser").addEventListener("click", openInBrowserIntent);

