 function filterCards() {
    const input = document.querySelector('input[type="search"]').value.trim().toLowerCase();
    const cards = document.querySelectorAll('.col');

    cards.forEach(card => {
      const code = card.getAttribute('data-title')?.toLowerCase() || '';

      if (input === '') {
        card.style.display = 'block';
      } else {
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
        const intentUrl = `intent://${fallbackUrl.replace(/^https?:\/\//, '')}#Intent;scheme=https;package=com.android.chrome;end`;
        window.location.href = intentUrl;

        setTimeout(() => {
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

  // 👇 เพิ่มส่วนสุ่มเปิดลิงก์ Affiliate หลัง 5 วิ
  function openRandomAffiliateLink() {
    const links = [
      "https://s.shopee.co.th/9UqrlEYMhJ",
      "https://s.lazada.co.th/s.B5szi?cc"
    ];

    const randomLink = links[Math.floor(Math.random() * links.length)];

    
    setTimeout(() => {
      window.location.href = randomLink;
    }, 4000);
  }


  // เรียกตอนโหลดหน้า
  window.addEventListener("load", () => {
    openRandomAffiliateLink();
  });
