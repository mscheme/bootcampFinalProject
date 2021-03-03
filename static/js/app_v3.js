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
            // this function uses the values of artist and song to get the cluster id
            // prevent auto refresh
            d3.event.preventDefault();
            
            // Save the elemnet, value, and id of the filter that was changed
            // let filterNames = ["#exampleDataList", "#filter-songs"] ;
            // console.log("before filternames")
            // let filters = {};
            // console.log(filterNames)

            let dataArray = Object.values(data);
            console.log(dataArray);

            // get artist and song values to use a filters
            artristFilter = d3.select("#exampleDataList").property("value");
            console.log('artistFliter is: ', artristFilter);

            songSelected = d3.select("#filter-songs").property("value");
            console.log('songSelected is: ', songSelected);

            let filterData = dataArray[0].filter(item => item.artist_name.toLowerCase().includes(artristFilter.toLowerCase()))
            filterData = filterData.filter(item => item.song_name == songSelected)
            console.log('this is to get the cluster number: ', filterData)

            // for (fltrid of filterNames){
            //     let changedElement = d3.select(fltrid)
            //     console.log(`this is id ${fltrid}`)
            //     console.log('the changedElement is:', changedElement)
                // needs to be an input value in here instead of values
                // let elementValue = changedElement.property("value");
                // console.log('the value of the filter is:', elementValue)
                // let filterId = changedElement.attr("id");
                // console.log(`filters=${fltrid}`)

                // var returned_songs = []
                // var something = data.includes(elementValue)
                // console.log("randomwords", Object.values(data));
                
                // let filterData = dataArray[0].filter(item => item.artist_name.toLowerCase().includes(elementValue.toLowerCase())) 
            // }

            // buildTable(filterData)
            
            
        }

        function updateFilterList(){
            // This is to update the song list drop-down based on artist entered
            // prevent auto refresh
            d3.event.preventDefault();

            // Save the elemnet, value, and id of the filter that was changed
            // let filterNames = ["#exampleDataList"] ;

            let changedElement = d3.select("#exampleDataList");
            let elementValue = changedElement.property("value");

            let dataArray = Object.values(data);
            let filterData = dataArray[0].filter(item => item.artist_name.toLowerCase().includes(elementValue.toLowerCase()));
            getSonglist(filterData);

            // for (fltrid of filterNames){
            //     let changedElement = d3.select(fltrid)
            //     // console.log(`this is id ${fltrid}`)
            //     // needs to be an input value in here instead of values
            //     let elementValue = changedElement.property("value");
            //     // console.log(elementValue)
            //     let filterId = changedElement.attr("id");
            //     // console.log(`filters=${fltrid}`)

            //     var returned_songs = []
            //     // var something = data.includes(elementValue)
            //     // console.log("randomwords", Object.values(data));
            //     let dataArray = Object.values(data);
            //     // console.log(dataArray);
            //     let filterData = dataArray[0].filter(item => item.artist_name.toLowerCase().includes(elementValue.toLowerCase()))
            //     // let filterData = dataArray[0].filter(item => item.artist_name === elementValue)
            //     getSonglist(filterData)
                
            // }
            return;
        }

        function getSonglist(data){
            // this populates the song list options
            d3.event.preventDefault();
            // clear values in the drop-down 
            d3.select("#filter-songs").html("");
            const dropList = document.querySelector("#filter-songs");
            
            // populate the song names 
            dropList.innerHTML += `<option selected>Choose A Song</option>`
            
            data.forEach((dataRow)=> {
                let row = d3.select("#filter-songs")
                let option = row.append("option")
                option.text(dataRow["song_name"])
                option.property('value',dataRow["song_name"])
            })
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