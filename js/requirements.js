let getSalesCoffee = async () => {
    const url = "https://raw.githubusercontent.com/DATA-DAWM/Datos/refs/heads/main/Coffee/Coffe_sales.xml"
    try {
        let response = await fetch(url);

        if (!response.ok){
            throw new Error("Error en realizar la peticion.")
        }

        let rawData = await response.text();

        let parser = new DOMParser();
        let data = parser.parseFromString(text, "application/xml");

        return {
            success: true,
            body: data
        };

    } catch (error) {

        return{
            success: false,
            body: error.message
        };

    }
}

export { getSalesCoffee }
