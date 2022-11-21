let res = [];
let liveData= [];
let liveOdi = [];
let liveTest = [];
let liveT20 = [];
let  headBannerMatches= [];
async function fetchFromOffset(offset) {
    return await fetch("https://api.cricapi.com/v1/currentMatches?apikey=6c8b4630-ecdb-4977-9932-bc96d12b3abd&offset=" + offset)
        .then(data => data.json())
        .then(data => {
            if (data.status != "successheadBannerMatches") { alert("Failed"); return; }
            let datarray = data.data;
            if (!datarray)
                return [];
            else if (offset >= data.info.totalRows)
                return datarray;
            else
                return fetchFromOffset(offset + 25)
                    .then(function (data) {
                        return datarray.concat(data);
                    });
        })
        .catch(e => console.log);
}
fetchFromOffset(0)
    .then(function (data) {
       res = data

       
       for(let i=0; i<res.length; i++){
        if(res[i].matchStarted == true &&  res[i].matchEnded == false ){
            liveData.push(res[i])
            if(res[i].matchType == "t20"){
                liveT20.push(res[i])
            }
            else if (res[i].matchType == "odi"){
                liveOdi.push(res[i])
            }
            else if (res[i].matchType == "test"){
                liveTest.push(res[i])
            }
        }
       }

       console.log("Live data:  ", liveData)
       console.log("Live data t20 :  ", liveT20)
       console.log("Live data test:  ", liveTest)
       console.log("Live data odi:  ", liveOdi)

       for(let i=0; i<liveOdi.length; i++){
        if(i<=2){
            headBannerMatches.push(liveOdi[i]);
        }
        }
       for(let i=0; i<liveT20.length; i++){
        if(i<=1){
            headBannerMatches.push(liveT20[i]);
        }
        }
       for(let i=0; i<liveTest.length; i++){
        if(i<=0){
            headBannerMatches.push(liveTest[i]);
        }
       }

       console.log("headBannerMatches ", headBannerMatches)
    })
    .catch(e => console.log(e));


