let tbody = d3.select("tbody");
let table = d3.select("table");

d3.json("/data").then(data =>{
    console.log(data)

    var tabledata = Object.values(data);
    console.log(tabledata);
    

    function buildtable(tabledata){
        tbody.html("");
        tabledata.forEach((item)=>{
            let row  = tbody.append("tr");
            let artist = row.append("td")
            let song = row.append("td")
            let year = row.append("td")
            let popular = row.append("td")
            let mood = row.append("td")
            let energy = row.append("td")
            artist.text(item.artist_name);
            song.text(item.song_name);
            year.text(item.year);
            popular.text(item.popularity);
            mood.text(item.mood);
            energy.text(item.energy);
            console.log(song);
        });
    }

    var filter = {};
    function updateFilters() {
        var changedElement = d3.select(this).select("input");
        var elementValue = changedElement.property("value");
        var filterId = changedElement.attr("id");

        if (elementValue) {
            filters[filterId] = elementValue;
        }
        else {
            delete filter[filterId];
        }
        filterTable();
    }

    function filterTable() {
        let filteredData = tabledata;

        Object.entries(filters).forEach(([key, value]) => {
            filteredData = filteredData.filter((item) => item[key] === value);
          });
          buildtable(filteredData);
    }

    d3.selectAll(".exampleDataList").on("change", updateFilters);

    buildtable(tabledata); 
})






// var tableData = d3.json("/data").then(data =>{
//     console.log(data)
//     const initial_data = data.data.slice(0,25)
//     const loc = window.location.pathname;

//     tbody.html("");
//         const dataset = data.data
//         const mapped_data = initial_data.map(item=>{
//             const tbody = document.querySelector("tbody");
//             tbody.innerHTML += `
//             <tr>
//             <td>${item.artist_name}</td>
//             <td>${item.song_name}</td>
//             <td>${item.year}</td>
//             <td>${item.popularity}</td>
//             <td>${item.mood}</td>
//             <td>${item.energy}</td>
//             </tr>`
//         })
    
//     var fitlers = {}
//     function updateFilters(){
//         var changedElement = d3.select(this).select("input");
//         var elementValue = changedElement.property("value");
//         var filterId = changedElement.attr("id");

//         if (elementValue) {
//             filters[filterId] = elementValue;
//         }
//         else{
//             delete filters[filterId];
//         }
//         filterTable();
//     }

//     function filterTable(){
//         let filteredData = tableData;

//         Object.entries(filters).forEach(([key, value]) => {
//             filteredData = filteredData.filter((item) => item[key] === value);
//           });
//           buildtable(filterData);
//     }
// })