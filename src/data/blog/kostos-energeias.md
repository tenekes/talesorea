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
      <tr>
        <td colspan="4" class="text-center py-6 text-skin-base opacity-70">
          <div class="flex items-center justify-center gap-2">
            <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            Φόρτωση σημερινών δεδομένων... ⏳
          </div>
        </td>
      </tr>
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
    if (!tbody) return;
    
    const pad = n => n.toString().padStart(2, '0');
    const now = new Date();
    let prevYear = now.getFullYear();
    let prevMonth = now.getMonth(); 
    if (prevMonth === 0) {
      prevMonth = 12;
      prevYear--;
    }
    const daysInPrevMonth = new Date(prevYear, prevMonth, 0).getDate();
    const startStr = `${prevYear}-${pad(prevMonth)}-01`;
    const endStr = `${prevYear}-${pad(prevMonth)}-${pad(daysInPrevMonth)}`;
    
    const monthNames = ["Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάιος", "Ιούνιος", "Ιούλιος", "Αύγουστος", "Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος"];
    const prevMonthName = monthNames[prevMonth - 1] + " " + prevYear;

    // BRINGING THE PROXY BACK
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const getProxyUrl = (targetUrl) => {
      return isLocalhost 
        ? `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(targetUrl)}`
        : `/api/energy-proxy?target=${encodeURIComponent(targetUrl)}`;
    };

    // Patient Fetcher with Exponential Backoff
    async function fetchWithRetry(targetUrl, maxRetries = 5) {
      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        const res = await fetch(getProxyUrl(targetUrl));
        
        if (res.status === 429) {
          const waitTime = attempt * 4000; // Waits 4s, 8s, 12s...
          console.warn(`⏳ Proxy Rate limited. Retrying in ${waitTime}ms...`);
          await new Promise(r => setTimeout(r, waitTime));
          continue; 
        }
        
        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
        return await res.json();
      }
      throw new Error("Max retries reached");
    }

    try {
      const results = [];
      const zonesArr = Object.keys(zoneNames);
      
      // STEP 1: Fetch TODAY sequentially (One by one, not chunks)
      for (const zoneCode of zonesArr) {
        const targetUrl = `https://api.energy-charts.info/price?bzn=${zoneCode}`;
        try {
          const data = await fetchWithRetry(targetUrl);
          if (data && data.price && data.price.length > 0) {
            const avg = data.price.reduce((a, b) => a + b, 0) / data.price.length;
            results.push({ code: zoneCode, price: avg, source: "ENTSO-E" });
          }
        } catch (err) {
          console.error(`Skipping ${zoneCode} today due to error.`);
        }
        // Wait 500ms between each today request
        await new Promise(r => setTimeout(r, 500));
      }
      
      let validData = results.map(item => ({ ...item, name: zoneNames[item.code] || item.code }));
      
      if (validData.length === 0) {
        tbody.innerHTML = "<tr><td colspan=\"4\" class=\"text-center py-6 text-red-500\">❌ Δεν βρέθηκαν διαθέσιμα δεδομένα αυτή τη στιγμή. Δοκιμάστε ξανά αργότερα.</td></tr>";
        return;
      }

      validData.sort((a, b) => a.price - b.price);

      let html = "";
      validData.forEach((item) => {
        const isGreece = item.code === "GR";
        const rowStyle = isGreece ? "background-color: rgba(59, 130, 246, 0.1); font-weight: 700;" : "";
          
        html += "<tr style=\"" + rowStyle + "\" class=\"border-b border-skin-line transition-colors hover:bg-skin-card\">" +
          "<td class=\"px-4 py-3\">" + item.name + "</td>" +
          "<td class=\"px-4 py-3 text-right text-blue-600 dark:text-blue-400 font-semibold\">" + item.price.toFixed(2) + " €</td>" +
          "<td class=\"px-4 py-3 text-right text-skin-base opacity-70 font-medium\" id=\"prev-" + item.code + "\">...</td>" +
          "<td class=\"px-4 py-3 text-sm opacity-60 text-center\">" + item.source + "</td>" +
        "</tr>";
      });
      
      tbody.innerHTML = html;
      document.getElementById("prev-month-header").innerText = "Μέσος: " + prevMonthName;

      // STEP 2: Fetch PREVIOUS MONTH sequentially
      (async function fetchPreviousMonth() {
        // Deep breath before starting historical
        await new Promise(r => setTimeout(r, 4000));

        for (const item of validData) {
          const td = document.getElementById("prev-" + item.code);
          if (!td) continue;

          const targetUrl = `https://api.energy-charts.info/price?bzn=${item.code}&start=${startStr}&end=${endStr}`;
          
          try {
            const data = await fetchWithRetry(targetUrl);
            if (data && data.price && data.price.length > 0) {
              const avg = data.price.reduce((a, b) => a + b, 0) / data.price.length;
              td.innerText = avg.toFixed(2) + " €";
            } else {
              td.innerText = "N/A";
            }
          } catch (err) {
            td.innerText = "Σφάλμα";
          }
          
          // Wait 1.5 full seconds between each historical request
          await new Promise(r => setTimeout(r, 1500));
        }
      })();

    } catch (error) {
      console.error("Error fetching energy prices:", error);
      tbody.innerHTML = "<tr><td colspan=\"4\" class=\"text-center py-6 text-red-500\">❌ Σφάλμα κατά τη φόρτωση δεδομένων.</td></tr>";
    }
  })();
</script>