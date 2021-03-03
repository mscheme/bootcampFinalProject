let tbody = d3.select("tbody");

d3.json("/data").then(data =>{
    const initial_data = data.data.slice(0,25)
    console.log(`this is initial`, initial_data)
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
        d3.selectAll("#Btn").on("click", updateFiltersandBuild);
        d3.selectAll("#Btn-artist").on("click", updateFilterList)
        

        function updateFiltersandBuild(){
            // console.log("made it this far")
            // prevent auto refresh
            d3.event.preventDefault();

            // Save the elemnet, value, and id of the filter that was changed
            let filterNames = ["#exampleDataList"] ;
            // console.log("before filternames")
            let filters = {};
            // console.log(filterNames)

            for (fltrid of filterNames){
                let changedElement = d3.select(fltrid)
                console.log(`this is id ${fltrid}`)
                // needs to be an input value in here instead of values
                let elementValue = changedElement.property("value");
                console.log(elementValue)
                let filterId = changedElement.attr("id");
                console.log(`filters=${fltrid}`)

                var returned_songs = []
                // var something = data.includes(elementValue)
                console.log("randomwords", Object.values(data));
                let dataArray = Object.values(data);
                console.log(dataArray);
                let filterData = dataArray[0].filter(item => item.artist_name.toLowerCase().includes(elementValue.toLowerCase()))
                // let filterData = dataArray[0].filter(item => item.artist_name === elementValue)
                buildTable(filterData)
                
            }
            
            
        }

        function updateFilterList(){
            // console.log("made it this far")
            // prevent auto refresh
            d3.event.preventDefault();

            // Save the elemnet, value, and id of the filter that was changed
            let filterNames = ["#exampleDataList"] ;
            // console.log("before filternames")
            let filters = {};
            // console.log(filterNames)

            for (fltrid of filterNames){
                let changedElement = d3.select(fltrid)
                console.log(`this is id ${fltrid}`)
                // needs to be an input value in here instead of values
                let elementValue = changedElement.property("value");
                console.log(elementValue)
                let filterId = changedElement.attr("id");
                console.log(`filters=${fltrid}`)

                var returned_songs = []
                // var something = data.includes(elementValue)
                console.log("randomwords", Object.values(data));
                let dataArray = Object.values(data);
                console.log(dataArray);
                let filterData = dataArray[0].filter(item => item.artist_name.toLowerCase().includes(elementValue.toLowerCase()))
                // let filterData = dataArray[0].filter(item => item.artist_name === elementValue)
                getSonglist(filterData)
                
            }
            
            
        }
        function getSonglist(data){
            d3.event.preventDefault();
        //     <select class="form-select" id="filter-songs">
        //     needs to make the filter update after identifying artist
        //     <option selected>Choose...</option>
        //     <option value="1">One</option>
        //   </select>

        // clear values in the drop-down 
            d3.select("#filter-songs").html("");
            const dropList = document.querySelector("#filter-songs");
            dropList.innerHTML += `<option selected>Choose A Song</option>`
            console.log(`printing song list db`)
            console.log(data);
            data.forEach((dataRow)=> {
                let row = d3.select("#filter-songs")
                row.append("option").text(dataRow["song_name"])
                // console.log(`printing song list`)
                // console.log(dataRow)
           })









        // populate the song names 



        return;



        }
     
        function buildTable(data) {
            console.log(data)
            // first,clear out an exisitng data
            tbody.html("");

            // next,loop through each object in the data
            // and append a row and cells for each value in the row
            data.forEach((dataRow)=>{
                // append a row to the table body
                let row = tbody.append("tr");

                let artist_name = dataRow["artist_name"]
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