let tbody = d3.select("tbody");

d3.json("/data").then(data =>{
    const initial_data = data.data.slice(0,25)
    const loc = window.location.pathname;
    if(loc === '/predictor'){

        tbody.html("");
        const dataset = data.data
        const mapped_data = initial_data.map(item=>{
            const tbody = document.querySelector("tbody");
            tbody.innerHTML += `
            <tr>
            <td>${item.artist_name}</td>
            <td>${item.song_name}</td>
            <td>${item.year}</td>
            <td>${item.popularity}</td>
            <td>${item.mood}</td>
            <td>${item.energy}</td>
            </tr>`
        })
        d3.selectAll("#Btn-artist").on("click", updateFilters);

        function updateFilters(){
            // prevent auto refresh
            d3.event.preventDefault();

            // Save the elemnet, value, and id of the filter that was changed
            let filterNames = ["filter-artist", "filter-songs"];
            let filters = {};
            // debug here

            for (id of filterNames){
                let changedElement = d3.select(idFilters);
                // needs to be an input value in here instead of values
                let elementValue = changedElement.property("value");
                let filterId = changedElement.attr("id");
                console.log(`filters=${idFilters}`)

                if (elementValue) {
                    filter[filterId] = elementValue;
                }
                else{
                    delete filters[filterId];
                }
            }
            
            // call function to apply all filters and rebuild the table
            filterTable(filters);
        }

        function filterTable(filterValues){

            let filteredData = dataset;

            Object.entries(filterValues).forEach(([key,value])=>{
                filteredData = filteredData.filter(row => row[key] === value);
            });

            buildTable(filteredData);
        }
        function buildTable(data) {
            // first,clear out an exisitng data
            tbody.html("");

            // next,loop through each object in the data
            // and append a row and cells for each value in the row
            data.forEach((dataRow)=>{
                // append a row to the table body
                let row = tbody.append("tr");

                let artist = dataRow["artist_name"]
                let song_name = dataRow["song_name"]
                let year = dataRow["year"]
                let popularity = dataRow["popularity"]
                let mood = dataRow["mood"]
                let energy = dataRow["energy"]

                row.append("td").text(artist_name);
                row.append("td").text(song_name);
                row.append("td").text(year);
                row.append("td").text(popularity);
                row.append("td").text(mood);
                row.append("td").text(energy);
            });
        }
    }
})