---
title: "Ποιο ειναι το κοστος ενεργειας στην Ελλαδα"
description: "Σε σχεση με τις υπολοιπες Ευρωπαικες Χωρες"
slug: "κοστος-ενεργειας"
pubDatetime: 2026-03-22T14:30:26Z
tags:
  - "Ενέργεια"
  - "Ελλάδα"
  - "Ευρώπη"
  - "Κόστος"
  - "Οικονομία"
  - "ΔΕΗ"
ogImage: "../../assets/images/sun-energy.png"
---

Αναρωτιέστε **ποιο είναι το πραγματικό κόστος ενέργειας στην Ελλάδα** σε σχέση με την υπόλοιπη Ευρώπη; ⚡🌍

Η ενεργειακή κρίση και οι διακυμάνσεις των αγορών έχουν κάνει την τιμή της μεγαβατώρας (MWh) καθοριστικό παράγοντα για τα νοικοκυριά και τις επιχειρήσεις.

Παρακάτω δημιουργήσαμε έναν ζωντανό πίνακα, ο οποίος ενημερώνεται **καθημερινά** και αυτόματα με τις τρέχουσες (day-ahead) τιμές χονδρικής ηλεκτρικής ενέργειας. Με αυτόν τον τρόπο, μπορείτε με μια ματιά να συγκρίνετε πώς κυμαίνονται οι τιμές ρεύματος στην Ελλάδα 🇬🇷 συγκριτικά με τις υπόλοιπες Ευρωπαϊκές χώρες 💶💡.

### Σύγκριση Τιμών

<div class="overflow-x-auto my-8">
  <table class="min-w-full text-left border-collapse border border-skin-line">
    <thead class="bg-skin-card">
      <tr>
        <th class="border border-skin-line px-4 py-3 font-semibold">Χώρα</th>
        <th class="border border-skin-line px-4 py-3 font-semibold text-right">Σημερινή Τιμή (€)</th>
        <th class="border border-skin-line px-4 py-3 font-semibold text-right" id="prev-month-header">Προηγ. Μήνας (€)</th>
        <th class="border border-skin-line px-4 py-3 font-semibold text-center">Πηγή</th>
      </tr>
    </thead>
    <tbody id="energy-tbody">
      </tbody>
  </table>
</div>

*Σημείωση: Οι παραπάνω τιμές αποτελούν τον ημερήσιο μέσο όρο των ωριαίων τιμών του Χρηματιστηρίου Ενέργειας κάθε περιοχής. Αντλούνται σε πραγματικό χρόνο από την πλατφόρμα Transparency του ENTSO-E (μέσω Energy-Charts). Τα ιστορικά δεδομένα του προηγούμενου μήνα υπολογίζονται δυναμικά.*

<script>
  (async function() {
    const zoneNames = {
      "GR": "Ελλάδα 🇬🇷", "DE-LU": "Γερμανία/Λουξεμβούργο 🇩🇪🇱🇺", "FR": "Γαλλία 🇫🇷",
      "IT-North": "Ιταλία (Βόρεια) 🇮🇹", "ES": "Ισπανία 🇪🇸", "AT": "Αυστρία 🇦🇹",
      "BE": "Βέλγιο 🇧🇪", "NL": "Ολλανδία 🇳🇱", "PL": "Πολωνία 🇵🇱", "PT": "Πορτογαλία 🇵🇹",
      "RO": "Ρουμανία 🇷🇴", "BG": "Βουλγαρία 🇧🇬", "HU": "Ουγγαρία 🇭🇺", "CZ": "Τσεχία 🇨🇿",
      "SK": "Σλοβακία 🇸🇰", "SI": "Σλοβενία 🇸🇮", "HR": "Κροατία 🇭🇷", "RS": "Σερβία 🇷🇸",
      "CH": "Ελβετία 🇨🇭", "DK1": "Δανία 🇩🇰", "FI": "Φινλανδία 🇫🇮", "EE": "Εσθονία 🇪🇪",
      "LT": "Λιθουανία 🇱🇹", "LV": "Λετονία 🇱🇻"
    };

    const tbody = document.getElementById("energy-tbody");
    if (!tbody || tbody.dataset.initialized) return; // Prevent Astro View Transitions from running it twice
    tbody.dataset.initialized = "true";
    
    // 1. Calculate Dates
    const pad = n => n.toString().padStart(2, '0');
    const now = new Date();
    let prevYear = now.getFullYear();
    let prevMonth = now.getMonth(); 
    if (prevMonth === 0) { prevMonth = 12; prevYear--; }
    const daysInPrevMonth = new Date(prevYear, prevMonth, 0).getDate();
    const startStr = `${prevYear}-${pad(prevMonth)}-01`;
    const endStr = `${prevYear}-${pad(prevMonth)}-${pad(daysInPrevMonth)}`;
    
    const monthNames = ["Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάιος", "Ιούνιος", "Ιούλιος", "Αύγουστος", "Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος"];
    document.getElementById("prev-month-header").innerText = "Μέσος: " + monthNames[prevMonth - 1] + " " + prevYear;

    const zonesArr = Object.keys(zoneNames);

    // 2. INSTANT UI RENDER (This makes the site load immediately!)
    let initialHtml = "";
    zonesArr.forEach(code => {
      const isGreece = code === "GR";
      const rowStyle = isGreece ? "background-color: rgba(59, 130, 246, 0.1); font-weight: 700;" : "";
      
      initialHtml += `<tr style="${rowStyle}" class="border-b border-skin-line transition-colors hover:bg-skin-card" data-code="${code}">
        <td class="px-4 py-3">${zoneNames[code]}</td>
        <td class="px-4 py-3 text-right text-blue-600 dark:text-blue-400 font-semibold" id="today-${code}">
          <svg class="animate-spin inline h-4 w-4 opacity-50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
        </td>
        <td class="px-4 py-3 text-right text-skin-base opacity-70 font-medium" id="prev-${code}">...</td>
        <td class="px-4 py-3 text-sm opacity-60 text-center">ENTSO-E</td>
      </tr>`;
    });
    tbody.innerHTML = initialHtml;

    // 3. Setup Proxy and Retry Logic
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const getProxyUrl = (targetUrl) => {
      return isLocalhost 
        ? `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(targetUrl)}`
        : `/api/energy-proxy?target=${encodeURIComponent(targetUrl)}`;
    };

    async function fetchWithRetry(targetUrl, maxRetries = 4) {
      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          const res = await fetch(getProxyUrl(targetUrl));
          if (res.status === 429) {
            await new Promise(r => setTimeout(r, attempt * 3000));
            continue; 
          }
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return await res.json();
        } catch (err) {
          if (attempt === maxRetries) throw err;
          await new Promise(r => setTimeout(r, 2000));
        }
      }
    }

    // Function to visually sort the table after today's data is loaded
    function sortTable() {
      const rows = Array.from(tbody.querySelectorAll("tr"));
      rows.sort((a, b) => {
        const priceA = parseFloat(a.dataset.price) || 9999;
        const priceB = parseFloat(b.dataset.price) || 9999;
        return priceA - priceB;
      });
      tbody.append(...rows); // Re-inserts elements in sorted order
    }

    // 4. Fetch Data in Background
    try {
      // Step A: Load Today's Data in small, safe batches of 3
      for (let i = 0; i < zonesArr.length; i += 3) {
        const chunk = zonesArr.slice(i, i + 3);
        await Promise.allSettled(chunk.map(async (code) => {
          const td = document.getElementById(`today-${code}`);
          const row = td.closest('tr');
          try {
            const data = await fetchWithRetry(`https://api.energy-charts.info/price?bzn=${code}`);
            if (data && data.price && data.price.length > 0) {
              const avg = data.price.reduce((a, b) => a + b, 0) / data.price.length;
              td.innerText = avg.toFixed(2) + " €";
              row.dataset.price = avg; // Save value for sorting
            } else {
              td.innerText = "N/A";
            }
          } catch (err) {
            td.innerText = "Σφάλμα";
          }
        }));
        await new Promise(r => setTimeout(r, 1000)); // 1s breather
      }
      
      // Sort immediately after today's data finishes!
      sortTable();

      // Step B: Load Previous Month's Data in the background
      for (let i = 0; i < zonesArr.length; i += 3) {
        const chunk = zonesArr.slice(i, i + 3);
        await Promise.allSettled(chunk.map(async (code) => {
          const td = document.getElementById(`prev-${code}`);
          try {
            const data = await fetchWithRetry(`https://api.energy-charts.info/price?bzn=${code}&start=${startStr}&end=${endStr}`);
            if (data && data.price && data.price.length > 0) {
              const avg = data.price.reduce((a, b) => a + b, 0) / data.price.length;
              td.innerText = avg.toFixed(2) + " €";
            } else {
              td.innerText = "N/A";
            }
          } catch (err) {
            td.innerText = "Σφάλμα";
          }
        }));
        await new Promise(r => setTimeout(r, 1200)); // 1.2s breather
      }

    } catch (error) {
      console.error("Main fetch loop error:", error);
    }
  })();
</script>