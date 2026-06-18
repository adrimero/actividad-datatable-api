import { getSalesCoffee } from './requirements.js';

const processSalesCoffee = async () => {
    try {
        const response = await getSalesCoffee();

        if (response.success) {
            let container = document.getElementById("table-body");

            if ($.fn.DataTable.isDataTable('#example')) {
                $('#example').DataTable().destroy();
            }

            container.innerHTML = "";

            let xmlDoc = response.body;
            let records = xmlDoc.getElementsByTagName("row");

            let totalHTML = "";

            for (const record of records) {
                let rowHTML = `
                    <tr>
                        <td class="border px-4 py-2">[DATE]</td>
                        <td class="border px-4 py-2">[TIME]</td>
                        <td class="border px-4 py-2">[HOUR]</td>
                        <td class="border px-4 py-2">[CASH_TYPE]</td>
                        <td class="border px-4 py-2">[COFFEE_NAME]</td>
                        <td class="border px-4 py-2">[MONEY]</td>
                    </tr>
                `;

                let date = record.getElementsByTagName("Date")[0]?.textContent || "N/A";
                let time = record.getElementsByTagName("Time")[0]?.textContent || "N/A";
                let hour = record.getElementsByTagName("hour_of_day")[0]?.textContent || "N/A";
                let cashType = record.getElementsByTagName("cash_type")[0]?.textContent || "N/A";
                let coffeeName = record.getElementsByTagName("coffee_name")[0]?.textContent || "N/A";
                let money = record.getElementsByTagName("money")[0]?.textContent || "N/A";

                rowHTML = rowHTML.replaceAll("[DATE]", date);
                rowHTML = rowHTML.replaceAll("[TIME]", time);
                rowHTML = rowHTML.replaceAll("[HOUR]", hour);
                rowHTML = rowHTML.replaceAll("[CASH_TYPE]", cashType);
                rowHTML = rowHTML.replaceAll("[COFFEE_NAME]", coffeeName);
                rowHTML = rowHTML.replaceAll("[MONEY]", money);

                totalHTML += rowHTML;
            }

            container.innerHTML = totalHTML;

            $('#example').DataTable();

        } else {
            alert(`Error al cargar datos: ${response.body}`);
        }

    } catch (error) {
        console.error(error);
        alert("Error inesperado. Revisa la consola.");
    }
};

document.addEventListener('DOMContentLoaded', processSalesCoffee);
